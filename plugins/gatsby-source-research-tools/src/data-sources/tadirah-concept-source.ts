import { BaseDataSource } from './base-data-source';
import { QueryEngine } from '@comunica/query-sparql';
import { ITadirahConceptInput } from '../types';

export class TadirahConceptSource extends BaseDataSource<ITadirahConceptInput> {
    
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