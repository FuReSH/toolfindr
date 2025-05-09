import { BaseDataSource } from './base-data-source';
import { QueryEngine } from '@comunica/query-sparql';
import { IWikidataSparql, IWikidataSparqlGroupedByTool } from '../types';

export class WikidataSparqlSource extends BaseDataSource<IWikidataSparql> {
    private engine: QueryEngine;

    constructor(endpoint: string, options: any = {}) {
        // Call the parent constructor with the endpoint and options
        // Use the default endpoint if none is provided
        super(endpoint, options);
        this.engine = new QueryEngine();
        this.endpoint = "https://query.wikidata.org/sparql";
    }

    async fetchData(): Promise<IWikidataSparql[]> {
        try {
            const query = `
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>

            SELECT DISTINCT ?tool ?tadirahId
            WHERE {
            ?concept wdt:P9309 ?tadirahId. #find all TaDiRAH classes
            ?tool wdt:P366 ?concept;       # find all items, which claim to implement this concept
                (wdt:P31/(wdt:P279*)) wd:Q7397.
            }
            ORDER BY ?tool
            LIMIT 1000000
        `;

            const bindingsStream = await this.engine.queryBindings(query, {
                sources: [this.endpoint],
                httpRetryOnServerError: true,
                httpRetryCount: 3,
                httpRetryDelay: 100,
                noCache: false,
            });


            return new Promise((resolve, reject) => {
                const items: IWikidataSparql[] = [];

                bindingsStream.on('data', (binding) => {
                    // Verarbeite jedes Binding einzeln
                    items.push({
                        id: binding.get('tool').value,
                        tadirahId: `https://vocabs.dariah.eu/tadirah/${binding.get('tadirahId').value}`,
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

    // Function to fetch and group research tools
    async getGroupedResearchTools(): Promise<IWikidataSparqlGroupedByTool[]> {
        // Zuerst die Rohdaten mit der existierenden Funktion holen
        const rawTools = await this.fetchData();

        // Dann die Rohdaten gruppieren und das Ergebnis zurückgeben
        return this.groupTadirahIds(rawTools);
    }

    // Helper function to group research tools by their ID
    private groupTadirahIds(data: IWikidataSparql[]): IWikidataSparqlGroupedByTool[] {
        const toolMap = new Map<string, string[]>();

        data.forEach((item) => {
            if (!toolMap.has(item.id)) {
                toolMap.set(item.id, []);
            }
            toolMap.get(item.id)?.push(item.tadirahId);
        });

        return Array.from(toolMap.entries()).map(([id, tadirahIds]) => ({
            id,
            tadirahIds
        }));
    }
}