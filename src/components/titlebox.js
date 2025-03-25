import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export const TitleBox = ({ title, subtitle_long, description, logo_title }) => {
  const {
    title: defaultTitle,
    subtitle_long: defaultSubtitleLong,
    description: defaultDescription,
    images,
  } = useSiteMetadata() // Neue Struktur nutzt bereits gatsbyImageData

  const actualTitle = title || defaultTitle
  const actualSubtitleLong = subtitle_long || defaultSubtitleLong
  const actualDescription = description || defaultDescription
  const image = logo_title ? images[logo_title] : images.logo_title // Dynamischer Zugriff auf logo_title

  return (
    <div className="p-5 start-page-container">
      <div className="row g-0 p-5">
        <div className="col-sm-3">
          {image ? (
            <GatsbyImage image={image} alt="Logo" />
          ) : (
            <div>Could not find the image</div>
          )}
        </div>
        <div className="col-sm-8">
          <h1 className="display-4 fw-light mb-5">{actualTitle}</h1>
          <h2 id="subtitle" className="display-6 fw-light">{actualSubtitleLong}</h2>
          <h4 className="my-4">{actualDescription}</h4>
        </div>
      </div>
    </div>
  )
} 
