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
exports.ResearchToolSource = void 0;
const base_data_source_1 = require("./base-data-source");
const query_sparql_1 = require("@comunica/query-sparql");
class ResearchToolSource extends base_data_source_1.BaseDataSource {
    constructor(endpoint, lastFetchedDate) {
        const query = `
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX schema: <http://schema.org/>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

            SELECT 
            ?tool 
            (SAMPLE(?label_final) AS ?label) 
            ?description 
            ?date_modified 
            (GROUP_CONCAT(DISTINCT ?tadirahIRI; SEPARATOR=", ") AS ?tadirahIRIs)
            (GROUP_CONCAT(DISTINCT ?instanceof_label; SEPARATOR=", ") AS ?instanceof_labels)
            (GROUP_CONCAT(DISTINCT ?license_label; SEPARATOR=", ") AS ?license_labels)
            ?copyright_label
            WHERE {
            ?concept wdt:P9309 ?tadirahId .
            ?tool wdt:P366 ?concept ;
                    wdt:P31/wdt:P279* wd:Q7397 .
             ${lastFetchedDate ? `
                    ?tool ^schema:about/schema:dateModified ?date_modified .
                    FILTER (?date_modified >= "${lastFetchedDate.toISOString().split('T')[0]}"^^xsd:date)
                ` : ''}

            ?tool wdt:P31 ?instanceof .
            ?instanceof rdfs:label ?instanceof_label .
            FILTER (LANG(?instanceof_label) = "en") .

            OPTIONAL {
                ?tool rdfs:label ?label_en .
                FILTER (LANG(?label_en) = "en") 
            }
            OPTIONAL {
                ?tool schema:description ?description .
                FILTER (LANG(?description) = "en")
            }
            OPTIONAL {
                ?tool wdt:P6216 ?copyright .
                ?copyright rdfs:label ?copyright_label .
                FILTER (LANG(?copyright_label) = "en")
            }
            OPTIONAL {
                ?tool wdt:P275 ?license .
                ?license rdfs:label ?license_label .
                FILTER (LANG(?license_label) = "en")
            }

            BIND(STRAFTER(STR(?tool), "http://www.wikidata.org/entity/") AS ?qid)
            BIND(COALESCE(?label_en, ?qid) AS ?label_final)

            BIND(IRI(CONCAT("https://vocabs.dariah.eu/tadirah/", STR(?tadirahId))) AS ?tadirahIRI)
            }
            GROUP BY 
            ?tool 
            ?description 
            ?date_modified 
            ?copyright_label
            LIMIT 10000
            `;
        super(endpoint, new query_sparql_1.QueryEngine(), query);
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bindingsStream = yield this.engine.queryBindings(this.query, {
                    sources: [{
                            type: 'sparql',
                            value: this.endpoint,
                        }],
                    httpRetryOnServerError: true,
                    httpRetryCount: 3,
                    httpRetryDelay: 100,
                    noCache: false,
                });
                return new Promise((resolve, reject) => {
                    const researchTools = [];
                    bindingsStream.on('data', (binding) => {
                        var _a, _b;
                        // Verarbeite jedes Binding einzeln
                        researchTools.push({
                            id: binding.get('tool').value,
                            label: binding.get('label').value,
                            slug: binding.get('tool').value.split('/').pop().toLowerCase(),
                            concepts: binding.get('tadirahIRIs').value.split(', '),
                            instancesof: binding.get('instanceof_labels').value.split(', '),
                            description: ((_a = binding.get('description')) === null || _a === void 0 ? void 0 : _a.value) || null,
                            license: (() => {
                                const licenses = binding.get('license_labels').value.split(', ');
                                return licenses.length === 1 && licenses[0] === '' ? null : licenses;
                            })(),
                            copyright: ((_b = binding.get('copyright_label')) === null || _b === void 0 ? void 0 : _b.value) || null
                        });
                    });
                    bindingsStream.on('end', () => {
                        resolve(researchTools);
                    });
                    bindingsStream.on('error', (error) => {
                        reject(this.handleError(error, "ResearchToolsSource"));
                    });
                });
            }
            catch (error) {
                return Promise.reject(this.handleError(error, "ResearchToolsSource"));
            }
        });
    }
}
exports.ResearchToolSource = ResearchToolSource;
