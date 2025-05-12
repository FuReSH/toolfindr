import { WikidataSparqlSource } from "./data-sources/wikidata-sparql";
import { IPluginOptionsInternal, IResearchToolInput, IWikidataRest, ITadirahConceptInput, IWikidataSparqlGroupedByTool } from "./types";
import { WikidataRestSource } from "./data-sources/wikidata-rest";
import { TadirahSparqlSource } from "./data-sources/tadirah-sparql";
import { GatsbyCache } from "gatsby";

export class DataSourceManager {
  private wikidataSparql: WikidataSparqlSource;
  private wikidataRest: WikidataRestSource;
  private tadirah: TadirahSparqlSource;

  constructor(options: IPluginOptionsInternal, cache: GatsbyCache) {
    this.wikidataSparql = new WikidataSparqlSource(options.endpoint);
    this.wikidataRest = new WikidataRestSource(options.endpoint, {}, cache);
    this.tadirah = new TadirahSparqlSource(options.endpoint);
  }

  async fetchAllData(): Promise<{ data: { tools: IResearchToolInput[]; concepts: ITadirahConceptInput[] }; errors?: { message: string }[] }> {
    const errors: { message: string }[] = []; // Array zum Sammeln von Fehlern

    let wikidataSparqlItems: IWikidataSparqlGroupedByTool[] = [];
    let tadirahSparqlItems: ITadirahConceptInput[] = [];
    let wikidataRestItems: IWikidataRest[] = [];
    let researchTools: IResearchToolInput[] = [];

    try {
      // Abrufen der Daten aus Wikidata SPARQL
      wikidataSparqlItems = await this.wikidataSparql.getGroupedResearchTools();
    } catch (error) {
      errors.push({ message: error });
    }
    wikidataSparqlItems = wikidataSparqlItems.slice(0, 10)

    try {
      // Abrufen der Daten aus Wikidata REST
      wikidataRestItems = await this.wikidataRest.fetchData(wikidataSparqlItems.map(item => item.id));
    } catch (error) {
      errors.push({ message: error });
    }

    try {
        tadirahSparqlItems = await this.tadirah.fetchData();
      } catch (error) {
        errors.push({ message: error });
      }

    if (errors.length > 0) {
      return { data: null, errors };
    }

    if (wikidataRestItems.length !== 0) {
      // Schritt 1: Tools aus Wikidata SPARQL + REST bauen
      researchTools = this.buildToolsFromSparqlAndRest(wikidataSparqlItems, wikidataRestItems);
      // Schritt 2: Tadirah-Konzepte abrufen und zuordnen
      this.attachTadirahConcepts(researchTools, wikidataSparqlItems, tadirahSparqlItems);
    }

    return {
      data: {
        tools: researchTools,
        concepts: tadirahSparqlItems,
      },
      errors: undefined, // Gib Fehler nur zurück, wenn welche aufgetreten sind
    };
  }

  private buildToolsFromSparqlAndRest(
    sparqlItems: IWikidataSparqlGroupedByTool[],
    restItems: IWikidataRest[]
  ): IResearchToolInput[] {
    const restMap = new Map(restItems.map(item => [item.id, item]));

    return sparqlItems
      .map(tool => {
        const idSuffix = tool.id.split("/").pop();
        const restItem = restMap.get(idSuffix);

        return {
          id: tool.id,
          slug: idSuffix.toLowerCase(),
          label: restItem.label,
          description: restItem.description,
          concepts: [] // wird später gefüllt
        };
      });
  }

  private attachTadirahConcepts(
    tools: IResearchToolInput[],
    sparqlItems: IWikidataSparqlGroupedByTool[],
    tadirahConcepts: ITadirahConceptInput[]
  ): void {
    const conceptMap = new Map(tadirahConcepts.map(c => [c.id, c]));
    const sparqlMap = new Map(sparqlItems.map(i => [i.id, i]));

    tools.forEach(tool => {
      const sparqlTool = sparqlMap.get(tool.id);
      if (!sparqlTool) return;

      tool.concepts = sparqlTool.tadirahIds
        .map(id => conceptMap.get(id))
        .map(concept => concept.id);
    });
  }
}