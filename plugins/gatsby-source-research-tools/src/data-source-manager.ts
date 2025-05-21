import { IPluginOptionsInternal, IResearchToolInput, ITadirahConceptInput, IApiResponse } from "./types";
import { TadirahConceptSource } from "./data-sources/tadirah-concept-source";
import { ResearchToolSource } from "./data-sources/research-tool-source";
import { ResearchToolEnrichSource } from "./data-sources/research-tool-enrich-source";

/**
 * Manages the orchestration of data sources for research tools and Tadirah concepts.
 * 
 * The `DataSourceManager` class is responsible for coordinating the fetching and enrichment
 * of research tool data and Tadirah concept data from various sources. It handles the
 * initialization of data source classes, manages error collection, and returns a unified
 * API response object.
 * 
 * @remarks
 * This class fetches research tool data from a SPARQL endpoint, Tadirah concepts from a file,
 * and enriches research tool data with additional information. It is designed to be used as
 * a central data orchestrator in the Gatsby source plugin.
 * 
 * @example
 * ```typescript
 * const manager = new DataSourceManager(options, lastFetchedDate);
 * const result = await manager.fetchAllData();
 * ```
 */
export class DataSourceManager {
  private researchToolSource: ResearchToolSource
  private tadirahConceptSource: TadirahConceptSource
  private researchToolEnrichSource: ResearchToolEnrichSource

  /**
   * Constructs a new DataSourceManager.
   * 
   * @param options - Internal plugin options containing endpoint URLs.
   * @param lastFetchedDate - Only fetch research tools modified since this date.
   */
  constructor(options: IPluginOptionsInternal, lastFetchedDate: Date) {
    this.researchToolSource = new ResearchToolSource(options.wikidataSparqlUrl, lastFetchedDate);
    this.tadirahConceptSource = new TadirahConceptSource(options.tadirahFileUrl);
    this.researchToolEnrichSource = new ResearchToolEnrichSource(options.wikidataLdfUrl);
  }

  /**
   * Fetches and enriches all research tool and Tadirah concept data.
   * 
   * @returns A promise resolving to an API response containing tools, concepts, and any errors.
   */
  async fetchAllData(): Promise<IApiResponse> {
    const errors: { message: string }[] = [];

    let researchToolData: IResearchToolInput[] = [];
    let tadirahConceptData: ITadirahConceptInput[] = [];

    try {
      // Fetch data with Promise.all
      [tadirahConceptData, researchToolData] = await Promise.all([
        this.tadirahConceptSource.fetchData(),
        this.researchToolSource.fetchData()
      ]);

      // Uncomment slicing for debugging purposes
      //researchToolData = researchToolData.slice(0, 20);

      researchToolData = await this.enrichResearchTools(researchToolData);
    } catch (error) {
      errors.push({ message: error });
    }

    return {
      data: {
        tools: researchToolData,
        concepts: tadirahConceptData
      },
      errors: errors.length > 0 ? errors : undefined, // Only return errors if any occurred
    };
  }

  /**
   * Enriches research tool data with additional information.
   * 
   * @param tools - The array of research tool inputs to enrich.
   * @returns A promise resolving to the enriched research tool data.
   */
  private async enrichResearchTools(tools: IResearchToolInput[]): Promise<IResearchToolInput[]> {
    return this.researchToolEnrichSource.fetchData(tools);
  }
}