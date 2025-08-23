import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export const TitleBox = ({ title, subtitle, description, logo_title }) => {
  const {
    title: defaultTitle,
    subtitle: defaultSubtitle,
    description: defaultDescription,
    images,
  } = useSiteMetadata() // Neue Struktur nutzt bereits gatsbyImageData

  const actualTitle = title || defaultTitle
  const actualSubtitle = subtitle || defaultSubtitle
  const actualDescription = description || defaultDescription
  const image = logo_title ? images[logo_title] : images.logo_title // Dynamischer Zugriff auf logo_title

  return (
    <div className="start-page-container">
       <div className="row g-5 align-items-center justify-content-center">
        <div className="col-5 col-sm-5 col-md-4 col-lg-3 d-flex justify-content-center align-items-center">
          {image ? (
            <GatsbyImage image={image} alt="Logo" />
          ) : (
            <div>Could not find the image</div>
          )}
        </div> 
        <div className="col-10 col-md-8 col-lg-9 justify-content-center text-center">
          <h1 id="title" className="display-5 fw-bold mb-4"><code>&lt;</code> {actualTitle} <code>&#47;&gt;</code></h1>
          <h2 id="subtitle" className="display-5 fw-bold text-dark mb-3">{actualSubtitle}</h2>
          <h3 id="description" className="text-secondary">{actualDescription}</h3>
        </div>      
      </div>
    </div>
  )
} 
