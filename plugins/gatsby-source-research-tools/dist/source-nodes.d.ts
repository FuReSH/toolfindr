import type { GatsbyNode, SourceNodesArgs, NodeInput } from "gatsby";
import type { NodeBuilderInput } from "./types";
export declare const sourceNodes: GatsbyNode["sourceNodes"];
interface INodeBuilderArgs {
    gatsbyApi: SourceNodesArgs;
    input: NodeBuilderInput;
    existingNodeMap?: Map<string, NodeInput>;
}
export declare function nodeBuilder({ gatsbyApi, input, existingNodeMap, }: INodeBuilderArgs): void;
export {};
