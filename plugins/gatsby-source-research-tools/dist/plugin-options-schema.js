"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginOptionsSchema = void 0;
const pluginOptionsSchema = ({ Joi, }) => {
    return Joi.object({
        wikidataSparqlUrl: Joi.string()
            .uri()
            .required()
            .description(`The Wikidata SPARQL endpoint URL.`),
        wikidataRestUrl: Joi.string()
            .uri()
            .required()
            .description(`The Wikidata REST endpoint URL.`),
        token: Joi.string()
            .required()
            .description(`The token for the Wikidata REST API.`),
        tadirahFileUrl: Joi.string()
            .uri()
            .required()
            .description(`The TADIRAH turtle file URL on vocabs.dariah.eu.`),
    });
};
exports.pluginOptionsSchema = pluginOptionsSchema;
