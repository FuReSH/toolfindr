import React, { useState } from "react";
import { GoFoldDown, GoFoldUp, GoListUnordered } from "react-icons/go";

import "./toc.scss";

const Toc = ({ headings }) => {
  const [activeHeading, setActiveHeading] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const cleanedString = (str) => {
    return str
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '') // Entfernt Akzente (é → e)
      .replace(/[^\w\s-]/g, '') // Entfernt Sonderzeichen außer Buchstaben, Zahlen und Leerzeichen
      .replace(/\s+/g, '-'); // Ersetzt Leerzeichen durch Bindestriche
  };

  const handleClick = (id) => {
    setActiveHeading((prev) => (prev === id ? null : id)); // Toggle Logik
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="mb-4 text-body-secondary fs-6 bd-toc">
      <div className="sticky-top top-10">
        {/* Aufklappbarer Header für kleinere Bildschirme */}
        <div className="d-lg-none">
          <button 
            className="form-control w-100 d-flex justify-content-between align-items-center"
            type="button"
            onClick={toggleCollapse}
            aria-expanded={!isCollapsed}
          >
            <span><GoListUnordered /> On this page</span>
            <span className={`ms-2 ${isCollapsed ? '' : 'rotate-180'}`}> { isCollapsed ? <GoFoldDown /> : <GoFoldUp /> } </span>
          </button>
          <div className={`collapse ${!isCollapsed ? 'show' : ''}`}>
            <div className="card card-body mt-2 p-2">
              <nav className="nav flex-column">
                {headings.map((heading) => {
                  const id = cleanedString(heading.value);
                  return (
                    <a
                      key={id}
                      className={`nav-link py-1 px-2 depth-${heading.depth} ${activeHeading === id ? "active" : ""}`}
                      href={`#${id}`}
                      onClick={() => handleClick(id)}
                    >
                      {heading.value}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Normale Anzeige für größere Bildschirme */}
        <div className="d-none d-lg-block">
          <h5><GoListUnordered /> On this page</h5>
          <hr />
          <nav className="nav flex-column">
            {headings.map((heading) => {
              const id = cleanedString(heading.value);
              return (
                <a
                  key={id}
                  className={`nav-link depth-${heading.depth} ${activeHeading === id ? "active" : ""}`}
                  href={`#${id}`}
                  onClick={() => handleClick(id)}
                >
                  {heading.value}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Toc;