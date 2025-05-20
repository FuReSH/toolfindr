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
    wikidataLdfUrl: Joi.string()
    .uri()
    .required()
    .description(`The Wikidata LDF endpoint URL.`),
    tadirahFileUrl: Joi.string()
    .uri()
    .required()
    .description(`The TADIRAH turtle file URL on vocabs.dariah.eu.`),
  })
}