"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceNodes = void 0;
exports.nodeBuilder = nodeBuilder;
const data_source_manager_1 = require("./data-source-manager");
const constants_1 = require("./constants");
const sourceNodes = (gatsbyApi, pluginOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { actions, reporter, cache, getNodes } = gatsbyApi;
    const { touchNode } = actions;
    const sourcingTimer = reporter.activityTimer(`Sourcing from plugin research-tools`);
    sourcingTimer.start();
    const dataManager = new data_source_manager_1.DataSourceManager(pluginOptions, cache);
    const { data, errors } = yield dataManager.fetchAllData();
    if (errors) {
        sourcingTimer.panicOnBuild({
            id: constants_1.ERROR_CODES.ResearchToolsSourcing,
            context: {
                sourceMessage: `Sourcing from the APIs failed`,
                apiErrorNum: errors.length,
                apiError: errors.map(error => `- ${error}\n`).join("\n"),
            },
        });
        return;
    }
    const { tools = [], concepts = [] } = data;
    if ((tools.length === 0)) {
        reporter.info(`[plugin] No updated data from Wikidata. Touching existing nodes to keep them.`);
        const existingNodes = getNodes();
        for (const node of existingNodes) {
            if (node.internal.type === constants_1.NODE_TYPES.Tool || node.internal.type === constants_1.NODE_TYPES.Concept) {
                // Touch existing nodes to keep them in the GraphQL schema
                touchNode(node);
            }
        }
        sourcingTimer.end();
        return;
    }
    const existingToolNodes = new Map(getNodes()
        .filter(node => node.internal.type === constants_1.NODE_TYPES.Tool)
        .map(node => [node._id, node]));
    for (const tool of tools) {
        nodeBuilder({ gatsbyApi, input: { type: constants_1.NODE_TYPES.Tool, data: tool }, existingNodeMap: existingToolNodes, });
    }
    for (const concept of concepts) {
        nodeBuilder({ gatsbyApi, input: { type: constants_1.NODE_TYPES.Concept, data: concept } });
    }
    sourcingTimer.setStatus(`[plugin] Successfully sourced ${tools.length} tools and ${concepts.length} tadirah concepts.`);
    sourcingTimer.end();
});
exports.sourceNodes = sourceNodes;
function nodeBuilder({ gatsbyApi, input, existingNodeMap, }) {
    const { createNodeId, createContentDigest, actions } = gatsbyApi;
    const id = createNodeId(`${input.type}-${input.data.id}`);
    const contentDigest = createContentDigest(input.data);
    if (existingNodeMap) {
        const existing = existingNodeMap.get(input.data.id);
        if (existing) {
            if (existing.internal.contentDigest === contentDigest) {
                actions.touchNode(existing);
                return; // Keine Änderung → Node bleibt bestehen
            }
        }
    }
    const node = Object.assign(Object.assign({}, input.data), { id, _id: input.data.id, parent: null, children: [], internal: {
            type: input.type,
            contentDigest,
        } });
    actions.createNode(node);
}
