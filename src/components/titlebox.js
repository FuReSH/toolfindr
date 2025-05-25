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
    <div className="p-5 start-page-container">
      <div className="row g-5 p-5">
        <div className="col-sm-4">
          {image ? (
            <GatsbyImage image={image} alt="Logo" />
          ) : (
            <div>Could not find the image</div>
          )}
        </div>
        <div className="col-sm-8">
          <h1 id="title" className="display-5 fw-bold mb-4"><code>&lt;</code> {actualTitle} <code>&#47;&gt;</code></h1>
          <h2 id="subtitle" className="display-5 fw-bold text-dark mb-2">{actualSubtitle}</h2>
          <h3 id="description" className="text-secondary">{actualDescription}</h3>
        </div>
      </div>
    </div>
  )
} 
