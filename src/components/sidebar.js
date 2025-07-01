import React from "react";
import { GoMultiSelect, GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import Concepts from "./concepts";
import "./sidebar.scss";

const Sidebar = ({ 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  isMobile, 
  filters, 
  updateFilter 
}) => {
  const sidebarWidth = isMobile ? '280px' : '500px';

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="btn btn-primary sidebar-toggle-btn shadow-sm"
        onClick={toggleSidebar}
        style={{
          right: sidebarCollapsed ? sidebarWidth : '0',
        }}
        title={sidebarCollapsed ? "Close filter sidebar" : "Open filter sidebar"}
      >
        {sidebarCollapsed ? (
          <GoSidebarCollapse />
        ) : (
          <GoSidebarExpand />
        )}
      </button>

      {/* Filter Sidebar */}
      <div
        className={`sidebar ${isMobile ? 'sidebar--mobile' : 'sidebar--desktop'}`}
        style={{
          right: sidebarCollapsed ? '0' : `-${sidebarWidth}`,
          width: sidebarWidth,
        }}
      >
        <div className="sidebar__header">
          <h5 className="sidebar__title">
            <GoMultiSelect className='icon-color-secondary' /> Filter
          </h5>
          <button
            className="btn-close"
            onClick={toggleSidebar}
            aria-label="Close filter sidebar"
          ></button>
        </div>
        <div className="sidebar__content">
          <Concepts filters={filters} updateFilter={updateFilter} />
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarCollapsed && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;