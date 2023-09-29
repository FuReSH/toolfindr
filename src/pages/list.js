import * as React from "react"
import { Link } from "gatsby"
import ToolsComponent from "../components/tools"
import Layout from "../components/layout"
import {Seo} from "../components/seo"
import { BsTools } from "react-icons/bs";

const ToolsPage = () => (
  <Layout>
    <div className="container my-4">
      <div className="row">
      <div className="col-xs-4 col-sm-10">
        <h1><span className="pe-3"><BsTools /></span>Tools</h1>
        <p>List of tools stored in Wikidata</p>
      </div>
      
      </div>
      <div className="row">
        <div className="col-xs-4 col-sm-10">
        

          
        <ToolsComponent />


        </div>
      </div>
      <div className="row my-3">
      <div className="col-xs-4 col-sm-5">
        <Link to="/">Go back to Home</Link>
        </div>
      </div>
      
    </div>
  </Layout>
)

export default ToolsPage

export const Head = () => (
    <Seo title="List tools" />
)
