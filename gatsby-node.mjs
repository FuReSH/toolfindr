/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

import crypto from 'crypto';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { QueryEngine } from '@comunica/query-sparql';
import { LoggerPretty } from '@comunica/logger-pretty';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Defines the GraphQL schema for SPARQL tool data and TADIRAH concepts.
 * Ensures that all queried fields have appropriate data types.
 */
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type WikidataTadirahTool implements Node {
      toolID: ID!
      toolLabel: String
      tadirah: [TadirahConcept]! @link(by: "tadirahID")
      toolDesc: String
      image: String
      currentVersion: String
      copyright: String
      license: String
      sourceRepos: [String]
      websites: [String]
      instanceOfLabels: [String!]!
      collectionLabels: [String]
    }

    type TadirahConcept implements Node {
      tadirahID: ID!
      tadirahLabel: String!
    }
  `);
};

/**
 * Fetches SPARQL data for both Wikidata tools and TADIRAH concepts.
 * Implements caching to reduce redundant queries.
 */
export const sourceNodes = async ({ actions, createNodeId, reporter, cache }) => {
  const { createNode } = actions;
  const CACHE_KEY_TOOLS = 'wikidata-tools-data';
  const CACHE_KEY_TADIRAH = 'tadirah-concepts-data';

  let toolsData = null;
  let tadirahData = null;

  if (process.env.NODE_ENV === 'development') {
    toolsData = await cache.get(CACHE_KEY_TOOLS);
    tadirahData = await cache.get(CACHE_KEY_TADIRAH);
  }

  const toolsEngine = new QueryEngine();
  // Uncomment if you want to enpointsUrls for the federated query
  /*const endpointUrls = [
    'https://query.wikidata.org/sparql',
    'https://vocabs-downloads.acdh.oeaw.ac.at/vocabs-main/Humanities/TaDiRAH/tadirah.ttl'
  ];*/

  /**
   * Query Wikidata tools data
   */
  if (!toolsData) {
    reporter.info('🔍 No cached Wikidata tool data found, retrieving...');
    try {
      const query = await fs.readFile('./data/sparql-wikidata.rq', 'utf8');
      reporter.info(`📜 Loaded Wikidata SPARQL query:\n${query}`);

      const bindingsStream = await toolsEngine.queryBindings(query, { 
        sources: ['https://query.wikidata.org/sparql'],
        httpRetryOnServerError: true,
        httpRetryCount: 3,
        httpRetryDelay: 100, 
      });

      toolsData = [];
      
      for await (const row of bindingsStream) {
        toolsData.push({
          toolID: row.get('toolID')?.value,
          toolLabel: row.get('toolLabel')?.value,
          tadirahID: row.get('tadirahIDs')?.value?.split(', '), // Need tadirahID only for the internal GraphQL mapping with TaDiRAH concepts
          toolDesc: row.get('toolDesc')?.value || null,
          image: row.get('image')?.value || null,
          currentVersion: row.get('currentVersion')?.value || null,
          copyright: row.get('copyrightLabel')?.value || null,
          license: row.get('licenseLabel')?.value || null,
          sourceRepos: row.get('sourceRepos')?.value ? row.get('sourceRepos').value.split(', ') : null,
          websites: row.get('websites')?.value ? row.get('websites').value.split(', ') : null,
          instanceOfLabels: row.get('instanceOfLabels')?.value?.split(', '),
          collectionLabels: row.get('collectionLabels')?.value ? row.get('collectionLabels').value.split(', ') : null,
        });
      }

      if (process.env.NODE_ENV === 'development') {
        await cache.set(CACHE_KEY_TOOLS, toolsData);
        reporter.info('✅ Wikidata tool data cached.');
      }
    } catch (error) {
      reporter.panic('❌ Error retrieving Wikidata tools data:', error);
    }
  } else {
    reporter.info('⚡ Using cached Wikidata tools data.');
  }

  /**
   * Query TADIRAH concepts data
   */
  if (!tadirahData) {
    reporter.info('🔍 No cached TADIRAH data found, retrieving...');
    try {
      const tadirahQuery = `
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

        SELECT ?tadirahID ?tadirahLabel
        WHERE {
          ?tadirahID skos:prefLabel ?tadirahLabel .
          FILTER (lang(?tadirahLabel) = "en")
        }
      `;
      reporter.info('📡 Executing SPARQL query for TADIRAH concepts...');

      const tadirahStream = await toolsEngine.queryBindings(tadirahQuery, { 
        sources: [`https://vocabs-downloads.acdh.oeaw.ac.at/vocabs-main/Humanities/TaDiRAH/tadirah.ttl`], 
        httpRetryOnServerError: true,
        httpRetryCount: 3,
        httpRetryDelay: 100,
      });

      tadirahData = [];

      for await (const row of tadirahStream) {
        tadirahData.push({
          tadirahID: row.get('tadirahID')?.value,
          tadirahLabel: row.get('tadirahLabel')?.value,
        });
      }

      if (process.env.NODE_ENV === 'development') {
        await cache.set(CACHE_KEY_TADIRAH, tadirahData);
        reporter.info('✅ TADIRAH data cached.');
      }
    } catch (error) {
      reporter.panic('❌ Error retrieving TADIRAH data:', error);
    }
  } else {
    reporter.info('⚡ Using cached TADIRAH data.');
  }

  // Create Gatsby nodes for Wikidata tools
  toolsData.forEach(toolData => {
    const nodeId = createNodeId(`wikidata-tadirah-tool-${toolData.toolID}`);
    const nodeContentDigest = crypto.createHash('md5').update(JSON.stringify(toolData)).digest('hex');
  
    // Remove tadirahID from toolData to prevent circular reference
    const { tadirahID, ...cleanToolData } = toolData;

    createNode({
      ...cleanToolData, // Use data without tadirahID
      tadirah: tadirahID || [], // Relation
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'WikidataTadirahTool',
        contentDigest: nodeContentDigest,
      },
    });
  
    reporter.info(`🪢 Node created for tool ${toolData.toolLabel}`);
  });
  

  // Create Gatsby nodes for TADIRAH concepts
  tadirahData.forEach(concept => {
    const nodeId = createNodeId(`tadirah-concept-${concept.tadirahID}`);
    const nodeContentDigest = crypto.createHash('md5').update(JSON.stringify(concept)).digest('hex');

    createNode({
      ...concept,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'TadirahConcept',
        contentDigest: nodeContentDigest,
      },
    });

    reporter.info(`🪢 Node created for TADIRAH concept ${concept.tadirahLabel}`);
  });

  reporter.info('🙌 SPARQL data processing completed.');
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
          toolID
          toolLabel
          toolDesc
          instanceOfLabels
          tadirah {
            tadirahLabel
            tadirahID
          }
          image
          currentVersion
          copyright
          license
          sourceRepos
          websites
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }
  
  const toolTemplate = path.resolve(`src/templates/tool.js`);
  result.data.allWikidataTadirahTool.nodes.forEach(node => {
    createPage({
      path: `/tool/${node.id}`,
      component: toolTemplate,
      context: {
        tool: node,
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