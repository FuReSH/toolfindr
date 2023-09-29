/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const SparqlClient = require('sparql-http-client');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const itemsCache = {}; // Define itemsCache here to store the items temporarily
  const client = new SparqlClient({ endpointUrl: 'https://query.wikidata.org/sparql' });
  const query = `
  PREFIX wd: <http://www.wikidata.org/entity/>
  PREFIX wdt: <http://www.wikidata.org/prop/direct/>
  PREFIX p: <http://www.wikidata.org/prop/>
  PREFIX ps: <http://www.wikidata.org/prop/statement/>
  PREFIX psv: <http://www.wikidata.org/prop/statement/value/>
  PREFIX bd: <http://www.bigdata.com/rdf#>
  PREFIX wikibase: <http://wikiba.se/ontology#>
  
  SELECT DISTINCT ?item ?itemLabel ?p973Value WHERE {
    ?item p:P31 ?statement0.
    ?statement0 (ps:P31/(wdt:P279*)) wd:Q7397.
    ?item p:P973 ?statement1.
    ?statement1 ps:P973 ?url.
    FILTER(REGEX(STR(?url), "^https://tapor.ca/tools/")) .
    ?item wdt:P973 ?p973Value.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }   
  `;

  const stream = await client.query.select(query);

  stream.on('data', row => {
    const itemId = row.item.value;

    if (!itemsCache[itemId]) {
      itemsCache[itemId] = {
        item: itemId,
        itemLabel: row.itemLabel.value,
        p973Value: [],
      };
    }

    itemsCache[itemId].p973Value.push(row.p973Value.value);
  });

  stream.on('end', () => {
    Object.values(itemsCache).forEach(itemData => {
      const nodeMeta = {
        id: createNodeId(`item-${itemData.item}`),
        parent: null,
        children: [],
        internal: {
          type: 'ItemData',
          contentDigest: createContentDigest(itemData.item),
        },
      };

      const node = Object.assign({}, itemData, nodeMeta);
      actions.createNode(node);
    });
  });

  stream.on('error', error => {
    console.error(error);
  });

  await new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
};


  

