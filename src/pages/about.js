import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import { BsFillInfoCircleFill } from "react-icons/bs";
import { graphql } from "gatsby"


export default function AboutPageTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your content data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
    <div className="container my-5">

      <div className="row justify-content-center">
      <div className="col-sm-8">
      <h1><span className="pe-3"><BsFillInfoCircleFill /></span>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      <Link to="/">Go back to Home</Link>
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
      }
    }
  }
`

export const Head = () => (
  <Seo title="About the DH Tool Registry" />
)