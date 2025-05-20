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
const tadirah_concept_source_1 = require("./data-sources/tadirah-concept-source");
const research_tool_source_1 = require("./data-sources/research-tool-source");
const research_tool_enrich_source_1 = require("./data-sources/research-tool-enrich-source");
class DataSourceManager {
    constructor(options, lastFetchedDate) {
        this.researchToolSource = new research_tool_source_1.ResearchToolSource(options.wikidataSparqlUrl, lastFetchedDate);
        this.tadirahConceptSource = new tadirah_concept_source_1.TadirahConceptSource(options.tadirahFileUrl);
        this.researchToolEnrichSource = new research_tool_enrich_source_1.ResearchToolEnrichSource(options.wikidataLdfUrl);
    }
    fetchAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            let researchToolData = [];
            let tadirahConceptData = [];
            try {
                // Fetch data with Promise.all
                [tadirahConceptData, researchToolData] = yield Promise.all([
                    this.tadirahConceptSource.fetchData(),
                    this.researchToolSource.fetchData()
                ]);
                // Slicing for debugging purposes
                researchToolData = researchToolData.slice(0, 20);
                researchToolData = yield this.enrichResearchTools(researchToolData);
            }
            catch (error) {
                errors.push({ message: error });
            }
            return {
                data: {
                    tools: researchToolData,
                    concepts: tadirahConceptData
                },
                errors: errors.length > 0 ? errors : undefined, // Gib Fehler nur zurück, wenn welche aufgetreten sind
            };
        });
    }
    enrichResearchTools(tools) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.researchToolEnrichSource.fetchData(tools);
        });
    }
}
exports.DataSourceManager = DataSourceManager;
