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
exports.ResearchToolEnrichSource = void 0;
const base_data_source_1 = require("./base-data-source");
const query_sparql_1 = require("@comunica/query-sparql");
const propertiesMap = {
    'wdt:P18': 'image',
    'wdt:P154': 'logo',
    'wdt:P856': 'website',
    'wdt:P1324': 'repository',
    'wdt:P348': 'version'
};
class ResearchToolEnrichSource extends base_data_source_1.BaseDataSource {
    constructor(endpoint) {
        super(endpoint, new query_sparql_1.QueryEngine());
    }
    fetchData(tools) {
        return __awaiter(this, void 0, void 0, function* () {
            const enrichedTools = [];
            for (const tool of tools) {
                yield Promise.all(Object.entries(propertiesMap).map((_a) => __awaiter(this, [_a], void 0, function* ([key, value]) {
                    const query = this.getQueryFromTemplate(tool.id, key);
                    try {
                        const bindingsStream = yield this.engine.queryBindings(query, {
                            sources: [this.endpoint],
                            httpRetryOnServerError: true,
                            httpRetryCount: 3,
                            httpRetryDelay: 100,
                            noCache: false,
                        });
                        return new Promise((resolve, reject) => {
                            const results = [];
                            bindingsStream.on('data', (binding) => {
                                var _a;
                                const v = (_a = binding.get('o')) === null || _a === void 0 ? void 0 : _a.value;
                                if (v)
                                    results.push(v);
                            });
                            bindingsStream.on('end', () => {
                                if (results.length > 0) {
                                    // value ist z.B. 'website', 'image', etc.
                                    tool[value] = results;
                                }
                                resolve();
                            });
                            bindingsStream.on('error', (error) => {
                                reject(this.handleError(error, "ResearchToolEnrichSource"));
                            });
                        });
                    }
                    catch (error) {
                        throw this.handleError(error, "ResearchToolEnrichSource");
                    }
                })));
                enrichedTools.push(tool);
                yield this.sleep(3000); // 3 Sekunden warten nach jedem Tool
            }
            return enrichedTools;
        });
    }
    getQueryFromTemplate(s, p) {
        return `
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            SELECT ?o WHERE {
                <${s}> ${p} ?o .
            }
        `;
    }
    sleep(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, ms));
        });
    }
}
exports.ResearchToolEnrichSource = ResearchToolEnrichSource;
