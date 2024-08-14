import { graphql, useStaticQuery } from "gatsby"

export const useAllFile = () => {
  const data = useStaticQuery(graphql`
  query {
  allFile(filter: { sourceInstanceName: { eq: "images" } }) {
    edges {
      node {
        relativePath
        childImageSharp {
          gatsbyImageData(
            quality: 90
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
  }
    `)

  return data
}