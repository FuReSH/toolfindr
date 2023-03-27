import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import { Seo } from "../components/seo"

const IndexPage = () => (
  <Layout>
    <section className="py-4">
      <div className="container">
        <div className=" p-5 mb-4 start-page-container rounded-3">
      <div className="row g-0 p-5">
          <div className="col-sm-6">
            <h1 className="display-4 fw-light">Scholarly Makerspace</h1>
            <h2 className="display-6 fw-light">Tool Storage</h2>
        </div> 
        <div className="col-sm-4">      
          <StaticImage
                src="../../static/images/blackbox_makerspace-inside.png"
                width={450}
                quality={100}
                formats={["AUTO", "WEBP"]}
                alt="An opened Scholarly Makerspace box"
                className="img-fluid"
              /></div>
              </div> 
            </div>
      </div>
      <div className="container">
      <div className="row align-items-sm-stretch">
        <div className="col-md-4">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2>About the Tool Storage</h2>
            <p>Here you can find more information about the Tool Storage</p>
            <Link to="/about/" className="btn btn-outline-primary">About Tool Storage</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2>Tool List</h2>
            <p>Here you can find all the tools of the Scholarly Makerspace. You can also edit the information of the tools.</p>
            <Link to="/list/" className="btn btn-outline-primary">Tool List</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2>Edit Tool</h2>
            <p>Here you add new or edit existing tools.</p>
            <Link to="/edit/" className="btn btn-outline-primary">Edit Tool</Link>
          </div>
        </div>
      </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage

export const Head = () => (
    <Seo />
)