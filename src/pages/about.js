import * as React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import { GoInfo, GoLinkExternal } from "react-icons/go";
import { graphql } from "gatsby";
import BackButton from "../components/backbutton";

export default function AboutPageTemplate({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { links } = frontmatter;

  return (
    <Layout>
      <div className="container my-4">
        <div className="row">
          <div className="col-sm-8">
            <h1>
              <span className="pe-3"><GoInfo /></span>{frontmatter.title}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          <div className="col-sm-3">
            <strong className="h5"><GoLinkExternal /> Further information</strong>
            <hr />
            {links && links.length > 0 ? (
              links.map((link, index) => (
                <p className="fs-6" key={index}>
                  <img width="24" height="24" src={link.icon} alt={link.title} className="me-2" />
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </p>
              ))
            ) : (
              <p className="fs-6 text-muted">No further links available.</p>
            )}
          </div>
        </div>
        <BackButton />
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
        links {
          url
          title
          icon
        }
      }
    }
  }
`

export const Head = () => (
  <Seo title="About the DH Tool Registry" />
)
