import { IPluginOptionsInternal, IResearchToolInput, ITadirahConceptInput } from "./types";
import { GatsbyCache } from "gatsby";
export declare class DataSourceManager {
    private wikidataSparql;
    private wikidataRest;
    private tadirah;
    constructor(options: IPluginOptionsInternal, cache: GatsbyCache);
    fetchAllData(): Promise<{
        data: {
            tools: IResearchToolInput[];
            concepts: ITadirahConceptInput[];
        };
        errors?: {
            message: string;
        }[];
    }>;
    private buildToolsFromSparqlAndRest;
    private attachTadirahConcepts;
}
