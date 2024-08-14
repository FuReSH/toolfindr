import * as React from "react"
import PropTypes from "prop-types"
import { StaticImage } from "gatsby-plugin-image"

const Footer = ({ siteOrganisation }) => {
    return (
      <footer className="pt-3 mt-4 text-muted border-top">
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-12">
              <small>
                Created by <a href="https://blogs.hu-berlin.de/furesh/" target="_blank" rel="noopener noreferrer">{siteOrganisation}</a>
                 <br />
                
              </small>
              <StaticImage
                    src="../../static/images/by-sa.png"
                    width={90}
                    quality={100}
                    formats={["AUTO", "WEBP"]}
                    alt="Logo"
                    className="img-fluid m-2"
                  />
            </div>

          </div>
          <div className="row">
            <div className="col-sm-4 align-self-center">
            <StaticImage
                    src="../../static/images/KDH - Primary Logo - HU Digital Blau.png"
                    width={300}
                    quality={100}
                    formats={["AUTO", "WEBP"]}
                    alt="Logo"
                    className="img-fluid"
                  />
            </div>
            <div className="col-sm-4">
            <StaticImage
                    src="../../static/images/HU_Siegel_HU-blau_RGB.svg"
                    quality={100}
                    formats={["AUTO", "WEBP"]}
                    alt="Logo"
                    className="img-fluid"
                  />
            </div>
            <div className="col-sm-4 align-self-center">
            <StaticImage
                    src="../../static/images/DFG-Logo.svg"
                    quality={100}
                    formats={["AUTO", "WEBP"]}
                    alt="Logo"
                    className="img-fluid"
                  />
            </div>

          </div>
                
               
        </div>
      </footer>
    )
  }

  Footer.propTypes = {
    siteOrganisation: PropTypes.string,
  }
  
  Footer.defaultProps = {
    siteOrganisation: ``,
  }

  export default Footer