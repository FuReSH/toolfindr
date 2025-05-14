import { BaseDataSource } from './base-data-source';
import { ITadirahConceptInput } from '../types';
export declare class TadirahSparqlSource extends BaseDataSource<ITadirahConceptInput> {
    private engine;
    constructor(endpoint: string);
    fetchData(): Promise<ITadirahConceptInput[]>;
}
