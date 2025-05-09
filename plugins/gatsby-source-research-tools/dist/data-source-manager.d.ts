import { IPluginOptionsInternal, IResearchToolInput, ITadirahConceptInput } from "./types";
export declare class DataSourceManager {
    private wikidataSparql;
    private tadirah;
    constructor(options: IPluginOptionsInternal);
    fetchAllData(): Promise<{
        data: {
            tools: IResearchToolInput[];
            concepts: ITadirahConceptInput[];
        };
        errors: any;
    }>;
    private getResearchToolFromSources;
}
