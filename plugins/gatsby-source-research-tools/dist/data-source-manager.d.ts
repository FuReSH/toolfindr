import { IPluginOptionsInternal, IApiResponse } from "./types";
export declare class DataSourceManager {
    private researchToolSource;
    private tadirahConceptSource;
    private researchToolEnrichSource;
    constructor(options: IPluginOptionsInternal, lastFetchedDate: Date);
    fetchAllData(): Promise<IApiResponse>;
    private enrichResearchTools;
}
