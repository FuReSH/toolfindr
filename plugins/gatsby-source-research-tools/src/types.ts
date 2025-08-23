import type { PluginOptions as GatsbyDefaultPluginOptions, IPluginRefOptions } from "gatsby"
import { NODE_TYPES } from "./constants"

/**
 * Input type for the nodeBuilder function.
 * Represents either a Tadirah concept or a research tool node.
 */
export type NodeBuilderInput =
  | { type: typeof NODE_TYPES.Concept; data: ITadirahConceptInput }
  | { type: typeof NODE_TYPES.Tool; data: IResearchToolInput }

/**
 * Represents a Tadirah concept input object.
 */
export interface ITadirahConceptInput {
  id: string
  label: string
}

/**
 * Represents a research tool input object.
 */
export interface IResearchToolInput {
  id: string
  slug: string
  concepts: string[]
  dateModified: Date
  label?: string
  description?: string
  instancesof?: string[]
  license?: string[]
  copyright?: string
  logo?: string[]
  image?: string[]
  website?: string[]
  repository?: string[]
  version?: string[]
}

/**
 * API response structure returned by the DataSourceManager.
 */
export interface IApiResponse {
  data: {
    tools: IResearchToolInput[];
    concepts: ITadirahConceptInput[];
  };
  errors?: { message: string }[];
}

interface IPluginOptionsKeys {
  wikidataSparqlUrl: string,
  wikidataLdfUrl: string,
  tadirahFileUrl: string,
}

/**
 * Gatsby expects the plugin options to be of type "PluginOptions" for gatsby-node APIs (e.g. sourceNodes)
 */
export interface IPluginOptionsInternal extends IPluginOptionsKeys, GatsbyDefaultPluginOptions {}

/**
 * These are the public TypeScript types for consumption in gatsby-config
 */
export interface IPluginOptions extends IPluginOptionsKeys, IPluginRefOptions {}