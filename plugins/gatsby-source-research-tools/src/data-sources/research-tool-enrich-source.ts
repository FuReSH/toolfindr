import { IResearchToolInput } from '../types';
import { BaseDataSource } from './base-data-source';
import { QueryEngine } from '@comunica/query-sparql';

/**
 * Keys for enrichable properties of a research tool.
 */
type EnrichableKey = 'image' | 'logo' | 'website' | 'repository' | 'version';

/**
 * Maps Wikidata property IRIs to enrichable property keys.
 */
const propertiesMap: Record<string, EnrichableKey> = {
    'wdt:P18': 'image',
    'wdt:P154': 'logo',
    'wdt:P856': 'website',
    'wdt:P1324': 'repository',
    'wdt:P348': 'version'
};

/**
 * Data source for enriching research tools with additional properties
 * such as image, logo, website, repository, and version.
 * It uses the Wikidata Linked Data Fragments Server.
 * 
 * @extends BaseDataSource<IResearchToolInput>
 * 
 * @see https://linkeddatafragments.org/
 * @see https://www.wikidata.org/wiki/Wikidata:Data_access#Linked_Data_Fragments_endpoint
 * @see Playground: https://query.wikidata.org/bigdata/ldf
 */
export class ResearchToolEnrichSource extends BaseDataSource<IResearchToolInput> {
    
    /**
     * Creates a new instance of ResearchToolEnrichSource.
     * @param endpoint The LDF endpoint URL.
     */
    constructor(endpoint: string) {
        super(endpoint, new QueryEngine());
    }

    /**
     * Enriches a list of research tools with additional properties defined in propertiesMap.
     * For each tool, queries the endpoint for each property and adds the results to the tool object.
     * 
     * @param tools The research tools to enrich.
     * @returns The enriched research tools.
     * @throws If the query fails or the stream emits an error. 
     */
    public async fetchData(tools: IResearchToolInput[]): Promise<IResearchToolInput[]> {
        const enrichedTools: IResearchToolInput[] = [];
        for (const tool of tools) {
            await Promise.all(
                Object.entries(propertiesMap).map(async ([key, value]) => {
                    const query = this.getQueryFromTemplate(tool.id, key);
                    try {
                        const bindingsStream = await this.engine.queryBindings(query, {
                            sources: [this.endpoint],
                            httpRetryOnServerError: true,
                            httpRetryCount: 3,
                            httpRetryDelay: 100,
                            noCache: false,
                        });

                        return new Promise<void>((resolve, reject) => {
                            const results: string[] = [];
                            bindingsStream.on('data', (binding) => {
                                const v = binding.get('o')?.value;
                                if (v) results.push(v);
                            });
                            bindingsStream.on('end', () => {
                                if (results.length > 0) {
                                    // value is e.g. 'website', 'image', etc.
                                    (tool as any)[value] = results;
                                }
                                resolve();
                            });
                            bindingsStream.on('error', (error) => {
                                reject(this.handleError(error, "ResearchToolEnrichSource"));
                            });
                        });
                    } catch (error) {
                        throw this.handleError(error, "ResearchToolEnrichSource");
                    }
                })
            );
            enrichedTools.push(tool);
            // print processed tool for debugging
            //this.logProgress(tool.label)
            await this.sleep(1000); // wait 1 second after each tool
        }
        return enrichedTools;
    }

    /**
     * Creates a SPARQL query for a given subject and property.
     * @param s The subject URI (e.g., tool ID).
     * @param p The property IRI (e.g., wdt:P856).
     * @returns The SPARQL query string.
     */
    protected getQueryFromTemplate(s: string, p: string): string {
        return `
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            SELECT ?o WHERE {
                <${s}> ${p} ?o .
            }
        `;
    }

    /**
     * Asynchronously waits for the specified amount of time.
     * @param ms Time in milliseconds.
     */
    protected async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}