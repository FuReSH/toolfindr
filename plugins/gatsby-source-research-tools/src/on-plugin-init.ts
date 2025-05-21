import type { GatsbyNode } from "gatsby"
import { ERROR_CODES } from "./constants"

/**
 * Gatsby Node API: onPluginInit
 * 
 * Registers custom error mappings for the plugin using Gatsby's reporter.
 * This allows the plugin to provide more descriptive and categorized error messages
 * during the sourcing process, especially for errors related to research tool sourcing.
 * 
 * @param param0 - Gatsby Node API context, including the reporter instance.
 * 
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onPluginInit
 */
export const onPluginInit: GatsbyNode[`onPluginInit`] = ({ reporter }) => {
  reporter.setErrorMap({
    [ERROR_CODES.ResearchToolsSourcing]: {
      text: (context) => `${context.sourceMessage} with ${context.apiErrorNum} Error(s):\n ${context.apiError}`,
      level: `ERROR`,
      category: `THIRD_PARTY`,
    },
  })
}