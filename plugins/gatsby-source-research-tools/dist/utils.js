/*import { QueryEngine } from '@comunica/query-sparql'


export async function fetchSPARQL<T>(endpoint: string, query: string): Promise<T> {
    
    const sourceEngine = new QueryEngine()
    
    const bindingsStream = await sourceEngine.queryBindings(query, {
        sources: [endpoint],
        httpRetryOnServerError: true,
        httpRetryCount: 3,
        httpRetryDelay: 100,
        noCache: false,
      })

    /*const { data } = for await (const row of bindingsStream) {
        data.push({
          tadirahID: row.get('tadirahID')?.value,
          tadirahLabel: row.get('tadirahLabel')?.value,
        });
    }

    return data[0]
  }*/ 
