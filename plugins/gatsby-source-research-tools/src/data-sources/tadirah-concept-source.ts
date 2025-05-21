import { BaseDataSource } from './base-data-source';
import { QueryEngine } from '@comunica/query-sparql';
import { ITadirahConceptInput } from '../types';

/**
 * Data source for fetching Tadirah concept data from a SPARQL endpoint.
 * 
 * This class constructs a SPARQL query to retrieve Tadirah concepts,
 * including their IRIs and English labels. The query filters for English
 * language labels only.
 * 
 * @extends BaseDataSource<ITadirahConceptInput>
 * 
 * @see https://vocabs.dariah.eu/tadirah/de/
 */
export class TadirahConceptSource extends BaseDataSource<ITadirahConceptInput> {
    
    /**
     * Constructs a new TadirahConceptSource.
     * 
     * @param endpoint - The SPARQL endpoint URL.
     */
    constructor(endpoint: string) {        
        const query = `
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

            SELECT ?tadirahID ?tadirahLabel
            WHERE {
            ?tadirahID skos:prefLabel ?tadirahLabel .
            FILTER (lang(?tadirahLabel) = "en")
            }
        `;
        super(endpoint, new QueryEngine(), query);
    }

    /**
     * Fetches Tadirah concept data from the SPARQL endpoint.
     * 
     * @remarks
     * This method executes the SPARQL query defined in the constructor and processes the results
     * into an array of {@link ITadirahConceptInput} objects.
     * 
     * @returns A promise that resolves to an array of Tadirah concept inputs.
     * @throws If the query fails or the stream emits an error.
     */
    async fetchData(): Promise<ITadirahConceptInput[]> {
        
        try {
            const bindingsStream = await this.engine.queryBindings(this.query, {
                sources: [this.endpoint],
                httpRetryOnServerError: true,
                httpRetryCount: 3,
                httpRetryDelay: 100,
                noCache: false,
            });

            return new Promise((resolve, reject) => {
                const tadirahConcepts: ITadirahConceptInput[] = [];

                bindingsStream.on('data', (binding) => {
                    // Verarbeite jedes Binding einzeln
                    tadirahConcepts.push({
                        id: binding.get('tadirahID').value,
                        label: binding.get('tadirahLabel').value,
                    });
                });

                bindingsStream.on('end', () => {
                    resolve(tadirahConcepts);
                });

                bindingsStream.on('error', (error) => {
                    reject(this.handleError(error, "TadirahConceptSource"));
                });
            });
        } catch (error) {
            return Promise.reject(this.handleError(error, "TadirahConceptSource"));
        }
        
    }
}