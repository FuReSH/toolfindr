import { BaseDataSource } from './base-data-source';
import { IWikidataRest } from '../types';
import { GatsbyCache } from 'gatsby';
export declare class WikidataRestSource extends BaseDataSource<IWikidataRest> {
    private headers;
    constructor(endpoint: string, cache: GatsbyCache, token: string);
    fetchData(ids: string[]): Promise<IWikidataRest[]>;
    private httpRequest;
}
