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
        <div className="col-xs-4 col-sm-2">
        <div class="bd-toc mt-3 mb-5 my-lg-0 mb-lg-5 px-sm-1 text-body-secondary">
          <button class="btn btn-link p-md-0 mb-2 mb-md-0 text-decoration-none bd-toc-toggle d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#tocContents" aria-expanded="false" aria-controls="tocContents">
            TaDiRAH ID
          </button>
          <strong class="d-none d-md-block h6 my-2 ms-3">TaDiRAH ID (to be completed)</strong>
          <hr class="d-none d-md-block my-2 ms-3" />
          <div class="bd-toc-collapse" id="tocContents">
            <nav id="TableOfContents">
            
  <ul>
    <li><a href="#example" class="">Analyzing</a>
    <ul>
        <li><a href="#variables" class="">Content Analysis</a></li>
        <li><a href="#sass-variables" class="">Network Analysis</a></li>
        <ul>
        <li><a href="#variables" class="">...</a></li>
        <li><a href="#sass-variables" class="">...</a></li>
      </ul>
      </ul></li>
    <li><a href="#dividers" class="">Capturing</a>
    <ul>
        <li><a href="#variables" class="">Converting</a></li>
        <li><a href="#sass-variables" class="">Transcribing</a></li>
        <ul>
        <li><a href="#variables" class="">...</a></li>
        <li><a href="#sass-variables" class="">...</a></li>
      </ul>
      </ul>
    
    </li>
    <li><a href="#accessibility" class="">Creating</a></li>
    <li><a href="#css" class="">Disseminating</a>
    <li><a href="#variables" class="">Enriching</a></li>
        <li><a href="#sass-variables" class="">Interpreting</a></li>
      <ul>
        <li><a href="#variables" class="">...</a></li>
        <li><a href="#sass-variables" class="">...</a></li>
        <ul>
        <li><a href="#variables" class="">...</a></li>
        <li><a href="#sass-variables" class="">...</a></li>
      </ul>
      </ul>
    </li>
  </ul>
</nav>
        </div>
          </div>
      </div>
      <div className="row my-3">
      <div className="col-xs-4 col-sm-5">
        <Link to="/">Go back to Home</Link>
        </div>
      </div>
      </div>
    </div>
  </Layout>
)

export default ToolsPage

export const Head = () => (
    <Seo title="List tools" />
)
