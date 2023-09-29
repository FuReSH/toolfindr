import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SearchBar from './searchbar';

const ToolsComponent = () => {
  const fetchedData = useStaticQuery(graphql`
    query {
      allItemData {
        nodes {
          item
          itemLabel
          p973Value
        }
      }
    }
  `);

  const data = fetchedData.allItemData.nodes;

  console.log(data);

   // Ensure data is an array before setting it as the initial state of filteredData
   const [search, setSearch] = useState('');
   const [filteredData, setFilteredData] = useState(Array.isArray(data) ? data : []);
 
   useEffect(() => {
     // Ensure data is an array before using it in useEffect
     if (Array.isArray(data)) {
       setFilteredData(
         data.filter(item => 
           item.itemLabel.toLowerCase().includes(search.toLowerCase())
         )
       );
     }
   }, [search, data]); 

   const regex = /\/([^\/]+)$/;

  return (
    <div>
    <SearchBar search={search} setSearch={setSearch} />
    <table className="table table-responsive align-middle table-hover my-4">
        <thead>
          <tr>
            <th scope="col"> </th>
            <th scope="col">Label</th>
            <th scope="col">TAPOR URI</th>
            <th scope="col">SSHOC Marketplace URI</th>
            <th scope="col">TaDiRAH ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
                      <tr key={item.item}>
                        <td>
                          <img width="50" src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg' />
                          <br />
                          <small><small><small>{item.item.match(regex)[1]}</small></small></small>
                        
                        </td>
                        <td><a href={item.item} target="_blank" rel="noopener noreferrer">{item.itemLabel}</a></td>
                        <td>
                        <a href={item.p973Value[0]} target="_blank" rel="noopener noreferrer">
                          {item.p973Value[0]}
                        </a>
                        </td>
                        <td>
                        <a href={item.p973Value[1]} target="_blank" rel="noopener noreferrer">
                          {item.p973Value[1]}
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




