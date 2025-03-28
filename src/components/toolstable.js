// ToolsTableComponent.js
import React from 'react';
import { Link } from 'gatsby';
import { GoTools, GoTag } from "react-icons/go";

import "./toolstable.scss"

const ToolsTableComponent = ({ filteredData }) => {
  const regex = /\/([^\/]+)$/;

  return (
    <div>
      <table className="table toolstable table-responsive align-middle mt-4">
        <thead>
          <tr>
            <th width="20%" className="pb-2 text-align-middle"></th>
            <th width="30%" className="pb-2 text-align-middle"><GoTools /> Tool</th>
            <th width="50%" className="pb-2 text-align-middle"><GoTag /> Category <span className='text-muted'>(TaDiRAH)</span></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {filteredData.map(item => (
            <tr key={item.toolID}>
              <td className='p-2'>
                <div className='badge bg-light text-dark font-monospace'>
                <img width="25" src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg' alt='Wikidata Logo' />
                {item.toolID.match(regex)[1]}
                </div>
              </td>
              <td>
                <h5><Link to={`/tool/${item.id}`} className='icon-link'>{item.toolLabel}</Link></h5>
              </td>
              <td className="fs-6">
                {item.tadirah.map(concept => concept.tadirahLabel).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToolsTableComponent;
