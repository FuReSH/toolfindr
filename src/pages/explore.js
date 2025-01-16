import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import {Seo} from "../components/seo"
import { GoGlobe } from "react-icons/go";


const ExplorePage = () => (
  <Layout>
    <div className="container my-4">
      <div className="row">
      <div className="col-sm-8">
        <h1><span className="pe-3"><GoGlobe /></span>Explore Tools in Wikidata</h1>
      <Link to="/">Go back to Home</Link>
    </div>
    </div>
    </div>  
  </Layout>
)

export default ExplorePage

export const Head = () => (
    <Seo title="Explore Tools in Wikidata" />
)