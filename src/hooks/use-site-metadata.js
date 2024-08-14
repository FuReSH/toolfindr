import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
            title
            description
            author
            organisation
            subtitle_short
            subtitle_long
            logo_title
            logo_navbar
          }
      }
    }
  `)
  
    return data.site.siteMetadata 
}