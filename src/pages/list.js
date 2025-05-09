import React, { useMemo } from "react";
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
import useSessionStorageFilter from "../hooks/use-session-storage-filter";

const ToolsPage = () => {
  const { filters, updateFilter, resetFilters } = useSessionStorageFilter();
  const { search, alphabetFilter, conceptsFilter, currentPage } = filters;

  //console.log(filters);

  const fetchedData = useStaticQuery(graphql`
    query {
      allResearchTool(sort: {_id: ASC}) {
        nodes {
          id
          _id
          concepts {
            _id
            label
          }
        }
      }
    }
  `);

  const data = fetchedData.allResearchTool.nodes;

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.label.toLowerCase().includes(search.toLowerCase());
      const matchesAlphabet = alphabetFilter ? item.label.startsWith(alphabetFilter) : true;
      const matchesConcepts =
        conceptsFilter.length > 0
          ? conceptsFilter.some(concept => {
              const tadirahLabels = Array.isArray(item.concepts)
                ? item.concepts.map(t => t.label)
                : [];
              return tadirahLabels.some(label => label.toLowerCase().includes(concept.toLowerCase()));
            })
          : true;
      return matchesSearch && matchesAlphabet && matchesConcepts;
    });
  }, [search, alphabetFilter, conceptsFilter, data]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const totalResults = filteredData.length;

  const paginatedData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, currentPage]);

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
            <p className="kdh-short-desc">Search for DH tools that are categorised according to the TaDiRAH taxonomy.</p>

            <SearchBar search={search} setSearch={(val) => updateFilter({ search: val })} />
            <AlphabetFilter alphabetFilter={alphabetFilter} setAlphabetFilter={(val) => updateFilter({ alphabetFilter: val })} />
            
            <div className="row align-items-end">
              <div className='col-9'>
                {totalResults} result{totalResults !== 1 ? 's' : ''} found.
              </div>
              <div className='col-3 text-end'>
              <ResetFilters resetFilters={resetFilters} />
              </div>
            </div>
            <ToolsTableComponent filteredData={paginatedData} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(val) => updateFilter({ currentPage: val })} />
            <BuildTime />
          </div>
          <div className="col-sm-3">
            <Concepts filters={filters} updateFilter={updateFilter} />
          </div>
        </div>
        <BackButton />
      </div>
    </Layout>
  );
};

export default ToolsPage;

export const Head = () => <Seo title="List tools" />;
