"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginOptionsSchema = void 0;
const pluginOptionsSchema = ({ Joi, }) => {
    return Joi.object({
        wikidataSparqlUrl: Joi.string()
            .uri()
            .required()
            .description(`The Wikidata SPARQL endpoint URL.`),
        wikidataLdfUrl: Joi.string()
            .uri()
            .required()
            .description(`The Wikidata LDF endpoint URL.`),
        tadirahFileUrl: Joi.string()
            .uri()
            .required()
            .description(`The TADIRAH turtle file URL on vocabs.dariah.eu.`),
    });
};
exports.pluginOptionsSchema = pluginOptionsSchema;
