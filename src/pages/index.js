import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import { TitleBox } from "../components/titlebox"
import { GoInfo, GoSearch, GoPencil, GoCommentDiscussion } from "react-icons/go";

const IndexPage = () => (
  <Layout>
    <section className="py-4">
      <div className="container">
        <TitleBox />
      </div>
      <div className="container">
      <div className="row g-2 align-items-lg-stretch">
        <div className="col-md-4">
          <div className="h-100 p-4 bg-light border rounded-3 shadow-sm">
            <h2>About</h2>
            <p>Find information about the DH Tool Registry and how it is used in the Kompetenzwerkstatt Digital Humanities.</p>
            <Link to="/about/" className="btn btn-primary icon-link icon-hover-link shadow-sm"><GoInfo /> About</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="h-100 p-4 bg-light border rounded-3 shadow-sm">
            <h2>Search</h2>
            <p>Search for DH tools that are categorised according to the TaDiRAH taxonomy.</p>
            <Link to="/list/" className="btn btn-primary icon-link icon-hover-link shadow-sm"><GoSearch /> Search</Link>
          </div>
        </div>
       
        <div className="col-md-4">
          <div className="h-100 p-4 bg-light border rounded-3 shadow-sm">
            <h2>Get Involved</h2>
            <p>Learn how you can contribute to continuously improving the data quality of DH tools in Wikidata.</p>
            <Link to="/get-involved/" className="btn btn-primary icon-link icon-hover-link shadow-sm"><GoCommentDiscussion /> Get Involved</Link>
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

/*<div className="col-md-4">
<div className="h-100 p-5 bg-light border rounded-3">
  <h2>Edit Tool</h2>
  <p>Add new or edit existing DH tools to Wikidata.</p>
  <Link to="/edit/" className="btn btn-outline-primary"><GoPencil /> Edit</Link>
</div>
</div>*/