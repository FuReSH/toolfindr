import { BaseDataSource } from './base-data-source';
import { IWikidataSparql, IWikidataSparqlGroupedByTool } from '../types';
export declare class WikidataSparqlSource extends BaseDataSource<IWikidataSparql> {
    private engine;
    constructor(endpoint: string, options?: any);
    fetchData(): Promise<IWikidataSparql[]>;
    getGroupedResearchTools(): Promise<IWikidataSparqlGroupedByTool[]>;
    private groupTadirahIds;
}
