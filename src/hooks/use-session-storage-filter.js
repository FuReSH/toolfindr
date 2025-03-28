import { useState, useEffect, useMemo } from "react";
import useIsBrowser from "./use-is-browser";

const useSessionStorageFilter = (key = "searchFilters") => {
  const isBrowser = useIsBrowser();

  const defaultFilters = {
    search: "",
    alphabetFilter: "",
    conceptsFilter: [],
    currentPage: 1,
  };

  const storedFilters = useMemo(() => {
    if (isBrowser) {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultFilters;
    }
    return defaultFilters;
  }, [isBrowser, key]);

  const [filters, setFilters] = useState(storedFilters);

  useEffect(() => {
    if (isBrowser) {
      const timeout = setTimeout(() => {
        sessionStorage.setItem(key, JSON.stringify(filters));
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [filters, isBrowser, key]);

  const updateFilter = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    updateFilter(defaultFilters);
    sessionStorage.removeItem("searchFilters"); // Löscht den gespeicherten Zustand
  };

  return { filters, updateFilter, resetFilters };
};

export default useSessionStorageFilter;
