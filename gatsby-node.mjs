/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

import crypto from 'crypto'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import { QueryEngine } from '@comunica/query-sparql' 
import {LoggerPretty} from "@comunica/logger-pretty"
import fs from 'node:fs/promises';
import * as path from 'path';


export const sourceNodes = async ({ actions, createNodeId, reporter }) => {
  const { createNode } = actions;

  const endpointUrls = [
    'https://query.wikidata.org/sparql',
    'https://vocabs-downloads.acdh.oeaw.ac.at/vocabs-main/Humanities/TaDiRAH/tadirah.ttl'
   ];
  const toolsEngine = new QueryEngine();
  
  try {
    // Read the query from the file asynchronously
    const query = await fs.readFile('./data/federated-sparql.rq', 'utf8');
    console.log('%c Query:\n', 'color:green;', query);
    console.log('🔍 Fetching SPARQL data...');

    // Execute the SPARQL query
    const bindingsStream = await toolsEngine.queryBindings(query, {
      sources: endpointUrls,
      log: new LoggerPretty({ level: 'debug' }),
    });

    // Use for-await to iterate over the stream asynchronously
    for await (const row of bindingsStream) {
      const nodeData = {
        toolID: row.get('toolID') ? row.get('toolID').value : null,
        toolLabel: row.get('toolLabel') ? row.get('toolLabel').value : null,
        tadirahID: row.get('tadirahIDs') ? row.get('tadirahIDs').value : null,
        tadirahLabel: row.get('tadirahLabels') ? row.get('tadirahLabels').value : null,
        toolDesc: row.get('toolDesc') ? row.get('toolDesc').value : null,
        image: row.get('image') ? row.get('image').value : null,
        copyright: row.get('copyrightLabel') ? row.get('copyrightLabel').value : null,
        license: row.get('licenseLabel') ? row.get('licenseLabel').value : null,
        sourceRepo: row.get('sourceRepo') ? row.get('sourceRepo').value : null,
        website: row.get('website') ? row.get('website').value : null,
        instanceOf: row.get('instanceOfLabels') ? row.get('instanceOfLabels').value : null
      };

      // Create a node ID and contentDigest
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

      // Await the creation of the node
      await createNode(node);
      console.log(`🪢 Node created with ID ${nodeId}`);
    }

    console.log('🎉 Finished processing SPARQL data.');

  } catch (error) {
    reporter.panic('Error fetching SPARQL data:', error);
  }
};

// Create pages for each tool
export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allSparqlTool {
        nodes {
          id
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allSparqlTool.nodes.forEach(tool => {
    createPage({
      path: `/tool/${tool.id}`,
      component: path.resolve(`./src/templates/tool.js`),
      context: {
        id: tool.id,
      },
    });
  });
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