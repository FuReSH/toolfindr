import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import {Seo} from "../components/seo"
import { BsFillInfoCircleFill } from "react-icons/bs";


const AboutPage = () => (
  <Layout>
    <div className="container my-5">

      <div className="container">
        <h1><span className="pe-3"><BsFillInfoCircleFill /></span>The Digital Tool Storage</h1>
        <p>...coming soon...</p>
      </div>
      <Link to="/">Go back to Home</Link>
    </div>
  </Layout>
)

export default AboutPage

export const Head = () => (
    <Seo title="About Tool Storage" />
)