module.exports = {
  siteMetadata: {
    title: `DH Tool Registry`,
    subtitle_short: `KDH`,
    subtitle_long: `Kompetenzwerkstatt Digital Humanities`,
    description: `Open and community-oriented tool registry based on Wikidata and TaDiRAH.`,
    author: `@sopheck`,
    organisation: `Project FuReSH II - Universitätsbibliothek der Humboldt-Universität zu Berlin`,
    logo_title: `KDH - Logo Symbol - HU Digital Blau.png`,
    logo_navbar: `KDH - Logo Symbol - White.png`
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
            icon: `static/favicon.png`, // This path is relative to the root of the site.
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
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            name: `content`,
            path: `${__dirname}/src/content`,
          },
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-gatsby-cloud`,
      ],
    }
