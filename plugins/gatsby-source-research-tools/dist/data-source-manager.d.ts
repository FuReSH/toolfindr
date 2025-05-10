import { IPluginOptionsInternal, IResearchToolInput, ITadirahConceptInput } from "./types";
export declare class DataSourceManager {
    private wikidataSparql;
    private wikidataRest;
    private tadirah;
    constructor(options: IPluginOptionsInternal);
    fetchAllData(): Promise<{
        data: {
            tools: IResearchToolInput[];
            concepts: ITadirahConceptInput[];
        };
        errors?: {
            message: string;
        }[];
    }>;
    private getResearchToolFromSources;
}
