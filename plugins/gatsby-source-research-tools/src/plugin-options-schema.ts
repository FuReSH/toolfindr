import type { GatsbyNode } from "gatsby"
import type { ObjectSchema } from "gatsby-plugin-utils"

export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({
  Joi,
}): ObjectSchema => {
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
  })
}