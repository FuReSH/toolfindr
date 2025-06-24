const { QueryEngine } = require('@comunica/query-sparql');

async function queryWikidata() {
  // Erstellen einer neuen Query Engine
  const engine = new QueryEngine();

  // QLever SPARQL-Endpoint für Wikidata
  const endpoint = 'https://qlever.cs.uni-freiburg.de/api/wikidata';

  // Eine einfache SPARQL-Abfrage
  const sparqlQuery = `
    PREFIX schema: <http://schema.org/>
SELECT ?tool ?date_modified WHERE {
  ?tool ^schema:about/schema:dateModified ?date_modified .
} LIMIT 100
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
    console.log('Ergebnisse der Abfrage:');
    console.log('----------------------');

    bindings.forEach(binding => {
      const tool = binding.get('tool').value;
      const label = binding.get('label')?.value || 'Kein Label';
      const concepts = binding.get('concept')?.value;
      const license = binding.get('license')?.value || 'Keine Lizenz';
      const dateModified = binding.get('date_modified')?.value || 'Kein Datum';
      console.log(`${label} (${tool}): ${concepts} - ${dateModified}`);
    });

  } catch (error) {
    console.error('Fehler bei der Abfrage:', error);
  }
}

// Funktion ausführen
queryWikidata();