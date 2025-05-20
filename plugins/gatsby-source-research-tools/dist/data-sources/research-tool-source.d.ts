import { BaseDataSource } from './base-data-source';
import { IResearchToolInput } from '../types';
export declare class ResearchToolSource extends BaseDataSource<IResearchToolInput> {
    constructor(endpoint: string, lastFetchedDate: Date);
    fetchData(): Promise<IResearchToolInput[]>;
}
