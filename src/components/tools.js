import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SearchBar from './searchbar';
import AlphabetFilter from './alphabetfilter';
import Pagination from './pagination';

const ToolsComponent = ({ conceptsFilter }) => {
  const fetchedData = useStaticQuery(graphql`
    query {
      allWikidataTadirahTool {
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

  const data = fetchedData.allWikidataTadirahTool.nodes;
  const sortedData = data.sort((a, b) => a.toolLabel.localeCompare(b.toolLabel));

  const [search, setSearch] = useState('');
  const [alphabetFilter, setAlphabetFilter] = useState('');
  const [filteredData, setFilteredData] = useState(sortedData);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setFilteredData(
      sortedData.filter(item => {
        const matchesSearch = item.toolLabel.toLowerCase().includes(search.toLowerCase());
        const matchesAlphabet = alphabetFilter ? item.toolLabel.startsWith(alphabetFilter) : true;
        const matchesConcepts = 
          conceptsFilter.length > 0 
            ? conceptsFilter.some(concept => {
                const tadirahLabels = Array.isArray(item.tadirahLabel) ? item.tadirahLabel : [];
                return tadirahLabels.some(label => label.toLowerCase().includes(concept.toLowerCase()));
              })
            : true;

        return matchesSearch && matchesAlphabet && matchesConcepts;
      })
    );
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [search, alphabetFilter, conceptsFilter, sortedData]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const regex = /\/([^\/]+)$/;

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      <AlphabetFilter alphabetFilter={alphabetFilter} setAlphabetFilter={setAlphabetFilter} />

      <div className='my-2'>
        {filteredData.length} result{filteredData.length !== 1 && 's'} found.
      </div>

      <table className="table table-responsive-sm table-sm shadow-sm align-middle table-hover table-striped rounded-3 my-4">
        <thead>
          <tr>
            <th width="20%">Wikidata ID</th>
            <th width="30%">Tool Label</th>
            <th width="50%">TaDiRAH Label</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {paginatedData.map(item => (
            <tr key={item.toolID}>
              <td>
                <img width="50" src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg' alt='Wikidata Logo' />
                <br />
                <small><small>{item.toolID.match(regex)[1]}</small></small>
              </td>
              <td>
                <a href={`/tool/${item.id}`}>{item.toolLabel}</a>
              </td>
              <td>
                {Array.isArray(item.tadirahLabel) ? item.tadirahLabel.join(', ') : 'No labels'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination component */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default ToolsComponent;
