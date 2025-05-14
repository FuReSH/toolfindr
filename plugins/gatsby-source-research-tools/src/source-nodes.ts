import type { GatsbyNode, SourceNodesArgs, NodeInput } from "gatsby"
import { DataSourceManager } from "./data-source-manager"
import type { IPluginOptionsInternal, NodeBuilderInput, IResearchToolInput, ITadirahConceptInput } from "./types"
import { NODE_TYPES, ERROR_CODES } from "./constants"

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  gatsbyApi,
  pluginOptions: IPluginOptionsInternal
) => {
  const { actions, reporter, cache, getNodes } = gatsbyApi
  const { touchNode } = actions

  const sourcingTimer = reporter.activityTimer(`Sourcing from plugin research-tools`)
  sourcingTimer.start()

  interface IApiResponse {
    data: {
      tools: Array<IResearchToolInput>;
      concepts: Array<ITadirahConceptInput>;
    }
    errors?: Array<{
      message: string
    }>
  }

  const dataManager = new DataSourceManager(pluginOptions, cache);
  const { data, errors }: IApiResponse = await dataManager.fetchAllData();

  if (errors) {
    sourcingTimer.panicOnBuild({
      id: ERROR_CODES.ResearchToolsSourcing,
      context: {
        sourceMessage: `Sourcing from the APIs failed`,
        apiErrorNum: errors.length,
        apiError: errors.map(error => `- ${error}\n`).join("\n"),
      },
    })

    return
  }

  const { tools = [], concepts = [] } = data

  if ((tools.length === 0)) {
    reporter.info(`[plugin] No updated data from Wikidata. Touching existing nodes to keep them.`)

    const existingNodes = getNodes()

    for (const node of existingNodes) {
      if (node.internal.type === NODE_TYPES.Tool || node.internal.type === NODE_TYPES.Concept) {
        // Touch existing nodes to keep them in the GraphQL schema
        touchNode(node)
      }
    }

    sourcingTimer.end()

    return
  }

  const existingToolNodes = new Map<string, NodeInput>(
    getNodes()
      .filter(node => node.internal.type === NODE_TYPES.Tool)
      .map(node => [node._id as string, node as NodeInput])
  )

  for (const tool of tools) {
    nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.Tool, data: tool }, existingNodeMap: existingToolNodes, })
  }

  for (const concept of concepts) {
    nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.Concept, data: concept } })
  }

  sourcingTimer.setStatus(`[plugin] Successfully sourced ${tools.length} tools and ${concepts.length} tadirah concepts.`);

  sourcingTimer.end()
}

interface INodeBuilderArgs {
  gatsbyApi: SourceNodesArgs
  input: NodeBuilderInput
  existingNodeMap?: Map<string, NodeInput>
}

export function nodeBuilder({
  gatsbyApi,
  input,
  existingNodeMap,
}: INodeBuilderArgs) {
  const { createNodeId, createContentDigest, actions } = gatsbyApi
  const id = createNodeId(`${input.type}-${input.data.id}`)
  const contentDigest = createContentDigest(input.data)

  if (existingNodeMap) {
    const existing = existingNodeMap.get(input.data.id)
    if (existing) {
      if (existing.internal.contentDigest === contentDigest) {
        actions.touchNode(existing)
        return // Keine Änderung → Node bleibt bestehen
      }
    }
  }

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