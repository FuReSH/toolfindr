import { IPluginOptionsInternal, IResearchToolInput, ITadirahConceptInput, IApiResponse } from "./types";
import { TadirahConceptSource } from "./data-sources/tadirah-concept-source";
import { ResearchToolSource } from "./data-sources/research-tool-source";
import { ResearchToolEnrichSource } from "./data-sources/research-tool-enrich-source";


export class DataSourceManager {
  private researchToolSource: ResearchToolSource
  private tadirahConceptSource: TadirahConceptSource
  private researchToolEnrichSource: ResearchToolEnrichSource

  constructor(options: IPluginOptionsInternal, lastFetchedDate: Date) {
    this.researchToolSource = new ResearchToolSource(options.wikidataSparqlUrl, lastFetchedDate);
    this.tadirahConceptSource = new TadirahConceptSource(options.tadirahFileUrl);
    this.researchToolEnrichSource = new ResearchToolEnrichSource(options.wikidataLdfUrl);
  }

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

      researchToolData = researchToolData.slice(0, 20);

      researchToolData = await this.enrichResearchTools(researchToolData);
    } catch (error) {
      errors.push({ message: error });
    }

    return {
      data: {
        tools: researchToolData,
        concepts: tadirahConceptData
      },
      errors: errors.length > 0 ? errors : undefined, // Gib Fehler nur zurück, wenn welche aufgetreten sind
    };
  }

  private async enrichResearchTools(tools: IResearchToolInput[]): Promise<IResearchToolInput[]> {
    return this.researchToolEnrichSource.fetchData(tools);
  }
}