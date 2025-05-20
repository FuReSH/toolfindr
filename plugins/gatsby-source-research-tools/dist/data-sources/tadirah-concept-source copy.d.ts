import { BaseDataSource } from './base-data-source';
import { ITadirahConceptInput } from '../types';
export declare class TadirahConceptSource extends BaseDataSource<ITadirahConceptInput> {
    constructor(endpoint: string);
    fetchData(): Promise<ITadirahConceptInput[]>;
}
