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
exports.WikidataSparqlSource = void 0;
const base_data_source_1 = require("./base-data-source");
const query_sparql_1 = require("@comunica/query-sparql");
class WikidataSparqlSource extends base_data_source_1.BaseDataSource {
    constructor(endpoint) {
        // Call the parent constructor with the endpoint and options
        super(endpoint);
        this.engine = new query_sparql_1.QueryEngine();
        this.query = `
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>

            SELECT DISTINCT ?tool ?tadirahId
            WHERE {
            ?concept wdt:P9309 ?tadirahId. #find all TaDiRAH classes
            ?tool wdt:P366 ?concept;       # find all items, which claim to implement this concept
                (wdt:P31/(wdt:P279*)) wd:Q7397. # find all items, which are instances of or subclasses of software
            }
            ORDER BY ?tool
            LIMIT 1000000
        `;
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const bindingsStream = yield this.engine.queryBindings(this.query, {
                sources: [this.endpoint],
                httpRetryOnServerError: true,
                httpRetryCount: 3,
                httpRetryDelay: 100,
                noCache: false,
            });
            return new Promise((resolve, reject) => {
                const items = [];
                bindingsStream.on('data', (binding) => {
                    // Verarbeite jedes Binding einzeln
                    items.push({
                        id: binding.get('tool').value,
                        tadirahId: `https://vocabs.dariah.eu/tadirah/${binding.get('tadirahId').value}`,
                    });
                });
                bindingsStream.on('end', () => {
                    resolve(items);
                });
                bindingsStream.on('error', (error) => {
                    reject(this.handleError(error, "WikidataSparqlSource"));
                });
            });
        });
    }
    // Function to fetch and group research tools
    getGroupedResearchTools() {
        return __awaiter(this, void 0, void 0, function* () {
            // Zuerst die Rohdaten mit der existierenden Funktion holen
            try {
                const rawTools = yield this.fetchData();
                // Dann die Rohdaten gruppieren und das Ergebnis zurückgeben
                return this.groupTadirahIds(rawTools);
            }
            catch (error) {
                return Promise.reject(this.handleError(error, "WikidataSparqlSource"));
            }
        });
    }
    // Helper function to group research tools by their ID
    groupTadirahIds(data) {
        const toolMap = new Map();
        data.forEach((item) => {
            var _a;
            if (!toolMap.has(item.id)) {
                toolMap.set(item.id, []);
            }
            (_a = toolMap.get(item.id)) === null || _a === void 0 ? void 0 : _a.push(item.tadirahId);
        });
        return Array.from(toolMap.entries()).map(([id, tadirahIds]) => ({
            id,
            tadirahIds
        }));
    }
}
exports.WikidataSparqlSource = WikidataSparqlSource;
