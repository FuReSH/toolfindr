import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          subtitle
          description
          organisation
          organisation_url
          navbar_title
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
    subtitle: data.site.siteMetadata.subtitle,
    description: data.site.siteMetadata.description,
    organisation: data.site.siteMetadata.organisation,
    organisation_url: data.site.siteMetadata.organisation_url,
    navbar_title: data.site.siteMetadata.navbar_title,
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
