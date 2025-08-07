require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const filesystemSources = require("./filesystemSources");
const pathPrefix = process.env.GATSBY_PATH_PREFIX || "";

module.exports = [
  ...filesystemSources.map((opts) => ({
    resolve: `gatsby-source-filesystem`,
    options: opts,
  })),
  {
    resolve: require.resolve(`../plugins/gatsby-source-research-tools`),
    options: {
      wikidataSparqlUrl: process.env.GATSBY_WD_SPARQL_URL,
      wikidataLdfUrl: process.env.GATSBY_WD_LDF_URL,
      tadirahFileUrl: process.env.GATSBY_TADIRAH_FILE_URL,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: 100,
            icon: `<svg aria-hidden="true" height="20" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/></svg>`,
            className: `custom-anchor`,
            maintainCase: true,
            removeAccents: true,
            isIconAfterHeader: true,
            elements: [`h2`, `h3`, `h4`],
          },
        },
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 400,
            showCaptions: true,
          },
        },
      ],
    },
  },

  `gatsby-plugin-image`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,

  {
    resolve: `gatsby-plugin-sass`,
    options: {
      sassOptions: {
        precision: 6,
      },
      additionalData: `$pathPrefix: "${pathPrefix}";`,
    },
  },

  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `DH Tool Registry Frontend`,
      short_name: `DH Tool Registry`,
      start_url: `/`,
      background_color: `#0A05F9`,
      theme_color: `#0A05F9`,
      display: `standalone`,
      icon: `static/favicon.png`,
    },
  },
  {
    resolve: 'gatsby-plugin-local-search',
    options: {
      // A unique name for the search index. This should be descriptive of
      // what the index contains. This is required.
      name: 'research-tools',

      // Set the search engine to create the index. This is required.
      // The following engines are supported: flexsearch, lunr
      engine: 'flexsearch',

      // Provide options to the engine. This is optional and only recommended
      // for advanced users.
      //
      // Note: Only the flexsearch engine supports options.
      engineOptions: 'speed',

      // GraphQL query used to fetch all data for the search index. This is
      // required.
      query: `
          {
            allResearchTool {
              nodes {
                label
                concepts {
                  label
                }
                description
              }
            }
          }
        `,

      // Field used as the reference value for each document.
      // Default: 'id'.
      ref: 'id',

      // List of keys to index. The values of the keys are taken from the
      // normalizer function below.
      // Default: all fields
      index: ['label', 'description'],

      // List of keys to store and make available in your UI. The values of
      // the keys are taken from the normalizer function below.
      // Default: all fields
      store: ['_id', 'label', 'description'],

      // Function used to map the result from the GraphQL query. This should
      // return an array of items to index in the form of flat objects
      // containing properties to index. The objects must contain the `ref`
      // field above (default: 'id'). This is required.
      normalizer: ({ data }) =>
        data.allResearchTool.nodes.map((node) => ({
          _id: node._id,
          label: node.label,
          description: node.description,
        })),
    },
  },
];
