import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Footer = () => {
  const { organisation, images } = useSiteMetadata()

  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      <div className="container text-center">
        {/* Organisation & Lizenz */}
        <div className="row">
          <div className="col-sm-12">
            <small>
              Created by <a href="https://blogs.hu-berlin.de/furesh/" target="_blank" rel="noopener noreferrer">{organisation}</a>
              <br />
              All data on tools licensed under: 
              <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer"> CC BY-SA 4.0</a>
            </small>
            <br />
            {/* Lizenz-Logo */}
            <img
              src={`/images/${images.logo_license}`} 
              width="90"
              alt="License Logo"
              className="img-fluid m-2 vertical-align-center"
            />
          </div>
        </div>

        {/* Logos */}
        <div className="row">
          {images.logos_footer.map((filename, index) => {
            const imgSrc = `/images/${filename}`
            return (
              <div key={index} className="col-sm-3 align-self-center">
                {/* Use Gatsby-Image here */}
                <img
                  src={imgSrc}
                  width="200"
                  onError={(e) => { e.target.src = "/images/placeholder.png" }} // Fallback-Bild bei Fehler
                  alt={`Footer Logo ${index + 1}`}
                  className="img-fluid"
                />
              </div>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
