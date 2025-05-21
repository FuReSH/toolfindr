import type { GatsbyNode } from "gatsby"
import { NODE_TYPES } from "./constants"

/**
 * Gatsby Node API: createSchemaCustomization
 * 
 * @remarks Defines custom GraphQL types for research tools and Tadirah concepts.
 * 
 * - The ResearchTool type implements the Node interface and includes fields for
 *   identifiers, labels, descriptions, related concepts, and various metadata such as
 *   license, copyright, website, repository, images, logos, and version.
 *   The `concepts` field links to TadirahConcept nodes by their `_id`.
 * 
 * - The TadirahConcept type implements the Node interface and includes fields for
 *   identifiers and the English label.
 * 
 * This schema customization ensures that Gatsby's GraphQL layer is aware of the
 * structure and relationships of the sourced data.
 * 
 * @param actions - Gatsby actions, specifically `createTypes` for defining types.
 * 
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization
 */
export const createSchemaCustomization: GatsbyNode[`createSchemaCustomization`] =
  ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type ${NODE_TYPES.Tool} implements Node {
          id: ID!
          _id: String!
          slug: String!
          concepts: [${NODE_TYPES.Concept}!]! @link(by: "_id")
          label: String!
          description: String
          instancesof: [String]!
          license: [String]
          copyright: String
          website: [String]
          repository: [String]
          image: [String]
          logo: [String]
          version: [String]
        }
  
        type ${NODE_TYPES.Concept} implements Node {
          id: ID!
          _id: String!
          label: String!
        }

      `)
  }