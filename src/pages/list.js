import * as React from "react"
import { Link } from "gatsby"
import ToolsComponent from "../components/tools"
import Layout from "../components/layout"
import {Seo} from "../components/seo"
import { GoSearch } from "react-icons/go";
import Concepts from "../components/concepts"

const ToolsPage = () => (
  <Layout>
    <div className="container my-4">
      <div className="row">
      <div className="col-sm-8">
        <h1><span className="pe-3"><GoSearch /></span>Tools</h1>
        <p>Search for DH tools classified with the TaDiRAH taxonomy.</p>
      </div>
      
      </div>
      <div className="row">
        <div className="col-sm-8">
        

          
        <ToolsComponent />


        </div>
        <div className="col-sm-3">
          <Concepts />
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
