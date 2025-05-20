export const NODE_TYPES = {
    Concept: `TadirahConcept`,
    Tool: `ResearchTool`,
} as const

export const ERROR_CODES = {
    ResearchToolsSourcing: `10000`,
} as const

export const CACHE_KEYS = {
    Timestamp: `research-tools-last-fetched-date`,
  } as const