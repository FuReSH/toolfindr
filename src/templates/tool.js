import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from "../components/layout";
import BackButton from '../components/backbutton';
import { GoTools, GoPencil } from "react-icons/go";
import BuildTime from '../components/buildtime';

const ToolTemplate = ({ data }) => {
  const tool = data.wikidataTadirahTool;

  return (
    <Layout>
      <div className="container my-4">
        <div className="row">
          <div className="col-12">
            <h1><span className="pe-3"><GoTools /></span>Tool Info</h1>
            <p className='kdh-short-desc'>Information about the tool retrieved from Wikidata.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="card bg-light shadow-sm">
              <div className="card-header ps-3">{tool.instanceOfLabels?.join(', ')}</div>
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="card-title">{tool.toolLabel}</h2>
                    
                    <label htmlFor="toolDesc" className='col-form-label-sm'>Description</label>
                    <p id="toolDesc">{tool.toolDesc || 'No description available.'}</p>

                    <label htmlFor="website" className='col-form-label-sm'>Website</label>
                    <p id="website">
                      {tool.websites?.length > 0 ? (
                        tool.websites.map((url, index) => (
                          <span key={index} className="d-block">
                            <a href={url.trim()}>{url.trim()}</a>
                          </span>
                        ))
                      ) : "No website information available."}
                    </p>

                    <label htmlFor="sourceRepo" className='col-form-label-sm'>Source Repository</label>
                    <p id="sourceRepo">
                      {tool.sourceRepos?.length > 0 ? (
                        tool.sourceRepos.map((url, index) => (
                          <span key={index} className="d-block">
                            <a href={url.trim()}>{url.trim()}</a>
                          </span>
                        ))
                      ) : "No source repo information available."}
                    </p>

                    <div className="row">
                      <div className="col-md-3">
                        <label htmlFor="copyright" className='col-form-label-sm'>Copyright</label>
                        <p id="copyright">{tool.copyright || 'No copyright information.'}</p>
                      </div>
                      <div className="col-md-9">
                        <label htmlFor="license" className='col-form-label-sm'>License</label>
                        <p id="license">{tool.license || 'No license information.'}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <label htmlFor="wikidataID" className='col-form-label-sm'>Wikidata ID</label>
                        <p id="wikidataID">
                          {tool.toolID?.match(/Q\d+/)?.[0]}
                        </p>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="tadirah" className='col-form-label-sm'>TaDiRAH</label>
                        <p id="tadirah">
                          {tool.tadirahID.length > 0 ? (
                            tool.tadirahID.map((id, index) => (
                              <span key={index} className="d-block">
                                <a href={id.trim()}>
                                  {tool.tadirahLabel?.[index]?.trim()}
                                </a>
                              </span>
                            ))
                          ) : "No TaDiRAH information available."}
                        </p>
                      </div>
                      <div className="col-md-3 overflow-x-visible">
                        <label htmlFor="collection" className='col-form-label-sm'>Collection</label>
                        <p id="collection">
                          {tool.collectionLabels?.join(', ') || 'No collection information available.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 text-center">
                    <img 
                      className="img-fluid" 
                      src={tool.image || "/images/tool-dummy.png"} 
                      onError={(e) => { e.target.src = "/images/tool-dummy.png" }} 
                      alt={tool.toolLabel || 'No Image'} 
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <strong className="h5"><GoPencil /> Enhance the Tool Info</strong>
            <hr />
            <p className='fs-6'>Help us to improve the information about this tool by editing the Wikidata entry.</p>
            <p className='fs-6'>Need help getting started with editing data in Wikidata? Then start <Link to='/explore'>here</Link>.</p>
            <div className="alert alert-info shadow-sm">
              <p className='fs-6'>We recommend that you use your own Wikimedia account for editing on Wikidata. Otherwise, your current IP address will be saved and published as an editor.</p>
            </div>
            <a 
              href={tool.toolID}
              target="_blank" 
              rel="noreferrer"
              className="btn btn-primary shadow-sm"
            >
              Edit on Wikidata
            </a>
          </div>
        </div>

        <BuildTime />
        <BackButton gotolink="/list" goto="Back to list" />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    wikidataTadirahTool(id: { eq: $id }) {  
      toolID
      toolLabel
      toolDesc
      instanceOfLabels
      tadirahLabel
      tadirahID
      image
      copyright
      license
      sourceRepos
      websites
    }
  }
`;

export default ToolTemplate;
