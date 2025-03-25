module.exports = {
  pathPrefix: `/tool-storage-interface`,
  siteMetadata: {
    title: `KDH | Tool Storage`,
    description: `Wikidata based tool registry used by the Kompetenzwerkstatt Digital Humanities.`,
    author: `@sopheck`,
    title: `DH Tool Registry`,
    subtitle_short: `KDH`,
    subtitle_long: `Kompetenzwerkstatt Digital Humanities`,
    description: `Open and community-curated tool registry based on Wikidata and TaDiRAH.`,
    organisation: `Project FuReSH II - Universitätsbibliothek der Humboldt-Universität zu Berlin`,
    organisation_url: `https://blogs.hu-berlin.de/furesh/`,
    images: {
      logo_title: `KDH - Logo Symbol - HU Digital Blau.png`,
      logo_navbar: `KDH - Logo Symbol - White.png`,
      logos_footer: [
        `KDH - Primary Logo - HU Digital Blau.png`,
        `Logo_for_memory_RGB.png`,
        `hu_siegel-kombi_rgb.png`,
        `dfg_logo_schriftzug_blau_foerderung_en.png`,
      ],
    }
  },
      plugins: [
        {
          resolve: `gatsby-transformer-remark`,
          options: {
            plugins: [
              {
                resolve: `gatsby-remark-autolink-headers`,
                options: {
                  offsetY: `100`,
                  icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
                  className: `custom-anchor`,
                  maintainCase: true,
                  removeAccents: true,
                  isIconAfterHeader: true,
                  elements: [`h2`, `h3`, `h4`],
                },
              },
            ],
          },
        }, 
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
      ],
    }
