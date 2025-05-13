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
            "Accept": "application/json",
            "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxOTlhM2EwZDI1MDZjMTAwMWM1NjA1Njk4ZjEwYTJjYiIsImp0aSI6IjhmZGVjNjk2OTc0YWJhMzkxZTc4MDAyN2UzOWVjMGYxYjE5MDUzNzljZGZlMjE4YTVkOTUxMjk1ZDk1OWVlOTZjZDBkNzM2ZWRmMGNmNDhiIiwiaWF0IjoxNzQ0MjE5MTM4LjczNDY4OCwibmJmIjoxNzQ0MjE5MTM4LjczNDY5LCJleHAiOjMzMzAxMTI3OTM4LjcyNjcwNywic3ViIjoiNTk0NTA3MjIiLCJpc3MiOiJodHRwczovL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.ej5wBkFb49wiTPK2wYkmMH0gwUcTqwB7_0ZzKyv-bYu7LsAkna7gH_ZCt7hoag-tCm2X1_10AZirFN8Ux6zHLSrzFmXZQLMm_TdDBH4iaO4ZRvJ7CtubKVa6n2ambkNLxN0B7fBMF7PH8ynjNEEFZMi_UcfrxRSdj2XVtBQWWBSEG7o4nBXqJ9AjjfD6zXd0sZkaVFQ4-DVTeB80YcRzZ2dryAlg0uqsundzsZAVwsgQlcZk4stoV7KwiuBX14Kah8wnRY6p-JH1J1-Jy970IrRrhNNA0wzQmG3tZ905qO5h92Z3YQqH-2uLs1NK1jkptzOm_rVZ0zcpUOaXZTM4uREMLDfY6goVuo7-A8iq7YCzffynKVpacN0ikz0d_fEiFlzYGP__QIKJzRZudXYR7XNKjJBl1HkcSV7o3dBCuptuE6Q_fD2TFzh9D7JDY_zLLJikL_ZFaBmmLLzv_jlSRMy8z0GmmDeGyahuoR8QlWYUbHdBbGAvxiEoIwIyHa6GUx333YTeLUapI8OAzEg4xFVfMkQ-aJTeItxLdnLPX_q56I4zsBV63klfF6dNTriiAU4k62TG0LmGgBnQKy4Wj_wTvt8yXs6swHoITdL0uk468HJq-j5-BoG60jxQmSTPLDvgZ9b7Cxqj0c_JGYr5N3v3Zv0VhbDk-8eyGCAQma0`,
            //"Api-User-Agent": "Example/1.0"
        };
    }
    fetchData(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            // Sleep-Funktion für die Pause
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            for (const id of ids) {
                const url = `${this.endpoint}/entities/items/${id.split("/").pop()}`;
                const cacheKey = `wikidata-last-modified-${id}`;
                const lastModified = yield this.cache.get(cacheKey);
                const headers = Object.assign({}, this.headers);
                if (lastModified) {
                    headers["If-Modified-Since"] = lastModified;
                }
                const response = yield this.httpRequest(url, "HEAD", headers);
                if (response.status === 304) {
                    continue; // No new data, skip to the next ID
                }
                if (!response.ok) {
                    let errorDetails = yield response.json();
                    this.handleError(errorDetails, "WikidataRestSource");
                }
                if (response.status === 200) {
                    const response = yield this.httpRequest(url, "GET", headers);
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
