module.exports = {
  siteMetadata: {
    title: `KDH | Tool Registry`,
    description: `Wikidata based tool registry used by the Kompetenzwerkstatt Digital Humanities.`,
    author: `@sopheck`,
    organisation: `Project FuReSH II - Universitätsbibliothek der Humboldt-Universität zu Berlin`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          precision: 6,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-bootstrap-5`,
        short_name: `gb5-starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `static/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
        // Ignore files starting with a dot
        ignore: [`**/\.*`],
        // Use "mtime" and "inode" to fingerprint files (to check if file has changed)
        fastHash: true,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
  ],
}
