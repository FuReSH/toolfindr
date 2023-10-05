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

  console.log(data);

   // Ensure data is an array before setting it as the initial state of filteredData
   const [search, setSearch] = useState('');
   const [filteredData, setFilteredData] = useState(data);

   useEffect(() => {
    setFilteredData(
        data.filter(item => 
            item.toolLabel.toLowerCase().includes(search.toLowerCase()) ||
            item.tadirahID.toLowerCase().includes(search.toLowerCase())
        )
    );
}, [search, data]);
 

   const regex = /\/([^\/]+)$/;

  return (
    <div>
    <SearchBar search={search} setSearch={setSearch} />
    <div className='my-2'>
        {filteredData.length} result{filteredData.length !== 1 && 's'} found.
    </div>
    <table className="table table-responsive align-middle table-hover my-4">
        <thead>
          <tr>
            <th scope="col"> </th>
            <th scope="col">Tool Label</th>
            <th scope="col">TaDiRAH ID</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map(item => (
          <tr key={item.toolID}>
            <td>
              <img width="50" src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg' />
              <br />
              <small><small><small>{item.toolID.match(regex)[1]}</small></small></small>
            </td>
            <td>
              <a href={item.toolID} target="_blank" rel="noopener noreferrer">{item.toolLabel}</a>
            </td>
            <td>
              <a href={item.tadirahID} target="_blank" rel="noopener noreferrer">
                {item.tadirahID}
              </a>
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




