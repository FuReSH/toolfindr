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
let isFirstSource = true;
const sourceNodes = (gatsbyApi, pluginOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { actions, reporter, cache, getNodes } = gatsbyApi;
    const { touchNode } = actions;
    const sourcingTimer = reporter.activityTimer(`Sourcing from plugin research-tools`);
    sourcingTimer.start();
    if (isFirstSource) {
        getNodes().forEach((node) => {
            if (node.internal.owner !== `plugin` && node.internal.type !== constants_1.NODE_TYPES.Tool) {
                return;
            }
            touchNode(node);
        });
        isFirstSource = false;
    }
    const lastFetchedDate = yield cache.get(constants_1.CACHE_KEYS.Timestamp);
    const lastFetchedDateCurrent = Date.now();
    reporter.info(`[plugin] Last fetched date: ${lastFetchedDate ? new Date(lastFetchedDate) : "None. First sourcing 🚀"}`);
    const dataManager = new data_source_manager_1.DataSourceManager(pluginOptions, lastFetchedDate ? new Date(lastFetchedDate) : undefined);
    const { data, errors } = yield dataManager.fetchAllData();
    if (errors) {
        sourcingTimer.panicOnBuild({
            id: constants_1.ERROR_CODES.ResearchToolsSourcing,
            context: {
                sourceMessage: `Sourcing from the APIs failed`,
                apiErrorNum: errors.length,
                apiError: errors.map(error => `- ${error.message}\n`).join("\n"),
            },
        });
        return;
    }
    yield cache.set(constants_1.CACHE_KEYS.Timestamp, lastFetchedDateCurrent);
    const { tools = [], concepts = [] } = data;
    if ((tools.length === 0)) {
        reporter.info(`[plugin] No updated data from Wikidata for research tools since the last fetch 🏆`);
    }
    for (const tool of tools) {
        nodeBuilder({ gatsbyApi, input: { type: constants_1.NODE_TYPES.Tool, data: tool } });
    }
    for (const concept of concepts) {
        nodeBuilder({ gatsbyApi, input: { type: constants_1.NODE_TYPES.Concept, data: concept } });
    }
    sourcingTimer.setStatus(`[plugin] Successfully sourced ${tools.length} tools and ${concepts.length} tadirah concepts 🙌`);
    sourcingTimer.end();
});
exports.sourceNodes = sourceNodes;
function nodeBuilder({ gatsbyApi, input }) {
    const { createNodeId, createContentDigest, actions } = gatsbyApi;
    const id = createNodeId(`${input.type}-${input.data.id}`);
    const contentDigest = createContentDigest(input.data);
    const node = Object.assign(Object.assign({}, input.data), { id, _id: input.data.id, parent: null, children: [], internal: {
            type: input.type,
            contentDigest,
        } });
    actions.createNode(node);
}
