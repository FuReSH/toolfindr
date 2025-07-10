// run the script with `node test-query-wikidata.js`
// Make sure you have installed the required packages:
// npm install @comunica/query-sparql

const { QueryEngine } = require('@comunica/query-sparql');

async function queryWikidata() {
  // Erstellen einer neuen Query Engine
  const engine = new QueryEngine();

  // QLever SPARQL-Endpoint für Wikidata
  const endpoint = 'https://query.wikidata.org/sparql' //'https://qlever.cs.uni-freiburg.de/api/wikidata';
  const lastFetchedDate = new Date("2025-06-28T00:00:00"); // Example date for filtering, adjust as needed
  console.log(lastFetchedDate);

  // Eine einfache SPARQL-Abfrage
  const sparqlQuery = `
    PREFIX schema: <http://schema.org/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    SELECT (COUNT(DISTINCT ?tool) AS ?toolsCount) WHERE {
      ?concept wdt:P9309 ?tadirahId .
      ?tool wdt:P366 ?concept ;
            wdt:P31/wdt:P279* wd:Q7397 .
      ${lastFetchedDate ? `
        #?tool ^schema:about/schema:dateModified ?date_modified .
        ?tool schema:dateModified ?date_modified .
        FILTER (?date_modified >= "${lastFetchedDate.toISOString()}"^^xsd:dateTime)
      ` : ''}
    } 
    LIMIT 5000
    `;

  try {
    // Abfrage ausführen
    const result = await engine.queryBindings(sparqlQuery, {
      sources: [{
        type: 'sparql',
        value: endpoint,
      }],

    });

    // Ergebnisse verarbeiten und sammeln
    const bindings = await result.toArray();

    // Ausgabe der Ergebnisse
    console.log('Query results:');
    console.log('----------------------');

    bindings.forEach(binding => {
      /*const tool = binding.get('tool').value;
      const concepts = binding.get('concept')?.value;
      const dateModified = binding.get('date_modified')?.value || 'Kein Datum';
      console.log(`(${tool}): ${dateModified}`);*/
      const toolsCount = binding.get('toolsCount').value;
      console.log(`Total of tools: ${toolsCount}`);
    });

  } catch (error) {
    console.error('Error during query:', error);
  }
}

// Funktion ausführen
queryWikidata();