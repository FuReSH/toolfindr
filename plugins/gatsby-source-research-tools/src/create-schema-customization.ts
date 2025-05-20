import type { GatsbyNode } from "gatsby"
import { NODE_TYPES } from "./constants"

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