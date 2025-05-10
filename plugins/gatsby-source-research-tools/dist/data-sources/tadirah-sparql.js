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
exports.TadirahSparqlSource = void 0;
const base_data_source_1 = require("./base-data-source");
const query_sparql_1 = require("@comunica/query-sparql");
class TadirahSparqlSource extends base_data_source_1.BaseDataSource {
    constructor(endpoint, options = {}) {
        // Call the parent constructor with the endpoint and options
        // Use the default endpoint if none is provided
        super(endpoint, options);
        this.engine = new query_sparql_1.QueryEngine();
        this.endpoint = "https://vocabs-downloads.acdh.oeaw.ac.at/vocabs-main/Humanities/TaDiRAH/tadirah.ttl";
        this.query = `
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

            SELECT ?tadirahID ?tadirahLabel
            WHERE {
            ?tadirahID skos:prefLabel ?tadirahLabel .
            FILTER (lang(?tadirahLabel) = "en")
            }
        `;
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                            id: binding.get('tadirahID').value,
                            label: binding.get('tadirahLabel').value,
                        });
                    });
                    bindingsStream.on('end', () => {
                        resolve(items);
                    });
                    bindingsStream.on('error', (error) => {
                        reject(this.handleError(error, "TadirahSparqlSource"));
                    });
                });
            }
            catch (error) {
                return Promise.reject(this.handleError(error, "TadirahSparqlSource"));
            }
        });
    }
}
exports.TadirahSparqlSource = TadirahSparqlSource;
