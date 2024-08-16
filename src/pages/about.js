import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import { GoInfo, GoLinkExternal } from "react-icons/go";
import { graphql } from "gatsby"


export default function AboutPageTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your content data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
    <div className="container my-4">

      <div className="row">
      <div className="col-sm-8">
      <h1><span className="pe-3"><GoInfo /></span>{frontmatter.title}</h1>
        </div>
        </div>
      <div className="row">
      <div className="col-sm-8">
      <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
         

    <div className="col-sm-3">
      
          <strong className="h5"><GoLinkExternal /> Further information</strong>
          <hr />
          <p>
          <img width="40" src={frontmatter.wikidata_icon} />
            <a href={frontmatter.wikiproject_link} target="_blank" rel="noopener"> {frontmatter.wikiproject_link_title}</a></p>
          <p>
          <img width="30" src={frontmatter.github_icon} />
            <a href={frontmatter.github_link} target="_blank" rel="noopener"> {frontmatter.github_link_title}</a></p>

          
          </div>
    </div> 
    <div className="row my-3">
      <div className="col-xs-4 col-sm-5">
        <Link to="/">Go back to Home</Link>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: {regex: "/about\\.md$/"}) {
      html
      frontmatter {
        title
        wikiproject_link_title
        wikiproject_link
        github_link
        github_link_title
        wikidata_icon
        github_icon
      }
    }
  }
`

export const Head = () => (
  <Seo title="About the DH Tool Registry" />
)