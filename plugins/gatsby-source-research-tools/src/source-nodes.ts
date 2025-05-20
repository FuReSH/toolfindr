import type { GatsbyNode, SourceNodesArgs, NodeInput } from "gatsby"
import { DataSourceManager } from "./data-source-manager"
import type { IPluginOptionsInternal, NodeBuilderInput, IApiResponse } from "./types"
import { NODE_TYPES, ERROR_CODES, CACHE_KEYS } from "./constants"

let isFirstSource = true

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
    reporter.info(`[plugin] No updated data from Wikidata for research tools since the last fetch 🏆`)
  }

  for (const tool of tools) {
    nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.Tool, data: tool } })
  }

  for (const concept of concepts) {
    nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.Concept, data: concept } })
  }

  sourcingTimer.setStatus(`[plugin] Successfully sourced ${tools.length} tools and ${concepts.length} tadirah concepts 🙌`);

  sourcingTimer.end()
}

interface INodeBuilderArgs {
  gatsbyApi: SourceNodesArgs
  input: NodeBuilderInput
}

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