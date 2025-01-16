import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SearchBar from './searchbar';
import AlphabetFilter from './alphabetfilter';

const ToolsComponent = ({ conceptsFilter }) => {
  const fetchedData = useStaticQuery(graphql`
    query {
      allSparqlTool {
        nodes {
          id
          toolID
          toolLabel
          tadirahID
          tadirahLabel
        }
      }
    }
  `);

  const data = fetchedData.allSparqlTool.nodes;

  const sortedData = data.sort((a, b) => a.toolLabel.localeCompare(b.toolLabel));

  const [search, setSearch] = useState('');
  const [alphabetFilter, setAlphabetFilter] = useState('');
  const [filteredData, setFilteredData] = useState(sortedData);

  useEffect(() => {
    console.log("Concepts Filter:", conceptsFilter);
    sortedData.forEach(item => {
      const tadirahLabels = item.tadirahLabel 
        ? item.tadirahLabel.split(',').map(label => label.trim()) 
        : [];
      console.log("Tool:", item.toolLabel, "TaDiRAH Labels (as array):", tadirahLabels);
    });
  
    setFilteredData(
      sortedData.filter(item => {
        const matchesSearch = item.toolLabel.toLowerCase().includes(search.toLowerCase());
        const matchesAlphabet = alphabetFilter ? item.toolLabel.startsWith(alphabetFilter) : true;
        const matchesConcepts = 
          conceptsFilter.length > 0 
            ? conceptsFilter.some(concept => {
                const tadirahLabels = item.tadirahLabel
                  ? item.tadirahLabel.split(',').map(label => label.trim())
                  : [];
                return tadirahLabels.some(label => label.toLowerCase().includes(concept.toLowerCase()));
              })
            : true;
  
        return matchesSearch && matchesAlphabet && matchesConcepts;
      })
    );
  }, [search, alphabetFilter, conceptsFilter, sortedData]);
  
  

  const regex = /\/([^\/]+)$/;

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      <AlphabetFilter alphabetFilter={alphabetFilter} setAlphabetFilter={setAlphabetFilter} />

      <div className='my-2'>
        {filteredData.length} result{filteredData.length !== 1 && 's'} found.
      </div>
      
      <table className="table table-responsive-sm align-middle table-hover table-sm table-striped my-4">
        <thead>
          <tr>
            <th width="20%">Wikidata ID</th>
            <th width="30%">Tool Label</th>
            <th width="50%">TaDiRAH Label</th>
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
                <a href={`/tool/${item.id}`}>{item.toolLabel}</a>
              </td>
              <td>
                {item.tadirahLabel}
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
