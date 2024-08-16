/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

import SparqlHttpClient from 'sparql-http-client'
import crypto from 'crypto'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'


export const sourceNodes = async ({ actions, createNodeId, reporter }) => {
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

   SELECT ?toolID ?toolLabel ?toolDesc (GROUP_CONCAT(DISTINCT ?image; separator = ", ") AS ?images) ?copyrightLabel ?licenseLabel (GROUP_CONCAT(DISTINCT ?sourceRepo; separator = ", ") AS ?sourceRepos) (GROUP_CONCAT(DISTINCT ?website; separator = ", ") AS ?websites) (GROUP_CONCAT(DISTINCT ?instanceOfLabel; separator = ", ") AS ?instanceOfLabels) (GROUP_CONCAT(DISTINCT ?tadirahID; separator = ", ") AS ?tadirahIDs) WHERE {
 ?method wdt:P9309 ?tadirahID.
  # select all items which are linked to these methods through has use
  ?tool wdt:P366 ?method;
    # limit tools to software in the broadest sense
    wdt:P31/wdt:P279* wd:Q7397.
  # retrieve properties that are part of our data model
  ?tool wdt:P31 ?instanceOf.
  OPTIONAL { ?tool  wdt:P6216 ?copyright;
    wdt:P275 ?license;
    wdt:P1324 ?sourceRepo;
    wdt:P856 ?website .}
  # retrieve the logos and images for those tools that have them
  OPTIONAL { ?tool wdt:P154 ?logo. }
  OPTIONAL { ?tool wdt:P18 ?pic. }
  BIND(COALESCE(?logo, ?pic) AS ?image).
  BIND(STR(?tool) AS ?toolID)
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en".
    ?tool rdfs:label ?toolLabel;
      schema:description ?toolDesc.
    ?instanceOf rdfs:label ?instanceOfLabel.
          ?copyright rdfs:label ?copyrightLabel.
          ?license rdfs:label ?licenseLabel.
  }
}
GROUP BY ?toolID ?toolLabel ?toolDesc ?copyrightLabel ?licenseLabel
ORDER BY ?toolLabel
LIMIT 5000
  `;


  try {
    const existingNodeIds = new Set();
    const stream = await client.query.select(query);

    stream.on('data', row => {
      console.log('Received row:', row);
      console.log('🔧 Tool ID:', row.toolID ? row.toolID.value : 'No ID');
    
    
      const nodeData = {
        toolID: row.toolID ? row.toolID.value : null,
        toolLabel: row.toolLabel ? row.toolLabel.value : null,
        tadirahID: row.tadirahIDs ? row.tadirahIDs.value : null,
        toolDesc: row.toolDesc ? row.toolDesc.value : null,
        image: row.image && row.image.value ? row.image.value : null,
        copyright: row.copyrightLabel ? row.copyrightLabel.value : null,
        license: row.licenseLabel ? row.licenseLabel.value : null,
        sourceRepo: row.sourceRepo ? row.sourceRepo.value : null,
        website: row.website ? row.website.value : null,
        instanceOf: row.instanceOfLabels ? row.instanceOfLabels.value : null
    };

    console.log('Processing node:', nodeData);

    // build graphql node
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
  
      try {
        createNode(node).then(() => {
          console.log(`🪢 Node created with ID ${nodeId}`);
        }).catch(error => {
          console.error('Failed to create node:', error);
        });
      } catch (error) {
        console.error('Error creating node:', error);
      }
      
  });
  
  stream.on('end', () => {
      console.log('🎉 Finished processing SPARQL data.');
  });

  await new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
  
  } catch (error) {
    reporter.panic('Error fetching SPARQL data:', error);
  }
};

// Add custom webpack config for webpack 5
export const onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      new NodePolyfillPlugin(),
    ],
  })
}