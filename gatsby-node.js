/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const SparqlHttpClient = require('sparql-http-client');
const crypto = require('crypto');

exports.sourceNodes = async ({ actions, createNodeId, reporter }) => {
  const { createNode } = actions;

  const endpointUrl = 'https://query.wikidata.org/sparql';
  const client = new SparqlHttpClient({ endpointUrl });
  
  const query = `
  PREFIX wd: <http://www.wikidata.org/entity/>
  PREFIX wdt: <http://www.wikidata.org/prop/direct/>
  PREFIX p: <http://www.wikidata.org/prop/>
  PREFIX ps: <http://www.wikidata.org/prop/statement/>
  PREFIX bd: <http://www.bigdata.com/rdf#>
  PREFIX wikibase: <http://wikiba.se/ontology#>

  SELECT DISTINCT ?toolID ?toolLabel ?tadirahID WHERE {
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    ?method p:P9309 ?statement0.
    ?statement0 ps:P9309 ?tadirahID.
    ?tool wdt:P366 ?method;
          wdt:P31/wdt:P279* wd:Q7397.  
    BIND(STR(?tool) AS ?toolID)  # Bind the URI of the tool as its ID
  }
  `;

  try {
    const stream = await client.query.select(query);
    
    stream.on('data', row => {
      const nodeData = {
          toolID: row.toolID.value,
          toolLabel: row.toolLabel.value,
          tadirahID: row.tadirahID.value,
      };
  
      const nodeId = createNodeId(`sparql-tool-${nodeData.toolID}`);
      const nodeContentDigest = crypto
          .createHash('md5')
          .update(JSON.stringify(nodeData))
          .digest('hex');
  
      const node = {
          ...nodeData,
          id: nodeId,
          parent: null,
          children: [],
          internal: {
              type: 'SparqlTool',
              contentDigest: nodeContentDigest,
          },
      };
  
      createNode(node);
  });
  
  stream.on('end', () => {
      console.log('Finished processing SPARQL data.');
  });

  await new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
  
  } catch (error) {
    reporter.panic('Error fetching SPARQL data:', error);
  }
};
