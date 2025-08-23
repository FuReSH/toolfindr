import { QueryEngine } from '@comunica/query-sparql';

/**
 * Abstract base class for data sources fetching data from a SPARQL endpoint.
 * 
 * This class provides core functionality for specialized data sources,
 * such as error handling and progress logging. Subclasses are expected
 * to implement the {@link fetchData} method.
 * 
 * @typeParam T - The type of data objects returned by the data source.
 */
export abstract class BaseDataSource<T> {  

    /**
     * Constructs a new BaseDataSource instance.
     * 
     * @param endpoint - The SPARQL endpoint URL.
     * @param engine - Optional: An instance of Comunica QueryEngine.
     * @param query - Optional: A SPARQL query string.
     */
    constructor( 
        protected endpoint: string,
        protected engine?: QueryEngine,
        protected query?: string
      ) {}
    
    /**
     * Abstract method for fetching data from the data source.
     * Must be implemented by subclasses.
     * 
     * @param args - Optional arguments for the implementation.
     * @returns A promise resolving to an array of objects of type T.
     */
    abstract fetchData(...args: any[]): Promise<T[]>;
    
    /**
     * Handles errors by throwing a formatted error message.
     * 
     * @param errorDetails - Details about the error.
     * @param source - The name of the error source (e.g., class name).
     * @throws Always throws a new Error instance with formatted message.
     */
    protected handleError(errorDetails: any, source: string): void {
      const error = `[${source}] ${errorDetails}`;
      throw new Error(error);
    }

    /**
     * Logs a progress message to the console.
     * 
     * @param message - The message to log.
     */
    protected logProgress(message: string): void {
      console.log(`[plugin] ${message}`);
  }
}