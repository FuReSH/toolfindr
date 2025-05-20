import { IResearchToolInput } from '../types';
import { BaseDataSource } from './base-data-source';
import { QueryEngine } from '@comunica/query-sparql';


type EnrichableKey = 'image' | 'logo' | 'website' | 'repository' | 'version';

const propertiesMap: Record<string, EnrichableKey> = {
    'wdt:P18': 'image',
    'wdt:P154': 'logo',
    'wdt:P856': 'website',
    'wdt:P1324': 'repository',
    'wdt:P348': 'version'
};

export class ResearchToolEnrichSource extends BaseDataSource<IResearchToolInput> {

    constructor(endpoint: string) {
        super(endpoint, new QueryEngine());
    }

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
                                    // value ist z.B. 'website', 'image', etc.
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
            await this.sleep(3000); // 3 Sekunden warten nach jedem Tool

        }
        return enrichedTools;
    }

    protected getQueryFromTemplate(s: string, p: string): string {
        return `
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            SELECT ?o WHERE {
                <${s}> ${p} ?o .
            }
        `;
    }

    protected async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}