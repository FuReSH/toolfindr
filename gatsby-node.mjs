/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

import crypto from 'crypto';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { QueryEngine } from '@comunica/query-sparql';
import { LoggerPretty } from '@comunica/logger-pretty';
import fs from 'node:fs/promises';
import * as path from 'path';

/**
 * Defines the GraphQL schema for SPARQL tool data.
 * Ensures that all queried fields have appropriate data types.
 */
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type WikidataTadirahTool implements Node {
      toolID: ID!
      toolLabel: String
      tadirahID: [String!]!
      tadirahLabel: [String!]!
      toolDesc: String
      image: String
      copyright: String
      license: String
      sourceRepos: [String]
      websites: [String]
      instanceOfLabels: [String!]!
      collectionLabels: [String]
    }
  `);
};

/**
 * Fetches SPARQL data, processes it, and creates Gatsby nodes.
 * Implements caching to reduce redundant queries.
 */
export const sourceNodes = async ({ actions, createNodeId, reporter, cache }) => {
  const { createNode } = actions;
  const CACHE_KEY = 'wikidata-tadirah-tools-data';

  let toolsData = null;

  if (process.env.NODE_ENV === 'development') {
    toolsData = await cache.get(CACHE_KEY);
  }

  if (!toolsData) {
    reporter.info('🔍 No cached SPARQL data found, new data is retrieved...');
    const endpointUrls = [
      'https://query.wikidata.org/sparql',
      'https://vocabs-downloads.acdh.oeaw.ac.at/vocabs-main/Humanities/TaDiRAH/tadirah.ttl'
    ];
    const toolsEngine = new QueryEngine();

    try {
      const query = await fs.readFile('./data/federated-sparql.rq', 'utf8');
      reporter.info(`📜 Loaded SPARQL query:\n${query}`);
      reporter.info('📡 SPARQL query on Wikidata is executed...');

      const bindingsStream = await toolsEngine.queryBindings(query, { sources: endpointUrls });
      toolsData = [];

      for await (const row of bindingsStream) {
        toolsData.push({
          toolID: row.get('toolID')?.value,
          toolLabel: row.get('toolLabel')?.value,
          tadirahID: row.get('tadirahIDs')?.value?.split(', ') || null,
          tadirahLabel: row.get('tadirahLabels')?.value?.split(', ') || null,
          toolDesc: row.get('toolDesc')?.value || 'No description available.',
          image: row.get('image')?.value || null,
          copyright: row.get('copyrightLabel')?.value || 'No copyright information.',
          license: row.get('licenseLabel')?.value || 'No license information.',
          sourceRepos: row.get('sourceRepos')?.value?.split(', ') || [],
          websites: row.get('websites')?.value?.split(', ') || [],
          instanceOfLabels: row.get('instanceOfLabels')?.value?.split(', ') || null,
          collectionLabels: row.get('collectionLabels')?.value?.split(', ') || [],
        });
      }

      if (process.env.NODE_ENV === 'development') {
        await cache.set(CACHE_KEY, toolsData);
        reporter.info('✅ SPARQL data was cached.');
      }
    } catch (error) {
      reporter.panic('❌ Error when retrieving SPARQL data:', error);
    }
  } else {
    reporter.info('⚡ Using cached SPARQL data.');
  }

  // Create Gatsby nodes
  toolsData.forEach(toolData => {
    const nodeId = createNodeId(`wikidata-tadirah-tool-${toolData.toolID}`);
    const nodeContentDigest = crypto.createHash('md5').update(JSON.stringify(toolData)).digest('hex');

    createNode({
      ...toolData,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'WikidataTadirahTool',
        contentDigest: nodeContentDigest,
      },
    });

    reporter.info(`🪢 Node created with ID ${nodeId}`);
  });

  reporter.info('🎉 SPARQL data processing completed.');
};

/**
 * Creates pages dynamically for each SPARQL tool entry.
 * Uses Gatsby's GraphQL layer to fetch existing nodes.
 */
export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allWikidataTadirahTool {
        nodes {
          id
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allWikidataTadirahTool.nodes.forEach(tool => {
    createPage({
      path: `/tool/${tool.id}`,
      component: path.resolve(`./src/templates/tool.js`),
      context: {
        id: tool.id,
      },
    });
  });
};

/**
 * Configures Webpack to include polyfills for Node.js modules in Gatsby's Webpack 5 setup.
 */
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