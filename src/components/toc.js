import React, { useState } from "react";
import { GoListUnordered } from "react-icons/go";

import "./toc.scss";

const Toc = ({ headings }) => {
  const [activeHeading, setActiveHeading] = useState(null);

  const cleanedString = (str) => {
    return str
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '') // Entfernt Akzente (é → e)
      .replace(/[^\w\s-]/g, '') // Entfernt Sonderzeichen außer Buchstaben, Zahlen und Leerzeichen
      .replace(/\s+/g, '-'); // Ersetzt Leerzeichen durch Bindestriche
  };

  const handleClick = (id) => {
    setActiveHeading((prev) => (prev === id ? null : id)); // Toggle Logik
  };

  return (
    <div className="sticky-top top-10">
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
  );
};

export default Toc;
