export abstract class BaseDataSource<T> {
    constructor(
        protected endpoint: string, 
        protected options: any = {}) {}
    
    abstract fetchData(): Promise<T[]>;
    
    protected handleError(error: any): void {
      console.error(`Error fetching data: ${error.message}`);
      throw error;
    }

    protected logProgress(message: string): void {
      console.log(`[BaseDataSource] ${message}`);
  }
  }