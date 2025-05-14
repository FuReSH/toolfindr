import { BaseDataSource } from './base-data-source';
import { IWikidataSparql, IWikidataSparqlGroupedByTool } from '../types';
export declare class WikidataSparqlSource extends BaseDataSource<IWikidataSparql> {
    private engine;
    constructor(endpoint: string);
    fetchData(): Promise<IWikidataSparql[]>;
    getGroupedResearchTools(): Promise<IWikidataSparqlGroupedByTool[]>;
    private groupTadirahIds;
}
