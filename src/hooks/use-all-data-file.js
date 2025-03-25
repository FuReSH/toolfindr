import { graphql, useStaticQuery } from "gatsby"

export const useAllDataFile = () => {
  const data = useStaticQuery(graphql`
  query {
  allFile(filter: {sourceInstanceName: {eq: "data"}}) {
    edges {
      node {
        extension
        relativePath
        absolutePath
        publicURL
      }
    }
  }
  }
    `)

  return data
}