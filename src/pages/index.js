import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import { TitleBox } from "../components/titlebox"
import { GoInfo, GoSearch, GoCommentDiscussion } from "react-icons/go";

import "../../global.scss"; // Import global styles

const IndexPage = () => {
  return (
    <Layout>
      <section className="hero-section d-flex flex-column" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Zentrierter Container mit TitleBox */}
        <div className="container py-md-5 d-flex align-items-center justify-content-center flex-grow-1">
          <TitleBox />
        </div>
        
        {/* Container mit Buttons am unteren Rand */}
        <div className="container pt-4 pb-2">
          <div className="row g-2 align-items-lg-stretch justify-content-center">
            <div className="col-10 col-sm-12 col-md-4">
              <div className="p-4 border rounded-3 h-100 item-box shadow-sm d-flex flex-column">
                <h3>About</h3>
                <p className="text-secondary flex-grow-1">Learn more about the DH Tool Registry and its role in the Kompetenzwerkstatt Digital Humanities.</p>
                <Link to="/about/" className="btn btn-primary icon-link icon-hover-link shadow-sm mt-auto align-self-start"><GoInfo /> About</Link>
              </div>
            </div>
            <div className="col-10 col-sm-12 col-md-4">
              <div className="p-4 border rounded-3 h-100 item-box shadow-sm d-flex flex-column">
                <h3>Search</h3>
                <p className="text-secondary flex-grow-1">Explore DH tools categorized by the TaDiRAH taxonomy.</p>
                <Link to="/list/" className="btn btn-primary icon-link icon-hover-link shadow-sm mt-auto align-self-start"><GoSearch /> Search</Link>
              </div>
            </div>
            <div className="col-10 col-sm-12 col-md-4">
              <div className="p-4 border rounded-3 h-100 item-box shadow-sm d-flex flex-column">
                <h3>Get Involved</h3>
                <p className="text-secondary flex-grow-1">Find out how you can help improve the quality of DH tool data in Wikidata.</p>
                <Link to="/get-involved/" className="btn btn-primary icon-link icon-hover-link shadow-sm mt-auto align-self-start"><GoCommentDiscussion /> Get Involved</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const Head = () => (
  <Seo />
)