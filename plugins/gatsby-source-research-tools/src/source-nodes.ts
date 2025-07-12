import type { GatsbyNode, SourceNodesArgs, NodeInput } from "gatsby"
import { DataSourceManager } from "./data-source-manager"
import type { IPluginOptionsInternal, NodeBuilderInput, IApiResponse } from "./types"
import { NODE_TYPES, ERROR_CODES, CACHE_KEYS } from "./constants"

let isFirstSource = true

/**
 * Gatsby Node API: sourceNodes
 * 
 * Orchestrates the sourcing of research tool and Tadirah concept data into Gatsby's data layer.
 * This function manages incremental sourcing, error handling, and node creation for the plugin.
 * 
 * - Touches existing nodes on the first run to prevent garbage collection.
 * - Fetches data using the DataSourceManager, handling incremental updates based on the last fetch timestamp.
 * - Handles and reports errors using Gatsby's reporter.
 * - Creates Gatsby nodes for each research tool and Tadirah concept.
 * 
 * @param gatsbyApi - Gatsby Node API context, including actions, reporter, cache, and node helpers.
 * @param pluginOptions - Internal plugin options for data source configuration.
 * 
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes
 */
export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  gatsbyApi,
  pluginOptions: IPluginOptionsInternal
) => {
  const { actions, reporter, cache, getNodes } = gatsbyApi
  const { touchNode } = actions

  const sourcingTimer = reporter.activityTimer(`Sourcing from plugin research-tools`)
  sourcingTimer.start()

  if (isFirstSource) {
    getNodes().forEach((node) => {
      if (node.internal.owner !== `plugin` && node.internal.type !== NODE_TYPES.Tool) {
        return
      }
      touchNode(node)
    })

    isFirstSource = false
  }

  const lastFetchedDate: number = await cache.get(CACHE_KEYS.Timestamp)
  const lastFetchedDateCurrent = Date.now()

  reporter.info(`[plugin] Last fetched date: ${lastFetchedDate ? new Date(lastFetchedDate) : "None. First sourcing 🚀"}`)

  const dataManager = new DataSourceManager(pluginOptions, lastFetchedDate ? new Date(lastFetchedDate) : undefined);
  const { data, errors }: IApiResponse = await dataManager.fetchAllData();

  if (errors) {
    sourcingTimer.panicOnBuild({
      id: ERROR_CODES.ResearchToolsSourcing,
      context: {
        sourceMessage: `Sourcing from the APIs failed`,
        apiErrorNum: errors.length,
        apiError: errors.map(error => `- ${error.message}\n`).join("\n"),
      },
    })

    return
  }

  await cache.set(CACHE_KEYS.Timestamp, lastFetchedDateCurrent)

  const { tools = [], concepts = [] } = data

   
  if ((tools.length === 0)) {
    reporter.info(`[plugin] You are up to date! 🏆`)
  }

  if (tools.length > 0 && lastFetchedDate) {
    reporter.info(`[plugin] There is new data on Wikidata! 👀`);
    reporter.info(`[plugin] Incremental sourcing...`);
    reporter.info(`[plugin] Updated and new tools:\n${tools.map(tool => `🔸 ${tool.label} (${tool.id})\n`).join("")}`); 
  }

  for (const tool of tools) {
    nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.Tool, data: tool } })
  }

  for (const concept of concepts) {
    nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.Concept, data: concept } })
  }

  sourcingTimer.setStatus(`[plugin] Successfully sourced ${tools.length} tools and ${concepts.length} tadirah concepts. 🙌`);

  sourcingTimer.end()
}

interface INodeBuilderArgs {
  gatsbyApi: SourceNodesArgs
  input: NodeBuilderInput
}

/**
 * Builds and creates a Gatsby node from the provided input.
 * 
 * @param gatsbyApi - Gatsby SourceNodesArgs context, providing node helpers.
 * @param input - NodeBuilderInput containing the node type and data.
 */
export function nodeBuilder({
  gatsbyApi,
  input
}: INodeBuilderArgs) {
  const { createNodeId, createContentDigest, actions } = gatsbyApi
  const id = createNodeId(`${input.type}-${input.data.id}`)
  const contentDigest = createContentDigest(input.data)

  const node: NodeInput = {
    ...input.data,
    id,
    _id: input.data.id,
    parent: null,
    children: [],
    internal: {
      type: input.type,
      contentDigest,
    },
  }

  actions.createNode(node)
}