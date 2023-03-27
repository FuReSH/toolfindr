import * as React from "react"
import { Link } from "gatsby"
import FormCard from "../components/form"
import Layout from "../components/layout"
import {Seo} from "../components/seo"

const EditPage = () => (
  <Layout>
    <div className="container my-4">
      <div className="row justify-content-center">
      <div className="col-xs-4 col-sm-10">
      <h1 className="card-title">Edit tool</h1>
      <p className="card-text">Edit tool information</p>
        </div>
      
      </div>
      <div className="row justify-content-center">
        <div class="col-xs-4 col-sm-10">
      <div className="card p-4 bg-light">
        <div className="card-body">
          <FormCard />
          </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center my-3">
      <div className="col-xs-4 col-sm-5">
        <Link to="/">Go back to Home</Link>
        </div>
        <div className="col-xs-4 col-sm-5 text-end">
        <button type="button" className="btn btn-primary btn-lg">Save</button>
        </div>
      </div>
      
    </div>
  </Layout>
)

export default EditPage

export const Head = () => (
    <Seo title="Edit tool" />
)
