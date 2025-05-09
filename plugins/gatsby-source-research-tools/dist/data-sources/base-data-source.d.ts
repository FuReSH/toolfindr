export declare abstract class BaseDataSource<T> {
    protected endpoint: string;
    protected options: any;
    constructor(endpoint: string, options?: any);
    abstract fetchData(): Promise<T[]>;
    protected handleError(error: any): void;
    protected logProgress(message: string): void;
}
