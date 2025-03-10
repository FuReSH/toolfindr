import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { siteMetadata } from "../../gatsby-config"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useAllImageFile } from "../hooks/use-all-image-file"

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "nav-link active" } : { className: "nav-link" }
}

const ExactNavLink = props => (
  <Link getProps={isActive} {...props} />
)

const Navbar = ({ siteTitle }) => {
  
  const filename = siteMetadata.images.logo_navbar

  const imgData = useAllImageFile()
  const imageNode = imgData.allFile.edges.find(edge => edge.node.relativePath === filename)?.node.childImageSharp.gatsbyImageData
  const image = getImage(imageNode)

  return (
    <nav id="nav-top" className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand" href="#">
          <GatsbyImage image={image} alt="Logo" />
          <span className="ps-2 align-middle">{siteMetadata.subtitle_short} | {siteTitle}</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar"
          aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <ExactNavLink
                to="/"
              >
                Home
              </ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink
                to="/about"
              >
                About
              </ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink
                to="/list"
              >
                Search
              </ExactNavLink>
            </li>
            
            <li className="nav-item">
              <ExactNavLink
                to="/explore"
              >
                Explore
              </ExactNavLink>
            </li>
          </ul>
         
        </div>
      </div>
    </nav>
  )
}

// Edit snippet
/*<li className="nav-item">
              <ExactNavLink
                to="/edit"
              >
                Edit
              </ExactNavLink>
            </li>*/

// Snippet for Multilingual support
/*<ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">EN</a>
            </li>
            <li className="nav-item"><span className="nav-link">|</span></li>
            <li className="nav-item"><a className="nav-link" href="#">DE</a></li>
          </ul> */
Navbar.propTypes = {
  siteTitle: PropTypes.string,
  filename: PropTypes.string,
}

Navbar.default = {
  siteTitle: ``,
  filename: ``,
}

export default Navbar
