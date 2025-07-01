import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from "../../components/layout";
import BackButton from '../../components/backbutton';
import { GoTools, GoPencil, GoTag, GoRepo, GoHome, GoNote, GoDatabase, GoLog, GoInfo, GoLinkExternal, GoVersions, GoAlertFill } from "react-icons/go";
import { LiaCopyrightSolid } from "react-icons/lia";
import BuildTime from '../../components/buildtime';
import { useCommonsImageInfo } from '../../hooks/use-commons-image-info';

export default function ToolPage({ data }) {
  const { researchTool } = data

  // Logo bevorzugen, falls vorhanden, sonst erstes Bild
  const pic = researchTool.logo && researchTool.logo.length > 0
    ? researchTool.logo[0]
    : (researchTool.image && researchTool.image.length > 0 ? researchTool.image[0] : null);

  const { url, author, license, licenseUrl, descUrl, loading } = useCommonsImageInfo(pic);
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
          <div className="col-12 col-sm-12 col-md-8 col-lg-9">
            <h1><span className="pe-3"><GoTools className="icon-color-secondary" /></span>Tool Info</h1>
            <p className='kdh-short-desc'>Information about the Tool retrieved from Wikidata.</p>

            <div className="card bg-light shadow-sm">
              <div className="card-header ps-3">{researchTool.instancesof.join(', ')}</div>
              <div className="clearfix card-body p-3">
                <div className="position-relative">
                  {/* Spinner for loading status */}
                  {loading && (
                    <div className="spinner-grow spinner-grow-sm float-end m-3 text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>
                <div className="col-7 col-sm-6 col-md-4 col-lg-3 float-md-end float-lg-end mx-auto ms-md-3 my-3">
                  {!imageError ? (
                    <figure className="figure">
                      {/* 🛑 Don't replace with GatsbyImage as the plugin does not support svg formats 
                        use "withPrefix" as recommended in gatsby issue on GitHub https://github.com/gatsbyjs/gatsby/issues/21975#issuecomment-650573201 */}
                      <img
                        className="figure-img img-fluid"
                        src={url}
                        onLoad={() => loading}
                        onError={(e) => {
                          setImageError(true);
                          console.error(e);
                        }}
                        alt={loading ? "" : `${researchTool.label} Logo` || "No image available"}
                      />
                      {license !== "Unknown" && researchTool.logo && (
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
                        <GoAlertFill className='flex-shrink-0 me-2 icon-color-secondary' />
                        <p className="alert-heading fw-bold mb-0">Oops!</p>
                      </div>
                      <p className='mb-0'>There seems to be a problem with the image on Wikimedia Commons.</p>
                      <hr />
                      <p className='mb-0'>If you want to fix it: Please check the browser console for more details about the error and fix it directly in Commons if necessary. Follow the first link in the credits.</p>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="card-title d-inline">{researchTool.label} </h2>
                  <div className="badge bg-body-secondary text-dark font-monospace align-top">
                    <img width="30" src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg' alt='Wikidata Logo' />
                    {researchTool._id.match(/Q\d+/)?.[0]}
                  </div>
                </div>
                <hr />

                <div className='mt-2'><GoNote className='icon-color-secondary'/>
                  <label htmlFor="toolDesc" className='col-form-label-sm text-uppercase fw-bold ms-1'>Description</label>
                  <p id="toolDesc">{researchTool.description || "No description information availabe."}</p></div>

                <div><GoHome className='icon-color-secondary' />
                  <label htmlFor="website" className='col-form-label-sm text-uppercase fw-bold ms-1'>Website</label>
                  <p id="website">
                    {Array.isArray(researchTool.website) ? researchTool.website.map((url, index) => (
                      <span key={index} className="d-block">
                        <a href={url.trim()} target='_blank' rel="noopener noreferrer" className='icon-link icon-link-hover'>{url.trim()} <GoLinkExternal /></a>
                      </span>))
                      : "No website information available."
                    }
                  </p></div>

                <div>
                  <GoRepo className='icon-color-secondary' />
                  <label htmlFor="repository" className='col-form-label-sm text-uppercase fw-bold ms-1'>Source Code Repository</label>
                  <p id="repository">
                    {researchTool.repository ? researchTool.repository.map((url, index) => (
                      <span key={index} className="d-block">
                        <a href={url.trim()} target='_blank' rel="noopener noreferrer" className='icon-link icon-link-hover'>{url.trim()} <GoLinkExternal /></a>
                      </span>))
                      : "No source repository information available."
                    }
                  </p>
                </div>

                <div className='row'>
                  <div className='col-sm-auto'>
                    <GoVersions className='icon-color-secondary' />
                    <label htmlFor="version" className='col-form-label-sm text-uppercase fw-bold ms-1'>Current Version</label>
                    <p id="version">
                      {researchTool.version ? researchTool.version.map((version, index) => (
                        <span key={index} className="d-block">
                          {version}
                        </span>))
                        : "No version information available."
                      }
                    </p>
                  </div>
                  <div className='col-sm-auto'>

                    <LiaCopyrightSolid className='icon-color-secondary' />
                    <label htmlFor="copyright" className='col-form-label-sm text-uppercase fw-bold ms-1'>Copyright</label>
                    <p id="copyright">{researchTool.copyright || "No copyright information available."}</p>
                  </div>

                  <div className='col-sm-auto'>
                    <GoLog className='icon-color-secondary' />
                    <label htmlFor="license" className='col-form-label-sm text-uppercase fw-bold ms-1'>License</label>
                    <p id="license">
                      {researchTool.license ? researchTool.license.map((license, index) => (
                        <span key={index} className="d-block">
                          {license}
                        </span>))
                        : "No license information available."
                      }
                    </p>
                  </div>

                </div>

                <div className="row">
                  <div className="col-sm-auto">
                    <GoTag className='icon-color-secondary' />
                    <label htmlFor="tadirah" className='col-form-label-sm text-uppercase fw-bold ms-1'>Category</label>
                    <p id="tadirah">
                      {researchTool.concepts.map((concept, index) => (
                        <span key={index} className="d-block">
                          <a href={concept._id.trim()} target='_blank' rel="noopener noreferrer" className='icon-link icon-link-hover'>
                            {concept.label.trim()} <GoLinkExternal />
                          </a>
                        </span>
                      ))}
                    </p>
                  </div>
                  {/*<div className="col-sm-auto">
                        <GoDatabase />
                        <label htmlFor="collection" className='col-form-label-sm text-uppercase fw-bold ms-1'>Collection</label>
                        <p id="collection">
                          {researchTool.collectionLabels?.join(', ') || "No collection information available."}
                        </p>
                      </div>*/}
                </div>
              </div>
            </div>
            <BuildTime />
          </div>
          {/* Rechte Spalte */}
          <div className="col-12 col-sm-12 col-md-4 col-lg-3 mt-4 mt-md-0">
            <div>
              <h5><GoPencil className='icon-color-secondary' /> Enhance the Tool Data</h5>
              <hr />
              <p className='fs-6'>Help us to improve the information about this researchTool.by editing the Wikidata item.</p>
              <p className='fs-6'>Need help getting started with editing data in Wikidata? Then start <Link to='/get-involved' className='icon-link'>here</Link>.</p>
              <div className="alert alert-info shadow-sm">
                <p className='fs-6'>We recommend that you use your own Wikimedia account for editing on Wikidata. Otherwise, your current IP address will be saved and published as an editor.</p>
              </div>
              <a
                href={researchTool._id}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary shadow-sm icon-link icon-link-hover"
              >
                Edit on Wikidata <GoLinkExternal />
              </a>
            </div>
            <div className="mt-5">
              <h5><GoInfo className='icon-color-secondary' /> About the Tool Data</h5>
              <hr />
              <p className="fs-6">All metadata for the researchTool.in the box comes from Wikidata as the data source. The image including credits are obtained directly from Commons.</p>
              <p className="fs-6">
                Please note that you will only see selected properties for the researchTool.here. For complete information, please refer to the Wikidata Linked Data Interface. Simply click on the ‘Edit on Wikidata’ button.</p>

            </div>


          </div>
        </div>
        <BackButton gotolink="/list" goto="Back to list" />
      </div>
    </Layout>
  );
}

export const Head = ({ data }) => (
  <>
    <title>{data.researchTool.label} | ToolFindr</title>
  </>
)

export const query = graphql`
  query ToolPage($slug: String!) {
    researchTool(slug: { eq: $slug }) {
      _id
      concepts {
        _id
        label
      }
      label
      description
      image
      logo
      repository
      version
      copyright
      instancesof
      website
      license
    }
  }
`