// ToolsCardComponent.jsc
import React from 'react';
import { Link } from 'gatsby';
import { GoTools, GoTag } from "react-icons/go";

import "../../global.scss"; // Import global styles

const ToolsCardComponent = ({ filteredData }) => {
  const regex = /\/([^/]+)$/;

  return (
    <div className="row g-4 mt-2 mb-4">
      {filteredData.map(item => (
        <div key={item.id} className="col-12 col-sm-4 col-md-4 col-lg-3">
          <div className="card h-100 bg-light shadow-sm item-box">
            <div className="card-header d-flex align-items-center justify-content-between">
              <div className='badge text-dark font-monospace border'>
                <img width="20" src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg' alt='Wikidata Logo' className="me-1" />
                {item._id.match(regex)[1]}
              </div>
              <GoTools className="icon-color-secondary" />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link to={`/tool/${item.slug}`} className='icon-link text-decoration-none stretched-link'>
                  {item.label}
                </Link>
              </h5>
              <div className="mt-auto">
                <div className="d-flex align-items-center mb-2">
                  <GoTag className="icon-color-secondary me-2" />
                  <small className="text-muted">Category (TaDiRAH)</small>
                </div>
                <p className="card-text fs-6 mb-0">
                  {item.concepts.map(concept => concept.label).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsCardComponent;