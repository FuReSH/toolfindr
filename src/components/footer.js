import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { GoLinkExternal } from "react-icons/go";
import { withPrefix } from 'gatsby'

import "./footer.scss"

const Footer = () => {
  const { organisation, organisation_url, images } = useSiteMetadata()

  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      <div className="container text-center">
        {/* Organisation & Lizenz */}
        <div className="row mb-4">
          <div className="col-sm-12">
            <small>
              Created by{" "}
              <a
                href={organisation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link icon-hover-link"
              >
                {organisation} <GoLinkExternal />
              </a>
              <br />
              All data on tools retrieved from Wikidata licensed under:{" "}
              <a
                href="https://creativecommons.org/publicdomain/zero/1.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link icon-hover-link"
              >
                CC0 1.0 Universal <GoLinkExternal />
              </a>
            </small>
            <br />
            {/* Lizenz-Logo 
            use "withPrefix" as recommended in gatsby issue on GitHub https://github.com/gatsbyjs/gatsby/issues/21975#issuecomment-650573201 */}
            <img
                src={withPrefix('/images/cc-zero.png')}
                alt="License Logo"
                className="img-fluid m-2"
                style={{ width: "90px" }}
              />
          </div>
        </div>

        {/* Logos */}
        <div className="row g-0 justify-content-evenly">
          {images.logos_footer.map((logo) =>
            logo.image ? (
              <div key={logo.name} className="col-sm-2 align-self-center mb-2">
                <GatsbyImage
                  image={logo.image}
                  alt={`Footer Logo ${logo.name}`}
                  className="img-fluid"
                  style={{ width: "80%" }}
                />
              </div>
            ) : (
              <div key={logo.name} className="col-sm-2 align-self-center">
                Image not found: {logo.name}
              </div>
            )
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
