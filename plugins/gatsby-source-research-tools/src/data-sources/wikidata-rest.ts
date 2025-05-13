import { BaseDataSource } from './base-data-source';
import { IWikidataRest } from '../types';
import fetch, { HeadersInit } from 'node-fetch';
import pLimit from 'p-limit';
import { GatsbyCache } from 'gatsby';


export class WikidataRestSource extends BaseDataSource<IWikidataRest> {

  private headers: HeadersInit;

  constructor(endpoint: string, options: any = {}, cache: GatsbyCache) {
    super(endpoint, options);
    this.endpoint = "https://www.wikidata.org/w/rest.php/wikibase/v1";
    this.cache = cache;
    this.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxOTlhM2EwZDI1MDZjMTAwMWM1NjA1Njk4ZjEwYTJjYiIsImp0aSI6IjhmZGVjNjk2OTc0YWJhMzkxZTc4MDAyN2UzOWVjMGYxYjE5MDUzNzljZGZlMjE4YTVkOTUxMjk1ZDk1OWVlOTZjZDBkNzM2ZWRmMGNmNDhiIiwiaWF0IjoxNzQ0MjE5MTM4LjczNDY4OCwibmJmIjoxNzQ0MjE5MTM4LjczNDY5LCJleHAiOjMzMzAxMTI3OTM4LjcyNjcwNywic3ViIjoiNTk0NTA3MjIiLCJpc3MiOiJodHRwczovL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.ej5wBkFb49wiTPK2wYkmMH0gwUcTqwB7_0ZzKyv-bYu7LsAkna7gH_ZCt7hoag-tCm2X1_10AZirFN8Ux6zHLSrzFmXZQLMm_TdDBH4iaO4ZRvJ7CtubKVa6n2ambkNLxN0B7fBMF7PH8ynjNEEFZMi_UcfrxRSdj2XVtBQWWBSEG7o4nBXqJ9AjjfD6zXd0sZkaVFQ4-DVTeB80YcRzZ2dryAlg0uqsundzsZAVwsgQlcZk4stoV7KwiuBX14Kah8wnRY6p-JH1J1-Jy970IrRrhNNA0wzQmG3tZ905qO5h92Z3YQqH-2uLs1NK1jkptzOm_rVZ0zcpUOaXZTM4uREMLDfY6goVuo7-A8iq7YCzffynKVpacN0ikz0d_fEiFlzYGP__QIKJzRZudXYR7XNKjJBl1HkcSV7o3dBCuptuE6Q_fD2TFzh9D7JDY_zLLJikL_ZFaBmmLLzv_jlSRMy8z0GmmDeGyahuoR8QlWYUbHdBbGAvxiEoIwIyHa6GUx333YTeLUapI8OAzEg4xFVfMkQ-aJTeItxLdnLPX_q56I4zsBV63klfF6dNTriiAU4k62TG0LmGgBnQKy4Wj_wTvt8yXs6swHoITdL0uk468HJq-j5-BoG60jxQmSTPLDvgZ9b7Cxqj0c_JGYr5N3v3Zv0VhbDk-8eyGCAQma0`,
      //"Api-User-Agent": "Example/1.0"
    } satisfies HeadersInit;
  }

  async fetchData(ids: string[]): Promise<IWikidataRest[]> {

    const results: IWikidataRest[] = [];

    // Sleep-Funktion für die Pause
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
  }

  private async httpRequest(url: string, method: string, headers: Object): Promise<Response> {
    const response = await fetch(url, {
          method: method,
          headers: headers,
        });
    return response;
  }
}
