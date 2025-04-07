import React, { useState } from 'react';
import { Link } from 'gatsby';
import Layout from "../components/layout";
import BackButton from '../components/backbutton';
import { GoTools, GoPencil, GoTag, GoRepo, GoHome, GoNote, GoDatabase, GoLog, GoInfo, GoLinkExternal, GoVersions, GoAlertFill } from "react-icons/go";
import { LiaCopyrightSolid } from "react-icons/lia";
import BuildTime from '../components/buildtime';
import { useCommonsImageInfo } from '../hooks/use-commons-image-info';


const ToolTemplate = ({ pageContext }) => {
  const { tool } = pageContext;
  const { url, author, license, licenseUrl, descUrl, loading } = useCommonsImageInfo(tool.image);

  const [imageError, setImageError] = useState(false);

  return (
    <Layout>
      <div className="container mt-4">
        {/* Hauptbereich mit drei Spalten */}
        <div className="row">
          {/* Linke Spalte für tba 
          <div className="col-sm-1">
          </div>*/}

          {/* Mittlere Spalte mit dem Hauptinhalt */}
          <div className="col-sm-9">
            <h1><span className="pe-3"><GoTools /></span>Tool Info</h1>
            <p className='kdh-short-desc'>Information about the tool retrieved from Wikidata.</p>

            <div className="card bg-light shadow-sm">
              <div className="card-header ps-3">{tool.instanceOfLabels?.join(', ')}</div>
              <div className="clearfix card-body p-3">
                <div className="position-relative">
                  {/* Spinner for loading status */}
                  {loading && (
                    <div className="spinner-grow spinner-grow-sm float-end m-3 text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>
                <div className="col-sm-3 float-sm-end ms-sm-3">
                  {!imageError ? (
                    <figure className="figure">
                      {/* 🛑 Don't replace with GatsbyImage as the plugin does not support svg formats 
                    use "withPrefix" as recommended in gatsby issue on GitHub https://github.com/gatsbyjs/gatsby/issues/21975#issuecomment-650573201 */}
                      <img
                        className="figure-img img-fluid mb-2"
                        src={url}
                        width="100%"
                        onLoad={() => loading}
                        onError={(e) => {
                          setImageError(true);
                          console.error(e);
                        }}
                        alt={loading ? "" : `${tool.toolLabel} Logo` || "No image available"}
                      />
                      {license !== "Unknown" && tool.image && (
                        <figcaption className="figure-caption" style={{ borderTop: "1.5px dotted #ccc" }}>
                          <small>
                            <strong>CREDIT </strong>
                            <a href={descUrl} target="_blank" rel="noopener noreferrer" className='icon-link icon-link-hover'>
                              {author}
                            </a>
                            {" | "}
                            {licenseUrl !== '#' ? (
                              <a href={licenseUrl} target="_blank" rel="noopener noreferrer" className='icon-link icon-link-hover'>
                                {license}
                              </a>
                            ) : (
                              <span>{license}</span>
                            )}
                            {" | via Wikimedia Commons"}
                          </small>
                        </figcaption>
                      )}
                    </figure>
                  ) : (
                    <div className="alert alert-danger fs-6" role="alert">
                      <div className="d-flex align-items-center">
                        <GoAlertFill className='flex-shrink-0 me-2' />
                        <p className="alert-heading fw-bold mb-0">Oops!</p>
                      </div>
                      <p className='mb-0'>There seems to be a problem with the image on Wikimedia Commons.</p>
                      <hr />
                      <p className='mb-0'>If you want to fix it: Please check the browser console for more details about the error and fix it directly in Commons if necessary. Follow the first link in the credits.</p>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="card-title d-inline">{tool.toolLabel} </h2>
                  <div className="badge bg-body-secondary text-dark font-monospace align-top">
                    <img width="30" src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg' alt='Wikidata Logo' />
                    {tool.toolID.match(/Q\d+/)?.[0]}
                  </div>
                </div>
                <hr />

                <div className='mt-2'><GoNote />
                  <label htmlFor="toolDesc" className='col-form-label-sm text-uppercase fw-bold ms-1'>Description</label>
                  <p id="toolDesc">{tool.toolDesc}</p></div>

                <div><GoHome />
                  <label htmlFor="website" className='col-form-label-sm text-uppercase fw-bold ms-1'>Website</label>
                  <p id="website">
                    {Array.isArray(tool.websites) ? tool.websites.map((url, index) => (
                      <span key={index} className="d-block">
                        <a href={url.trim()} target='_blank' rel="noopener noreferrer" className='icon-link icon-link-hover'>{url.trim()} <GoLinkExternal /></a>
                      </span>))
                      : "No website information available."
                    }
                  </p></div>

                <div>
                  <GoRepo />
                  <label htmlFor="sourceRepo" className='col-form-label-sm text-uppercase fw-bold ms-1'>Source Repository</label>
                  <p id="sourceRepo">
                    {tool.sourceRepos ? tool.sourceRepos.map((url, index) => (
                      <span key={index} className="d-block">
                        <a href={url.trim()} target='_blank' rel="noopener noreferrer" className='icon-link icon-link-hover'>{url.trim()} <GoLinkExternal /></a>
                      </span>))
                      : "No source repository information available."
                    }
                  </p>
                </div>

                <div className='row'>
                  <div className='col-sm-auto'>

                    <GoVersions />
                    <label htmlFor="currentVersion" className='col-form-label-sm text-uppercase fw-bold ms-1'>Current Version</label>
                    <p id="currentVersion">
                      <span className="d-block">
                        {tool.currentVersion || "No version information available."}
                      </span>
                    </p>
                  </div>
                  <div className='col-sm-auto'>

                    <LiaCopyrightSolid />
                    <label htmlFor="copyright" className='col-form-label-sm text-uppercase fw-bold ms-1'>Copyright</label>
                    <p id="copyright">{tool.copyright || "No copyright information available."}</p>
                  </div>

                  <div className='col-sm-auto'>
                    <GoLog />
                    <label htmlFor="license" className='col-form-label-sm text-uppercase fw-bold ms-1'>License</label>
                    <p id="license">{tool.license || "No license information available."}</p>
                  </div>

                </div>

                <div className="row">
                  <div className="col-sm-auto">
                    <GoTag />
                    <label htmlFor="tadirah" className='col-form-label-sm text-uppercase fw-bold ms-1'>Category</label>
                    <p id="tadirah">
                      {tool.tadirah.map((concept, index) => (
                        <span key={index} className="d-block">
                          <a href={concept.tadirahID.trim()} target='_blank' rel="noopener noreferrer" className='icon-link icon-link-hover'>
                            {concept.tadirahLabel.trim()} <GoLinkExternal />
                          </a>
                        </span>
                      ))}
                    </p>
                  </div>
                  {/*<div className="col-sm-auto">
                    <GoDatabase />
                    <label htmlFor="collection" className='col-form-label-sm text-uppercase fw-bold ms-1'>Collection</label>
                    <p id="collection">
                      {tool.collectionLabels?.join(', ') || "No collection information available."}
                    </p>
                  </div>*/}
                </div>
              </div>
            </div>
            <BuildTime />
          </div>
          {/* Rechte Spalte */}
          <div className="col-sm-3">
            <div>
              <h5><GoPencil /> Enhance the Tool Data</h5>
              <hr />
              <p className='fs-6'>Help us to improve the information about this tool by editing the Wikidata item.</p>
              <p className='fs-6'>Need help getting started with editing data in Wikidata? Then start <Link to='/get-involved' className='icon-link'>here</Link>.</p>
              <div className="alert alert-info shadow-sm">
                <p className='fs-6'>We recommend that you use your own Wikimedia account for editing on Wikidata. Otherwise, your current IP address will be saved and published as an editor.</p>
              </div>
              <a
                href={tool.toolID}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary shadow-sm icon-link icon-link-hover"
              >
                Edit on Wikidata <GoLinkExternal />
              </a>
            </div>
            <div className="mt-5">
              <h5><GoInfo /> About the Tool Data</h5>
              <hr />
              <p className="fs-6">All metadata for the tool in the box comes from Wikidata as the data source. The image including credits are obtained directly from Commons.</p>
              <p className="fs-6">
                Please note that you will only see selected properties for the tool here. For complete information, please refer to the Wikidata Linked Data Interface. Simply click on the ‘Edit on Wikidata’ button.</p>

            </div>


          </div>
        </div>
        <BackButton gotolink="/list" goto="Back to list" />
      </div>
    </Layout>
  );
};

export default ToolTemplate;