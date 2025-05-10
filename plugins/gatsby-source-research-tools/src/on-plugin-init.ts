import type { GatsbyNode } from "gatsby"
import { ERROR_CODES } from "./constants"


export const onPluginInit: GatsbyNode[`onPluginInit`] = ({ reporter }) => {
  reporter.setErrorMap({
    [ERROR_CODES.ResearchToolsSourcing]: {
      text: (context) => `${context.sourceMessage} with ${context.apiErrorNum} Error(s):\n ${context.apiError}`,
      level: `ERROR`,
      category: `THIRD_PARTY`,
    },
  })
}