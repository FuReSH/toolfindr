import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from "../components/layout"
import { GoTools } from "react-icons/go";

const ToolTemplate = ({ data }) => {
  const tool = data.sparqlTool;

  return (
    <Layout>
    <div className="container my-4">
      <div className="row">
      <div className="col-xs-4 col-sm-10">
      <h1 className="card-title"><span className="pe-3"><GoTools /></span>Tool Info</h1>
      <p className="card-text my-2">Information about the tool stored on Wikidata.</p>
        </div>
      
      </div>
      <div className="row my-4">
        <div class="col-xs-4 col-sm-10">
      <div className="card p-4 bg-light">
        <div className="card-body">
          
          <div>
      <h2>{tool.toolLabel}</h2>
      <p>{tool.toolDesc}</p>
      <p>{tool.instanceOf}</p>
        <p>{tool.tadirahLabel}</p>
        <p>{tool.tadrirahID}</p>
        <p>{tool.image}</p>
        <p>{tool.sourceRepo}</p>
        <p>{tool.website}</p>
        <p>{tool.copyright}</p>
        <p>{tool.license}</p>

      {/* Add more fields as needed */}
    </div>
          </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
      <div className="col-xs-4 col-sm-5">
        <Link to="/list">Go back to Tools List</Link>
        </div>
      </div>
      
    </div>
  </Layout>
    
  );
};

export const query = graphql`
  query($id: String!) {
    sparqlTool(id: { eq: $id }) {  
      toolID
      toolLabel
      toolDesc
      instanceOf
      tadirahLabel
      tadrirahID
      image
      copyright
      license
      sourceRepo
      website
    }
  }
`;

export default ToolTemplate;