import * as React from "react"
import Layout from "../components/layout"
import {Seo} from "../components/seo"
import { GoGlobe } from "react-icons/go";
import BackButton from "../components/backbutton";


const ExplorePage = () => (
  <Layout>
    <div className="container my-4">
      <div className="row">
      <div className="col-sm-8">
        <h1><span className="pe-3"><GoGlobe /></span>Explore</h1>
        <p className="kdh-short-desc">Query and edit the DH Tool Registry data in Wikidata</p>
        <p>🚧 A new page with help on how to query and edit data directly in Wikidata will appear here shortly.</p>
        <p>We ask for your patience. Thank you.</p>
    </div>
    </div>
    <BackButton />
    </div>
  </Layout>
)

export default ExplorePage

export const Head = () => (
    <Seo title="Explore Tools in Wikidata" />
)