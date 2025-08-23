import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"

import Navbar from "./navbar"
import Footer from "./footer"

import "./layout.scss"

const Layout = ({ children }) => {

  const { navbar_title, organisation } = useSiteMetadata();

  return (
    <div className="container-fluid p-0 skippy">
      <Navbar siteTitle={navbar_title || `Title`}
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


//container-fluid p-0 skippy overflow-hidden