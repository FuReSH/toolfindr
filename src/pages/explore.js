import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import {Seo} from "../components/seo"
import { BsTools } from "react-icons/bs";


const ExplorePage = () => (
  <Layout>
    <div className="container my-5">

      <div className="container">
        <h1><span className="pe-3"><BsTools /></span>Explore Tools in Wikidata</h1>
        <h2>TaDiRAH classes with number of assigned tools in Wikidata</h2>
        <iframe title="wikidata-query" src="https://query.wikidata.org/embed.html#SELECT%20%3FtadirahID%20%28COUNT%28DISTINCT%20%3Ftool%29%20AS%20%3FtoolCount%29%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%20%20%0A%20%20%23%20Items%20%28software%20and%20its%20subclasses%29%20%0A%20%20%3Ftool%20wdt%3AP31%2Fwdt%3AP279%2a%20wd%3AQ7397.%0A%20%20%0A%20%20%23%20Software%20has%20the%20%22Verwendung%20in%22%20relation%20to%20%3FitemWithTaDiRAHID%0A%20%20%3Ftool%20wdt%3AP366%20%3FitemWithTaDiRAHID.%0A%20%20%0A%20%20%23%20%3FitemWithTaDiRAHID%20has%20a%20TaDiRAH%20ID%0A%20%20%3FitemWithTaDiRAHID%20wdt%3AP9309%20%3FtadirahID.%0A%7D%0AGROUP%20BY%20%3FtadirahID%0AORDER%20BY%20DESC%28%3FtoolCount%29%0ALIMIT%20100" referrerpolicy="origin" sandbox="allow-scripts allow-same-origin allow-popups" ></iframe>      </div>
      <Link to="/">Go back to Home</Link>
    </div>
  </Layout>
)

export default ExplorePage

export const Head = () => (
    <Seo title="Explore Tools in Wikidata" />
)