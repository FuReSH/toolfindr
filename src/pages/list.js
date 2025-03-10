import * as React from "react";
import { useState } from "react";
import ToolsComponent from "../components/tools";
import Layout from "../components/layout";
import { Seo } from "../components/seo";
import { GoSearch } from "react-icons/go";
import Concepts from "../components/concepts";
import BackButton from "../components/backbutton";
import BuildTime from "../components/buildtime";

const ToolsPage = () => {
  const [conceptsFilter, setConceptsFilter] = useState([]);

  return (
    <Layout>
      <div className="container my-4">
        <div className="row">
          <div className="col-sm-8">
            <h1>
              <span className="pe-3">
                <GoSearch />
              </span>
              Tools
            </h1>
            <p className="kdh-short-desc">Search for DH tools classified with the TaDiRAH taxonomy.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            <ToolsComponent conceptsFilter={conceptsFilter} />
          </div>
          <div className="col-sm-3">
            <Concepts onConceptsChange={setConceptsFilter} />
          </div>
        </div>
        <BuildTime />
        <BackButton />
      </div>
    </Layout>
  );
};

export default ToolsPage;

export const Head = () => <Seo title="List tools" />;

