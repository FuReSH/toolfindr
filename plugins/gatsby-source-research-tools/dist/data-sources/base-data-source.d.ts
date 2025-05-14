import { GatsbyCache } from "gatsby";
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
 * @property cache - An optional Gatsby Cache object, used in cache-based sources like REST.
 * @property token - An optional authentication token, used in token-based sources like REST.
 * @property query - An optional query string, used in query-based sources like SPARQL.
 *
 * @method fetchData - Abstract method that must be implemented by subclasses.
 *   Returns a Promise that resolves to an array of type T.
 *
 * @method handleError - Centralized error handler with logging and rethrowing.
 * @method logProgress - Simple logging method for tracking progress or debugging.
 */
export declare abstract class BaseDataSource<T> {
    protected endpoint: string;
    protected cache?: GatsbyCache;
    protected token?: string;
    protected query?: string;
    constructor(endpoint: string, cache?: GatsbyCache, token?: string, query?: string);
    abstract fetchData(...args: any[]): Promise<T[]>;
    protected handleError(errorDetails: any, source: string): void;
    protected logProgress(message: string): void;
}
