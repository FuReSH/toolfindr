import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Navbar from "./navbar"
import Footer from "./footer"
import "./layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          organisation
        }
      }
    }
  `)

  return (
    <div className="container-fluid p-0 skippy overflow-hidden">
   <Navbar siteTitle={data.site.siteMetadata?.title || `Title`} />
 
 
 
    <main className="my-5">
        {children}
      </main>
      <Footer siteOrganisation={data.site.siteMetadata?.organisation || `Organisation`}/>
      </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout


