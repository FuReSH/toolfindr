import { BaseDataSource } from './base-data-source';
import { QueryEngine } from '@comunica/query-sparql';
import { IResearchToolInput } from '../types';

/**
 * Data source for fetching research tool data from a SPARQL endpoint.
 * 
 * This class constructs a SPARQL query to retrieve research tool information,
 * including labels, descriptions, modification dates, Tadirah concepts, licenses,
 * and copyright. This is necessary because the Wikidata LDF server does not yet 
 * support language filtering for property values (as of 05/2025).
 * 
 * @extends BaseDataSource<IResearchToolInput>
 * 
 * @see https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service
 * @see https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Alternative_endpoints
 * @see https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/WDQS_backend_update/WDQS_backend_alternatives
 */
export class ResearchToolSource extends BaseDataSource<IResearchToolInput> {

    /**
     * Constructs a new ResearchToolSource.
     * 
     * @param endpoint - The SPARQL endpoint URL.
     * @param lastFetchedDate - Only fetch tools modified since this date. If not provided, fetches all.
     */
    constructor(endpoint: string, lastFetchedDate: Date) {
        const query = `
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX schema: <http://schema.org/>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

            SELECT 
            ?tool 
            (SAMPLE(?label_final) AS ?label) 
            ?description 
            ?date_modified 
            (GROUP_CONCAT(DISTINCT ?tadirahIRI; SEPARATOR=", ") AS ?tadirahIRIs)
            (GROUP_CONCAT(DISTINCT ?instanceof_label; SEPARATOR=", ") AS ?instanceof_labels)
            (GROUP_CONCAT(DISTINCT ?license_label; SEPARATOR=", ") AS ?license_labels)
            ?copyright_label
            WHERE {
            ?concept wdt:P9309 ?tadirahId .
            ?tool wdt:P366 ?concept ;
                    wdt:P31/wdt:P279* wd:Q7397 .
             ${lastFetchedDate ? `
                    ?tool ^schema:about/schema:dateModified ?date_modified .
                    FILTER (?date_modified >= "${lastFetchedDate.toISOString().split('T')[0]}"^^xsd:date)
                ` : ''}

            ?tool wdt:P31 ?instanceof .
            ?instanceof rdfs:label ?instanceof_label .
            FILTER (LANG(?instanceof_label) = "en") .

            OPTIONAL {
                ?tool rdfs:label ?label_en .
                FILTER (LANG(?label_en) = "en") 
            }
            OPTIONAL {
                ?tool schema:description ?description .
                FILTER (LANG(?description) = "en")
            }
            OPTIONAL {
                ?tool wdt:P6216 ?copyright .
                ?copyright rdfs:label ?copyright_label .
                FILTER (LANG(?copyright_label) = "en")
            }
            OPTIONAL {
                ?tool wdt:P275 ?license .
                ?license rdfs:label ?license_label .
                FILTER (LANG(?license_label) = "en")
            }

            BIND(STRAFTER(STR(?tool), "http://www.wikidata.org/entity/") AS ?qid)
            BIND(COALESCE(?label_en, ?qid) AS ?label_final)

            BIND(IRI(CONCAT("https://vocabs.dariah.eu/tadirah/", STR(?tadirahId))) AS ?tadirahIRI)
            }
            GROUP BY 
            ?tool 
            ?description 
            ?date_modified 
            ?copyright_label
            LIMIT 10000
            `;
        super(endpoint, new QueryEngine(), query);
    }

    /**
     * Fetches research tool data from the SPARQL endpoint.
     * 
     * @remarks
     * This method executes the SPARQL query defined in the constructor and processes the results
     * into an array of {@link IResearchToolInput} objects.
     * 
     * @param none This method does not take any parameters.
     * @returns A promise that resolves to an array of research tool inputs.
     * @throws If the query fails or the stream emits an error.
     */
    public async fetchData(): Promise<IResearchToolInput[]> {

        try {
            const bindingsStream = await this.engine.queryBindings(this.query, {
                sources: [{
                    type: 'sparql',
                    value: this.endpoint,
                }],
                httpRetryOnServerError: true,
                httpRetryCount: 3,
                httpRetryDelay: 100,
                noCache: false,
            });

            return new Promise((resolve, reject) => {

                const researchTools: IResearchToolInput[] = [];

                bindingsStream.on('data', (binding) => {
                    // Verarbeite jedes Binding einzeln
                    researchTools.push({
                        id: binding.get('tool').value,
                        label: binding.get('label').value,
                        slug: binding.get('tool').value.split('/').pop().toLowerCase(),
                        concepts: binding.get('tadirahIRIs').value.split(', '),
                        instancesof: binding.get('instanceof_labels').value.split(', '),
                        description: binding.get('description')?.value || null,
                        license: (() => {
                            const licenses = binding.get('license_labels').value.split(', ');
                            return licenses.length === 1 && licenses[0] === '' ? null : licenses;
                        })(),
                        copyright: binding.get('copyright_label')?.value || null
                    });
                });

                bindingsStream.on('end', () => {
                    resolve(researchTools);
                });

                bindingsStream.on('error', (error) => {
                    reject(this.handleError(error, "ResearchToolsSource"));
                });
            });

        } catch (error) {
            return Promise.reject(this.handleError(error, "ResearchToolsSource"));
        }
    }

}