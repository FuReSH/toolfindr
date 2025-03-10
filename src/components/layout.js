import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"

import Navbar from "./navbar"
import Footer from "./footer"

import "./layout.scss"

const Layout = ({ children }) => {

  const { title, subtitle_short, organisation } = useSiteMetadata();

  return (
    <div className="container-fluid p-0 skippy overflow-hidden">
      <Navbar siteTitle={title || `Title`}
        siteSubtitleShort={subtitle_short || `Subtitle`}
      />



      <main className="my-5">

        {children}


      </main>
      <Footer siteOrganisation={organisation || `Organisation`} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout


