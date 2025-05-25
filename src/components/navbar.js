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
  const { navbar_title, images } = useSiteMetadata()

  return (
    <nav id="nav-top" className="navbar navbar-expand-md p-2 fixed-top"> {/* switch to sticky-top when experimental status of css animation is supported by a wide range of browsers */}
      <div className="container">
        {/* Logo und Titel */}
        <Link to="/" className="navbar-brand fw-bold text-primary d-flex align-items-center link-underline-primary icon-link icon-hover-link">
          {images.logo_navbar ? (
            <GatsbyImage image={images.logo_navbar} alt="Logo" className="navbar-img" />
          ) : (
            <span>Logo not found</span>
          )}
          <span className="text-primary">{navbar_title}</span>
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
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
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
