import { IResearchToolInput } from '../types';
import { BaseDataSource } from './base-data-source';
export declare class ResearchToolEnrichSource extends BaseDataSource<IResearchToolInput> {
    constructor(endpoint: string);
    fetchData(tools: IResearchToolInput[]): Promise<IResearchToolInput[]>;
    protected getQueryFromTemplate(s: string, p: string): string;
    protected sleep(ms: number): Promise<void>;
}
