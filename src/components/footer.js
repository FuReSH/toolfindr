import * as React from "react"
import PropTypes from "prop-types"
import { StaticImage } from "gatsby-plugin-image"

const Footer = ({ siteOrganisation }) => {
    return (
      <footer className="pt-3 mt-4 text-muted border-top">
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-12">
              <small>Created by {siteOrganisation}</small>
            </div>

          </div>
          <div className="row">
            <div className="col-sm-12">
            <StaticImage
                    src="../../static/images/HU_Siegel-Kombi_HU-blau_RGB.svg"
                    width={200}
                    quality={100}
                    formats={["AUTO", "WEBP"]}
                    alt="An opened Scholarly Makerspace box"
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