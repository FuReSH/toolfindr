import { BaseDataSource } from './base-data-source';
import { QueryEngine } from '@comunica/query-sparql';
import { ITadirahConceptInput } from '../types';

export class TadirahSparqlSource extends BaseDataSource<ITadirahConceptInput> {
    private engine: QueryEngine;

    constructor(endpoint: string, options: any = {}) {
        // Call the parent constructor with the endpoint and options
        // Use the default endpoint if none is provided
        super(endpoint, options);
        this.engine = new QueryEngine();
        this.endpoint = "https://vocabs-downloads.acdh.oeaw.ac.at/vocabs-main/Humanities/TaDiRAH/tadirah.ttl";
    }

    async fetchData(): Promise<ITadirahConceptInput[]> {
        try {
            const query = `
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

            SELECT ?tadirahID ?tadirahLabel
            WHERE {
            ?tadirahID skos:prefLabel ?tadirahLabel .
            FILTER (lang(?tadirahLabel) = "en")
            }
        `;

            const bindingsStream = await this.engine.queryBindings(query, {
                sources: [this.endpoint],
                httpRetryOnServerError: true,
                httpRetryCount: 3,
                httpRetryDelay: 100,
                noCache: false,
            });


            return new Promise((resolve, reject) => {
                const items: ITadirahConceptInput[] = [];

                bindingsStream.on('data', (binding) => {
                    // Verarbeite jedes Binding einzeln
                    items.push({
                        id: binding.get('tadirahID').value,
                        label: binding.get('tadirahLabel').value,
                    });

                });

                bindingsStream.on('end', () => {
                    resolve(items);
                });

                bindingsStream.on('error', (error) => {
                    reject(error);
                });
            });
        } catch (error) {
            return error;
        }
    }
}