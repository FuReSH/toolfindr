import { BaseDataSource } from './base-data-source';
import { IWikidataRest } from '../types';
import fetch, { HeadersInit } from 'node-fetch';
import { GatsbyCache } from 'gatsby';


export class WikidataRestSource extends BaseDataSource<IWikidataRest> {

  private headers: HeadersInit;

  constructor(endpoint: string, options: any = {}, cache: GatsbyCache) {
    super(endpoint, options);
    this.endpoint = "https://www.wikidata.org/w/rest.php/wikibase/v1";
    this.cache = cache;
    this.headers = {
      "Content-Type": "application/json",
      "Api-User-Agent": "Example/1.0"
    } satisfies HeadersInit;
  }

  async fetchData(ids: string[]): Promise<IWikidataRest[]> {

    const results: IWikidataRest[] = [];

    // Sleep-Funktion für die Pause
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      for (const id of ids) {
        const url = `${this.endpoint}/entities/items/${id.split("/").pop()}`;

        const cacheKey = `wikidata-last-modified-${id}`;
        const lastModified: Date = await this.cache.get(cacheKey);

        const headers = { ...this.headers };

        if (lastModified) {
          headers["If-Modified-Since"] = lastModified;
        }

        const response = await this.httpRequest(url, "HEAD", headers);

        if (response.status === 304) {
          continue; // No new data, skip to the next ID
        }

        if (!response.ok) {
          let errorDetails = await response.json();
          this.handleError(errorDetails, "WikidataRestSource");
        }

        if (response.status === 200) {

          const response = await this.httpRequest(url, "GET", headers);

          const data = await response.json();

          const newLastModified = response.headers.get("last-modified");
          if (newLastModified) {
            await this.cache.set(cacheKey, newLastModified);
          }

          results.push({
            id: data.id,
            label: data.labels.en ? data.labels.en : data.id,
            description: data.descriptions.en ? data.descriptions.en : "No description available",
          });

        }

        await sleep(3000);
      }

      return results;
    } catch (error) {
      return Promise.reject(this.handleError(error, "WikidataRestSource"));
    }
  }

  private async httpRequest(url: string, method: string, headers: Object): Promise<Response> {
    const response = await fetch(url, {
          method: method,
          headers: headers,
        });
    return response;
  }
}
