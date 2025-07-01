import React, { useMemo, useState, useEffect } from "react";
import ToolsCardComponent from "../components/toolscard";
import Layout from "../components/layout";
import { Seo } from "../components/seo";
import { GoSearch, GoTag } from "react-icons/go";
import Concepts from "../components/concepts";
import BuildTime from "../components/buildtime";
import ResetFilters from "../components/resetfilters";
import SearchBar from "../components/searchbar";
import Pagination from "../components/pagination";
import { useStaticQuery, graphql } from "gatsby";
import BackButton from "../components/backbutton";
import Sidebar from "../components/sidebar";
import useSessionStorageFilter from "../hooks/use-session-storage-filter";

const ToolsPage = () => {
  const { filters, updateFilter, resetFilters } = useSessionStorageFilter();
  const { search, conceptsFilter, currentPage } = filters;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive Check
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const fetchedData = useStaticQuery(graphql`
    query {
      allResearchTool(sort: {label: ASC}) {
        nodes {
          id
          _id
          slug
          concepts {
            _id
            label
          }
          label
          description
        }
      }
    }
  `);

  const data = fetchedData.allResearchTool.nodes;

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.label.toLowerCase().includes(search.toLowerCase());
      const matchesConcepts =
        conceptsFilter.length > 0
          ? conceptsFilter.some(concept => {
            const tadirahLabels = Array.isArray(item.concepts)
              ? item.concepts.map(t => t.label)
              : [];
            return tadirahLabels.some(label => label.toLowerCase().includes(concept.toLowerCase()));
          })
          : true;
      return matchesSearch && matchesConcepts;
    });
  }, [search, conceptsFilter, data]);

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
          <div className="col-12">
            <h1>
              <span className="pe-3">
                <GoSearch className="icon-color-secondary" />
              </span>
              Tools
            </h1>

            <p className="kdh-short-desc">Search for DH tools that are categorised according to the TaDiRAH taxonomy.</p>

            <SearchBar search={search} setSearch={(val) => updateFilter({ search: val })} />

            {/* Ausgewählte Concepts anzeigen */}
            {conceptsFilter.length > 0 && (
              <div className="row justify-content-center mb-3">
                <div className="col-12 col-md-12 col-lg-8 d-flex flex-wrap gap-2 align-items-center">
                  <small className="text-muted me-2">Active filters:</small>
                  {conceptsFilter.map((concept, index) => (
                    <span
                      key={index}
                      className="badge bg-primary shadow-sm"
                    >
                      <GoTag className="me-1" />{concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="row align-items-end justify-content-center">
              <div className='col-9 col-md-9 col-lg-5'>
                {totalResults} result{totalResults !== 1 ? 's' : ''} found.
              </div>
              <div className='col-3 col-md-2 col-lg-3 text-end'>
                <ResetFilters resetFilters={resetFilters} />
              </div>
            </div>

            <hr />

            <ToolsCardComponent filteredData={paginatedData} />

            <hr />

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(val) => updateFilter({ currentPage: val })} />
            <BuildTime />
          </div>
        </div>

        <BackButton />
      </div>

      {/* Sidebar Component */}
      <Sidebar 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
        filters={filters}
        updateFilter={updateFilter}
      />
    </Layout>
  );
};

export default ToolsPage;

export const Head = () => <Seo title="List tools" />;