import { WikidataSparqlSource } from "./data-sources/wikidata-sparql";
import { IPluginOptionsInternal, IResearchToolInput, IWikidataRest, ITadirahConceptInput, IWikidataSparqlGroupedByTool } from "./types";
import { WikidataRestSource } from "./data-sources/wikidata-rest";
import { TadirahSparqlSource } from "./data-sources/tadirah-sparql";

export class DataSourceManager {
  private wikidataSparql: WikidataSparqlSource;
  private wikidataRest: WikidataRestSource;
  private tadirah: TadirahSparqlSource;

  constructor(options: IPluginOptionsInternal) {
    this.wikidataSparql = new WikidataSparqlSource(options.endpoint);
    this.wikidataRest = new WikidataRestSource(options.endpoint);
    this.tadirah = new TadirahSparqlSource(options.endpoint);
  }

  async fetchAllData(): Promise<{ data: { tools: IResearchToolInput[]; concepts: ITadirahConceptInput[] }; errors?: { message: string }[] }> {
    const errors: { message: string }[] = []; // Array zum Sammeln von Fehlern

    let wikidataSparqlItems: IWikidataSparqlGroupedByTool[] = [];
    let tadirahSparqlItems: ITadirahConceptInput[] = [];
    let wikidataRestItems: IWikidataRest[] = [];

    try {
      // Abrufen der Daten aus Tadirah SPARQL
      tadirahSparqlItems = await this.tadirah.fetchData();
    } catch (error) {
      errors.push({ message: error });
    }

    try {
      // Abrufen der Daten aus Wikidata SPARQL
      wikidataSparqlItems = await this.wikidataSparql.getGroupedResearchTools();
    } catch (error) {
      errors.push({ message: error });
    }

    try {
      // Abrufen der Daten aus Wikidata REST
      wikidataRestItems = await this.wikidataRest.fetchData(wikidataSparqlItems.map(item => item.id));
    } catch (error) {
      errors.push({ message: error });
    }

    if (errors.length > 0) {
      return {
        data: null,
        errors: errors
      };
    }
    // Tools aus den Quellen kombinieren
    const tools = this.getResearchToolFromSources(wikidataSparqlItems, tadirahSparqlItems);

    return {
      data: {
        tools,
        concepts: tadirahSparqlItems,
      },
      errors: undefined, // Gib Fehler nur zurück, wenn welche aufgetreten sind
    };
  }

  private getResearchToolFromSources(
    tools: IWikidataSparqlGroupedByTool[],
    concepts: ITadirahConceptInput[]
  ): IResearchToolInput[] {
    return tools.map((tool) => {
      // Finde die zugehörigen Concepts basierend auf den tadirahIds
      const relatedConcepts = tool.tadirahIds.map((tadirahId) => {
        return concepts.find((concept) => concept.id === tadirahId);
      });
      // Erstelle das IResearchToolInput-Objekt
      return {
        id: tool.id,
        slug: `tool-${tool.id.split('/').pop()}`, // Beispiel für einen Slug
        concepts: relatedConcepts.map((concept) => concept.id),
      };
    });
  }
}