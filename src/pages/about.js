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

  const links = [
    {
      icon: frontmatter.link_icon_01,
      link: frontmatter.link_01,
      title: frontmatter.link_title_01,
      width: 30
    },
    {
      icon: frontmatter.link_icon_02,
      link: frontmatter.link_02,
      title: frontmatter.link_title_02,
      width: 30
    },
    {
      icon: frontmatter.link_icon_03,
      link: frontmatter.link_03,
      title: frontmatter.link_title_03,
      width: 30
    },
    {
      icon: frontmatter.link_icon_04,
      link: frontmatter.link_04,
      title: frontmatter.link_title_04,
      width: 30
    },
    {
      icon: frontmatter.link_icon_05,
      link: frontmatter.link_05,
      title: frontmatter.link_title_05,
      width: 30
    }
  ];

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
          {links.map((link, index) => (
              <p className="fs-6" key={index}>
                <img width={link.width} src={link.icon} />
                <a href={link.link} target="_blank" rel="noopener"> {link.title}</a>
              </p>
            ))}
          
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

        link_01
        link_title_01
        link_icon_01

        link_02
        link_title_02
        link_icon_02

        link_03
        link_title_03
        link_icon_03

        link_04
        link_title_04
        link_icon_04

        link_05
        link_title_05
        link_icon_05

      }
    }
  }
`

export const Head = () => (
  <Seo title="About the DH Tool Registry" />
)