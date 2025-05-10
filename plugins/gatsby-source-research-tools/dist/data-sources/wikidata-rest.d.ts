import { BaseDataSource } from './base-data-source';
import { IWikidataRest } from '../types';
export declare class WikidataRestSource extends BaseDataSource<IWikidataRest> {
    private headers;
    constructor(endpoint: string, options?: any);
    fetchData(ids: string[]): Promise<IWikidataRest[]>;
}
