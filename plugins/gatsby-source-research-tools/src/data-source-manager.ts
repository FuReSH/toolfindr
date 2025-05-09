import { WikidataSparqlSource } from "./data-sources/wikidata-sparql";
import { IPluginOptionsInternal, IResearchToolInput, ITadirahConceptInput, IWikidataSparqlGroupedByTool } from "./types";
//import { WikidataRestSource } from "./data-sources/wikidata-rest";
import { TadirahSparqlSource } from "./data-sources/tadirah-sparql";

export class DataSourceManager {
    private wikidataSparql: WikidataSparqlSource;
    //private wikidataRest: WikidataRestSource;
    private tadirah: TadirahSparqlSource;
  
    constructor(options: IPluginOptionsInternal) {
      this.wikidataSparql = new WikidataSparqlSource(options.endpoint);
      //this.wikidataRest = new WikidataRestSource(options.wikidataRest);
      this.tadirah = new TadirahSparqlSource(options.endpoint);
    }
  
    async fetchAllData() {
      // Parallel abrufen für bessere Performance
      const [wikidataSparqlItems, tadirahSparqlItems] = await Promise.all([
        this.wikidataSparql.getGroupedResearchTools(),
        //this.wikidataRest.fetchData(),
        this.tadirah.fetchData(),
      ]);

      const researchTools = this.getResearchToolFromSources(wikidataSparqlItems, tadirahSparqlItems);
      console.log("Research Tools:", researchTools);

      return {
        data: {
            tools: researchTools, //this.getResearchToolFromSources(wikidataSparqlItems, tadirahSparqlItems),
            concepts: tadirahSparqlItems,
          },
        errors: undefined,
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