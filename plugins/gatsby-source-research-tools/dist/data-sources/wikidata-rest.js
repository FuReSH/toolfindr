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
    constructor(endpoint, options = {}) {
        super(endpoint, options);
        this.endpoint = "https://www.wikidata.org/w/rest.php/wikibase/v1";
        this.headers = {
            "Content-Type": "application/json",
        };
    }
    fetchData(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                    const url = `${this.endpoint}/entities/items/${id}/labels/en`;
                    const response = yield (0, node_fetch_1.default)(url, {
                        method: 'GET',
                        header: this.headers,
                    });
                    if (!response.ok) {
                        return new Error(`Fehler beim Abrufen von ID ${id}: ${response.statusText}`);
                    }
                    const data = yield response.json();
                    return data;
                })));
                return results.filter((item) => item !== null);
            }
            catch (error) {
                return Promise.reject(this.handleError(error, "WikidataRestSource"));
            }
        });
    }
}
exports.WikidataRestSource = WikidataRestSource;
