import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          organisation
          organisation_url
          subtitle_short
          subtitle_long
          images {
            logo_title
            logo_navbar
            logos_footer
            }
        }
      }
      allImages: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, quality: 100, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `)
  
  // Function to find an image by its filename
  const findImage = (filename) => {
    return data.allImages.edges.find(({ node }) =>
      filename.includes(node.name)
    )?.node
  }

  return {
    title: data.site.siteMetadata.title,
    description: data.site.siteMetadata.description,
    author: data.site.siteMetadata.author,
    organisation: data.site.siteMetadata.organisation,
    organisation_url: data.site.siteMetadata.organisation_url,
    subtitle_short: data.site.siteMetadata.subtitle_short,
    subtitle_long: data.site.siteMetadata.subtitle_long,
    images: {
      logo_title: getImage(findImage(data.site.siteMetadata.images.logo_title)),
      logo_navbar: getImage(findImage(data.site.siteMetadata.images.logo_navbar)),
      logos_footer: data.site.siteMetadata.images.logos_footer.map((file) => ({
        name: file,
        image: getImage(findImage(file)),
      })),
    },
  }
}
