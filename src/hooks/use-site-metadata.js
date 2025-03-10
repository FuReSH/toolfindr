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
          images {
            logo_title
            logo_navbar
            logos_footer
            logo_license
          }
        }
      }
    }
  `)
  
    return data.site.siteMetadata 
}
