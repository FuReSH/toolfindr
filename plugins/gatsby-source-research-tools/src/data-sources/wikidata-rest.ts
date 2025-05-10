import { BaseDataSource } from './base-data-source';
import { IWikidataRest } from '../types';
import fetch, { HeadersInit } from 'node-fetch';


export class WikidataRestSource extends BaseDataSource<IWikidataRest> {
  
  private headers: HeadersInit;

  constructor(endpoint: string, options: any = {}) {
    super(endpoint, options); 
    this.endpoint = "https://www.wikidata.org/w/rest.php/wikibase/v1";
    this.headers = {
        "Content-Type": "application/json",
      } satisfies HeadersInit;
  }

  async fetchData(ids: string[]): Promise<IWikidataRest[]> {

    try {
    const results = await Promise.all(
    
      ids.map(async (id) => {
        const url = `${this.endpoint}/entities/items/${id}/labels/en`;

        const response = await fetch(url, {
            method: 'GET',
            header: this.headers,
          });

          if (!response.ok) {
            return new Error(`Fehler beim Abrufen von ID ${id}: ${response.statusText}`);
          }

          const data = await response.json();
          return data as IWikidataRest;
      })
    );
    
    return results.filter((item): item is IWikidataRest => item !== null);
} catch (error) {
    return Promise.reject(this.handleError(error, "WikidataRestSource"));
}

  }
}
