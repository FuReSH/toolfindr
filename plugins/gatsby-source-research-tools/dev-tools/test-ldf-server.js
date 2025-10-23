// run with `node test-ldf-server.js`
// npm install @comunica/query-sparql

const { QueryEngine } = require('@comunica/query-sparql');

async function queryWikidata() {
  const engine = new QueryEngine();

  // LDF-Endpunkt
  const endpoint = 'https://query.wikidata.org/bigdata/ldf';

  const sparqlQuery = `
    SELECT ?label WHERE {
    <http://www.wikidata.org/entity/Q83> rdfs:label ?label
    }
  `;

  console.log("Running query:");
  console.log(sparqlQuery);

  try {
    const result = await engine.queryBindings(sparqlQuery, {
      sources: [{
        value: endpoint,
      }],
    });

    const bindings = await result.toArray();

    console.log('Query results:');
    console.log('----------------------');

    bindings.forEach(binding => {
        const label = binding.get('label');
        if (label.language === 'en') {
            console.log(label.value);
        }
    });

  } catch (error) {
    console.error('Error during query:', error);
  }
}

queryWikidata();
