import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const BuildTime = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        id
        buildTime(formatString: "YYYY-MM-DD, HH:mm:ss", locale: "de-DE")
      }
    }
  `)

  return <p className="fs-6 mt-2 text-muted">Data were requested from Wikidata on: {data.site.buildTime}</p>
}

export default BuildTime
