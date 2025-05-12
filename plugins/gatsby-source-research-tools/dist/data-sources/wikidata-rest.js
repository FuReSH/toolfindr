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
class WikidataRestSource extends base_data_source_1.BaseDataSource {
    constructor(endpoint, options = {}, cache) {
        super(endpoint, options);
        this.endpoint = "https://www.wikidata.org/w/rest.php/wikibase/v1";
        this.cache = cache;
        this.headers = {
            "Content-Type": "application/json",
            "Api-User-Agent": "Example/1.0"
        };
    }
    fetchData(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            // Sleep-Funktion für die Pause
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            try {
                for (const id of ids) {
                    const url = `${this.endpoint}/entities/items/${id.split("/").pop()}`;
                    const cacheKey = `wikidata-last-modified-${id}`;
                    const lastModified = yield this.cache.get(cacheKey);
                    const headers = Object.assign({}, this.headers);
                    if (lastModified) {
                        headers["If-Modified-Since"] = lastModified;
                    }
                    const response = yield (0, node_fetch_1.default)(url, {
                        method: 'GET',
                        headers: headers,
                    });
                    if (response.status === 304) {
                        continue; // No new data, skip to the next ID
                    }
                    if (!response.ok) {
                        let errorDetails = yield response.json();
                        throw new Error(`[WikidataRestSource] Fehler beim Abrufen von ID ${id}: ${JSON.stringify(errorDetails)}`);
                    }
                    if (response.status === 200) {
                        const data = yield response.json();
                        const newLastModified = response.headers.get("last-modified");
                        if (newLastModified) {
                            yield this.cache.set(cacheKey, newLastModified);
                        }
                        results.push({
                            id: data.id,
                            label: data.labels.en ? data.labels.en : data.id,
                            description: data.descriptions.en ? data.descriptions.en : "No description available",
                        });
                    }
                    yield sleep(3000);
                }
                return results;
            }
            catch (error) {
                return Promise.reject(this.handleError(error, "WikidataRestSource"));
            }
        });
    }
}
exports.WikidataRestSource = WikidataRestSource;
