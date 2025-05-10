"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataSource = void 0;
/**
 * Abstract base class for all data sources.
 *
 * This class defines a consistent interface and shared functionality
 * for fetching data from different source types (e.g., REST, SPARQL).
 *
 * It is designed to be extended by concrete implementations,
 * which must define their own `fetchData` method.
 *
 * Generic typing allows flexibility in the shape of returned data.
 *
 * @template T - The data type returned by the data source.
 *
 * @property endpoint - The source endpoint URL (e.g., API base or SPARQL endpoint).
 * @property options - Optional configuration passed to the data source.
 * @property query - An optional query string, used in query-based sources like SPARQL.
 *
 * @method fetchData - Abstract method that must be implemented by subclasses.
 *   Returns a Promise that resolves to an array of type T.
 *
 * @method handleError - Centralized error handler with logging and rethrowing.
 * @method logProgress - Simple logging method for tracking progress or debugging.
 */
class BaseDataSource {
    constructor(endpoint, options = {}) {
        this.endpoint = endpoint;
        this.options = options;
    }
    handleError(error, source) {
        const enhancedMessage = `[${source}] ${error.message}`;
        throw new Error(enhancedMessage);
    }
    logProgress(message) {
        console.log(`[BaseDataSource] ${message}`);
    }
}
exports.BaseDataSource = BaseDataSource;
