import type { GatsbyNode } from "gatsby"
import type { ObjectSchema } from "gatsby-plugin-utils"

/**
 * Defines the plugin options schema for the Gatsby source plugin.
 * 
 * This function uses Joi to validate and describe the required options for the plugin,
 * including the Wikidata SPARQL endpoint URL, Wikidata LDF endpoint URL, and the TADIRAH file URL.
 * 
 * @param param0 - Gatsby Node API context, providing Joi for schema definition.
 * @returns The Joi object schema for plugin options.
 * 
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#pluginOptionsSchema
 */
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