/**
 * Node types used for Gatsby nodes.
 * 
 * @property Concept - Node type for Tadirah concepts.
 * @property Tool - Node type for research tools.
 */
export const NODE_TYPES = {
    Concept: `TadirahConcept`,
    Tool: `ResearchTool`,
} as const

/**
 * Error codes used throughout the data sourcing process.
 * 
 * @property ResearchToolsSourcing - Error code for research tools sourcing errors.
 */
export const ERROR_CODES = {
    ResearchToolsSourcing: `10000`,
} as const

/**
 * Cache keys used for storing and retrieving cached data.
 * 
 * @property Timestamp - Cache key for the last fetched date of research tools.
 */
export const CACHE_KEYS = {
    Timestamp: `research-tools-last-fetched-date`,
  } as const