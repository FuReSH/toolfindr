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
    constructor(options, cache) {
        this.wikidataSparql = new wikidata_sparql_1.WikidataSparqlSource(options.endpoint);
        this.wikidataRest = new wikidata_rest_1.WikidataRestSource(options.endpoint, {}, cache);
        this.tadirah = new tadirah_sparql_1.TadirahSparqlSource(options.endpoint);
    }
    fetchAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = []; // Array zum Sammeln von Fehlern
            let wikidataSparqlItems = [];
            let tadirahSparqlItems = [];
            let wikidataRestItems = [];
            let researchTools = [];
            try {
                // Abrufen der Daten aus Wikidata SPARQL
                wikidataSparqlItems = yield this.wikidataSparql.getGroupedResearchTools();
            }
            catch (error) {
                errors.push({ message: error });
            }
            wikidataSparqlItems = wikidataSparqlItems.slice(0, 10);
            try {
                // Abrufen der Daten aus Wikidata REST
                wikidataRestItems = yield this.wikidataRest.fetchData(wikidataSparqlItems.map(item => item.id));
            }
            catch (error) {
                errors.push({ message: error });
            }
            try {
                tadirahSparqlItems = yield this.tadirah.fetchData();
            }
            catch (error) {
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
        });
    }
    buildToolsFromSparqlAndRest(sparqlItems, restItems) {
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
    attachTadirahConcepts(tools, sparqlItems, tadirahConcepts) {
        const conceptMap = new Map(tadirahConcepts.map(c => [c.id, c]));
        const sparqlMap = new Map(sparqlItems.map(i => [i.id, i]));
        tools.forEach(tool => {
            const sparqlTool = sparqlMap.get(tool.id);
            if (!sparqlTool)
                return;
            tool.concepts = sparqlTool.tadirahIds
                .map(id => conceptMap.get(id))
                .map(concept => concept.id);
        });
    }
}
exports.DataSourceManager = DataSourceManager;
