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
 * @property options - Optional configuration passed to the data source.
 * @property endpoint - The endpoint URL for the data source.
 * @property engine - The query engine used for SPARQL queries.
 * @property query - The SPARQL query string to be executed.
 *
 * @method fetchData - Abstract method that must be implemented by subclasses.
 *   Returns a Promise that resolves to an array of type T.
 *
 * @method handleError - Centralized error handler with logging and rethrowing.
 * @method logProgress - Simple logging method for tracking progress or debugging.
 */
class BaseDataSource {
    constructor(endpoint, engine, query) {
        this.endpoint = endpoint;
        this.engine = engine;
        this.query = query;
    }
    handleError(errorDetails, source) {
        const error = `[${source}] ${errorDetails}`;
        throw new Error(error);
    }
    logProgress(message) {
        console.log(`[BaseDataSource] ${message}`);
    }
}
exports.BaseDataSource = BaseDataSource;
