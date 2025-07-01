import * as React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import { GoCommentDiscussion, GoLinkExternal } from "react-icons/go";
import { graphql } from "gatsby";
import BackButton from "../components/backbutton";
import Toc from "../components/toc";


export default function ExplorePage({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html, headings } = markdownRemark;
  const { links } = frontmatter;

  return (
    <Layout>
      <div className="container my-4">
        {/* Hauptbereich mit drei Spalten */}
        <div className="row">
          {/* Linke Spalte für TOC (nur auf großen Bildschirmen) */}
          <div className="d-none d-lg-block col-lg-2">
            <Toc headings={headings} />
          </div>

          {/* Mittlere Spalte mit dem Hauptinhalt */}
          <div className="col-12 col-md-8 col-lg-7">
            <h1>
              <span className="pe-3"><GoCommentDiscussion className="icon-color-secondary" /></span>{frontmatter.title}
            </h1>
            <p className="kdh-short-desc">{frontmatter.subtitle}</p>
            
            {/* TOC für kleinere Bildschirme - direkt nach subtitle */}
            <div className="d-lg-none mb-4">
              <Toc headings={headings} />
            </div>
            
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          {/* Rechte Spalte für externe Links */}
          <div className="col-12 col-md-4 col-lg-3">
            {links && links.length > 0 ? (
              <div>
                <h5><GoLinkExternal /> Further information</h5>
                <hr />
                {links.map((link, index) => (

                  <div className="d-flex mb-3 fs-6" key={index}>
                    <div className="me-2">
                      <img width="25px" src={link.icon} alt={link.title} />
                    </div>
                    <div>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="icon-link icon-link-hover">
                        {link.title}
                      </a>
                    </div>
                  </div>
                ))}
              </div>) : <div></div>}
          </div>
        </div>
        <BackButton />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: {regex: "/get-involved\\.md$/"}) {
      html
      frontmatter {
        title
        subtitle
        links {
          url
          title
          icon
        }
      }
      headings {
      depth
      value
    }
    }
  }
`

export const Head = () => (
  <Seo title="Edit Tools in Wikidata" />
)