import React, { useState, useEffect, useMemo, useCallback } from "react";
import ToolsTableComponent from "../components/toolstable";
import Layout from "../components/layout";
import { Seo } from "../components/seo";
import { GoSearch } from "react-icons/go";
import Concepts from "../components/concepts";
import BuildTime from "../components/buildtime";
import ResetFilters from "../components/resetfilters";
import SearchBar from "../components/searchbar";
import AlphabetFilter from "../components/alphabetfilter";
import Pagination from "../components/pagination";
import { useStaticQuery, graphql } from "gatsby";
import BackButton from "../components/backbutton";
import useIsBrowser from "../hooks/use-is-browser";


const ToolsPage = () => {
  
  const isBrowser = useIsBrowser();
  
  const storedFilters = useMemo(() => {
    // do a browser environment check
    if (isBrowser) {
      const stored = sessionStorage.getItem("searchFilters");
      return stored ? JSON.parse(stored) : { search: '', alphabetFilter: '', conceptsFilter: [], currentPage: 1 };
    }
    return { search: '', alphabetFilter: '', conceptsFilter: [], currentPage: 1 };
  }, []);
  

  const [search, setSearch] = useState(storedFilters.search);
  const [alphabetFilter, setAlphabetFilter] = useState(storedFilters.alphabetFilter);
  const [conceptsFilter, setConceptsFilter] = useState(storedFilters.conceptsFilter);
  const [currentPage, setCurrentPage] = useState(storedFilters.currentPage);
  const [selectedOptions, setSelectedOptions] = useState([]); // Zustand für das Select-Feld

  const handleConceptsChange = useCallback((newConcepts) => {
    setConceptsFilter(newConcepts);
  }, []);

  const fetchedData = useStaticQuery(graphql`
    query {
      allWikidataTadirahTool {
        nodes {
          id
          toolID
          toolLabel
          tadirah {
            tadirahID
            tadirahLabel
          }
        }
      }
    }
  `);

  const data = fetchedData.allWikidataTadirahTool.nodes;
  const sortedData = data.sort((a, b) => a.toolLabel.localeCompare(b.toolLabel));

  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      const matchesSearch = item.toolLabel.toLowerCase().includes(search.toLowerCase());
      const matchesAlphabet = alphabetFilter ? item.toolLabel.startsWith(alphabetFilter) : true;
      const matchesConcepts =
        conceptsFilter.length > 0
          ? conceptsFilter.some(concept => {
            const tadirahLabels = Array.isArray(item.tadirah)
              ? item.tadirah.map(t => t.tadirahLabel)
              : [];
            return tadirahLabels.some(label => label.toLowerCase().includes(concept.toLowerCase()));
          })
          : true;
      return matchesSearch && matchesAlphabet && matchesConcepts;
    });
  }, [search, alphabetFilter, conceptsFilter, sortedData]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const totalResults = filteredData.length;

  const paginatedData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, currentPage]);

  // useEffect zum Speichern der Filter in sessionStorage
  useEffect(() => {
    // do a browser environment check
    if (isBrowser) {
      const timeout = setTimeout(() => {
        sessionStorage.setItem("searchFilters", JSON.stringify({ search, alphabetFilter, conceptsFilter, currentPage }));
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [search, alphabetFilter, conceptsFilter, currentPage]);
  

  return (
    <Layout>
      <div className="container my-4">
        {/* Hauptbereich mit drei Spalten */}
        <div className="row">
          {/* Linke Spalte für tba 
          <div className="col-sm-1">
          </div>*/}

          {/* Mittlere Spalte mit dem Hauptinhalt */}
          <div className="col-sm-8">
            <h1>
              <span className="pe-3">
                <GoSearch />
              </span>
              Tools
            </h1>
            <p className="kdh-short-desc">Search for DH tools that are categorised according to the TaDiRAH taxonomy.</p>

            <SearchBar search={search} setSearch={setSearch} />
            <AlphabetFilter alphabetFilter={alphabetFilter} setAlphabetFilter={setAlphabetFilter} />
            <div className="row align-items-end">
              <div className='col-9'>
                {totalResults} result{totalResults !== 1 ? 's' : ''} found.
              </div>
              <div className='col-3 text-end'>
                <ResetFilters
                  setSearch={setSearch}
                  setAlphabetFilter={setAlphabetFilter}
                  setConceptsFilter={setConceptsFilter}
                  setCurrentPage={setCurrentPage}
                  setSelectedOptions={setSelectedOptions} 
                />
              </div>
            </div>
            <ToolsTableComponent filteredData={paginatedData} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <BuildTime />
          </div>
          <div className="col-sm-3">
            <Concepts selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} onConceptsChange={handleConceptsChange} />
          </div>
        </div>
        <BackButton />
      </div>
    </Layout>
  );
};

export default ToolsPage;

export const Head = () => <Seo title="List tools" />;