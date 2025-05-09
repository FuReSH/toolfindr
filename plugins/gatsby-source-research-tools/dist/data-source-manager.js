"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceManager = void 0;
const wikidata_sparql_1 = require("./data-sources/wikidata-sparql");
//import { WikidataRestSource } from "./data-sources/wikidata-rest";
const tadirah_sparql_1 = require("./data-sources/tadirah-sparql");
class DataSourceManager {
    constructor(options) {
        this.wikidataSparql = new wikidata_sparql_1.WikidataSparqlSource(options.endpoint);
        //this.wikidataRest = new WikidataRestSource(options.wikidataRest);
        this.tadirah = new tadirah_sparql_1.TadirahSparqlSource(options.endpoint);
    }
    fetchAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            // Parallel abrufen für bessere Performance
            const [wikidataSparqlItems, tadirahSparqlItems] = yield Promise.all([
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
        });
    }
    getResearchToolFromSources(tools, concepts) {
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
exports.DataSourceManager = DataSourceManager;
