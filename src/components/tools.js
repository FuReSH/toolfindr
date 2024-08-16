import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SearchBar from './searchbar';

const ToolsComponent = () => {
  const fetchedData = useStaticQuery(graphql`
  query {
    allSparqlTool {
      nodes {
        toolID
        toolLabel
        tadirahID
      }
    }
  }
  `);

  const data = fetchedData.allSparqlTool.nodes;

  const sortedData = data //data.sort((a, b) => a.toolLabel.localeCompare(b.toolLabel)); // Uncomment if data is not ordered by Sparql query

  console.log(sortedData);

   // Ensure data is an array before setting it as the initial state of filteredData
   const [search, setSearch] = useState('');
   const [filteredData, setFilteredData] = useState(sortedData);

   useEffect(() => {
    setFilteredData(
        sortedData.filter(item => 
            item.toolLabel.toLowerCase().includes(search.toLowerCase()) //||
            //item.tadirahID.toLowerCase().includes(search.toLowerCase())
        )
    );
}, [search, sortedData]);
 

   const regex = /\/([^\/]+)$/;

  return (
    <div>
    <SearchBar search={search} setSearch={setSearch} />
    <div className='my-2'>
        {filteredData.length} result{filteredData.length !== 1 && 's'} found.
    </div>
    <table className="table table-responsive-sm align-middle table-hover table-sm table-striped my-4">
        <thead>
          <tr>
            <th width="20%">Wikidata ID</th>
            <th width="30%">Tool Label</th>
            <th width="50%">TaDiRAH ID</th>
          </tr>
        </thead>
        <tbody className="table-group-divider ">
        {filteredData.map(item => (
          <tr key={item.toolID}>
            <td>
              <img width="50" src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg' />
              <br />
              <small><small>{item.toolID.match(regex)[1]}</small></small>
            </td>
            <td>
              <a href={item.toolID} target="_blank" rel="noopener noreferrer">{item.toolLabel}</a>
            </td>
            <td>
                {item.tadirahID}
            </td>
            <td> </td>
          </tr>
        ))}
        </tbody>
      </table>
      
      </div>  
  );
};


export default ToolsComponent;
