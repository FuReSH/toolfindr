import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useAllImageFile } from "../hooks/use-all-image-file"

export const TitleBox = ({ title, subtitle_long, description, logo_title }) => {

  const { 
    title: defaultTitle, 
    subtitle_long: defaultSubtitleLong, 
    description: defaultDescription, 
    logo_title: defaultLogoTitle } = useSiteMetadata()
  const actualTitle = title || defaultTitle
  const actualSubtitleLong = subtitle_long || defaultSubtitleLong
  const actualDescription = description || defaultDescription
  const filename = logo_title || defaultLogoTitle

    const imgData = useAllImageFile()
    const imageNode = imgData.allFile.edges.find(edge => edge.node.relativePath === filename)?.node.childImageSharp.gatsbyImageData

    if (!imageNode) {
        return <div>Could not find the image!</div>
    }

    const image = getImage(imageNode)
  
  return (

    <div className="p-5 mb-4 start-page-container">
      <div className="row g-0 p-5">
        <div className="col-sm-3">
        <GatsbyImage image={image} alt="Logo" />
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