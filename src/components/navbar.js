import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSiteMetadata } from "../hooks/use-site-metadata"


const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "nav-link active" } : { className: "nav-link" }
}

const ExactNavLink = (props) => <Link getProps={isActive} {...props} />

const Navbar = ({ siteTitle }) => {
  const { subtitle_short, images } = useSiteMetadata()

  return (
    <nav id="nav-top" className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <div className="container">
        {/* Logo und Titel */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          {images.logo_navbar ? (
            <GatsbyImage image={images.logo_navbar} alt="Logo" className="navbar-img me-2" />
          ) : (
            <span>Logo not found</span>
          )}
          <span className="">{subtitle_short} | {siteTitle}</span>
        </Link>

        {/* Navbar Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <ExactNavLink to="/">Home</ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink to="/about">About</ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink to="/list">Search</ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink to="/get-involved">Get Involved</ExactNavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  siteTitle: PropTypes.string,
}

Navbar.default = {
  siteTitle: ``,
}

export default Navbar
