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
const wikidata_rest_1 = require("./data-sources/wikidata-rest");
const tadirah_sparql_1 = require("./data-sources/tadirah-sparql");
class DataSourceManager {
    constructor(options) {
        this.wikidataSparql = new wikidata_sparql_1.WikidataSparqlSource(options.endpoint);
        this.wikidataRest = new wikidata_rest_1.WikidataRestSource(options.endpoint);
        this.tadirah = new tadirah_sparql_1.TadirahSparqlSource(options.endpoint);
    }
    fetchAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = []; // Array zum Sammeln von Fehlern
            let wikidataSparqlItems = [];
            let tadirahSparqlItems = [];
            let wikidataRestItems = [];
            try {
                // Abrufen der Daten aus Tadirah SPARQL
                tadirahSparqlItems = yield this.tadirah.fetchData();
            }
            catch (error) {
                errors.push({ message: error });
            }
            try {
                // Abrufen der Daten aus Wikidata SPARQL
                wikidataSparqlItems = yield this.wikidataSparql.getGroupedResearchTools();
            }
            catch (error) {
                errors.push({ message: error });
            }
            try {
                // Abrufen der Daten aus Wikidata REST
                wikidataRestItems = yield this.wikidataRest.fetchData(wikidataSparqlItems.map(item => item.id));
            }
            catch (error) {
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
