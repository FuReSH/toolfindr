import type { GatsbyNode, SourceNodesArgs, NodeInput } from "gatsby"
import { DataSourceManager } from "./data-source-manager"
import type { IPluginOptionsInternal, NodeBuilderInput, IResearchToolInput, ITadirahConceptInput } from "./types"
import { NODE_TYPES, ERROR_CODES } from "./constants"

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  gatsbyApi,
  pluginOptions: IPluginOptionsInternal
) => {
  const { actions, reporter, cache, getNodes } = gatsbyApi
  //const { touchNode } = actions
  const { endpoint } = pluginOptions

  const sourcingTimer = reporter.activityTimer(`Sourcing from plugin research-tools`)
  sourcingTimer.start()

  interface IApiResponse{
    data: {
      tools: Array<IResearchToolInput>;
      concepts: Array<ITadirahConceptInput>;
    }
    errors?: Array<{
        message: string
    }>
}


  const dataManager = new DataSourceManager(pluginOptions);
  const {data, errors}: IApiResponse = await dataManager.fetchAllData();

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
  
const { tools = [], concepts = [] } = data

  for (const tool of tools) {
    nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.Tool, data: tool } })
  }

  for (const concept of concepts) {
    nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.Concept, data: concept } })
  }

  sourcingTimer.setStatus(`[plugin] Successfully sourced ${tools.length} tools and ${concepts.length} tadirah concepts.`);

  sourcingTimer.end()}

interface INodeBuilderArgs {
  gatsbyApi: SourceNodesArgs
  input: NodeBuilderInput
}

export function nodeBuilder({ gatsbyApi, input }: INodeBuilderArgs) {
  const id = gatsbyApi.createNodeId(`${input.type}-${input.data.id}`)

  const node = {
    ...input.data,
    id,
    _id: input.data.id,
    parent: null,
    children: [],
    internal: {
      type: input.type,
      contentDigest: gatsbyApi.createContentDigest(input.data),
    },
  } satisfies NodeInput

  gatsbyApi.actions.createNode(node)
}