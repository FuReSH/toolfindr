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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WikidataRestSource = void 0;
const base_data_source_1 = require("./base-data-source");
const node_fetch_1 = __importDefault(require("node-fetch"));
const p_limit_1 = __importDefault(require("p-limit"));
const query_sparql_1 = require("@comunica/query-sparql");
class WikidataRestSource extends base_data_source_1.BaseDataSource {
    constructor(endpoint, cache, token) {
        super(endpoint, new query_sparql_1.QueryEngine(), undefined);
        this.headers = {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip,deflate",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            //"Api-User-Agent": "Example/1.0"
        };
    }
    fetchData(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            // Begrenze die Anzahl paralleler Requests (z. B. 10 gleichzeitig)
            const limit = (0, p_limit_1.default)(10);
            // Funktion zur Verarbeitung einer einzelnen ID
            const processId = (id) => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.endpoint}/entities/items/${id.split("/").pop()}`;
                const cacheKey = `wikidata-last-modified-${id}`;
                //const lastModified: Date = await this.cache.get(cacheKey);
                const headers = Object.assign({}, this.headers);
                /*if (lastModified) {
                  headers["If-Modified-Since"] = lastModified;
                }*/
                const response = yield this.httpRequest(url, "HEAD", headers);
                if (response.status === 304) {
                    console.log(response.status);
                    return; // No new data, skip to the next ID
                }
                if (response.status === 200) {
                    const response = yield this.httpRequest(url, "GET", headers);
                    console.log(response.status);
                    const data = yield response.json();
                    if (!response.ok) {
                        let errorDetails = yield response.json();
                        throw errorDetails;
                    }
                    const newLastModified = response.headers.get("last-modified");
                    /*if (newLastModified) {
                      await this.cache.set(cacheKey, newLastModified);
                    }*/
                    results.push({
                        id: data.id,
                        label: data.labels.en ? data.labels.en : data.id,
                        description: data.descriptions.en ? data.descriptions.en : "No description available",
                    });
                }
            });
            try {
                // Verarbeite die IDs in parallelen Tasks mit Begrenzung
                const tasks = ids.map(id => limit(() => processId(id)));
                yield Promise.all(tasks);
            }
            catch (error) {
                return Promise.reject(this.handleError(error, "WikidataRestSource"));
            }
            return results;
        });
    }
    httpRequest(url, method, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(url, {
                method: method,
                headers: headers,
            });
            return response;
        });
    }
}
exports.WikidataRestSource = WikidataRestSource;
