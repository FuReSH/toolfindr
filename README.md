<h1 align="center">
  Frontend Template for the Digital Humanities Tool Registry with Wikidata
<br />
<img src="./docs/teaser-img.png" width="50%" alt="Demo DH Tool Registry Website" /> 
<br />
</h1>

[![Build and Deploy](https://github.com/FuReSH/tool-storage-interface/actions/workflows/gatsby.yml/badge.svg?branch=main)](https://github.com/FuReSH/tool-storage-interface/actions/workflows/gatsby.yml)


- powered by Wikidata SPARQL Service, MediaWiki Action API, GatsbyJS with React and GraphQL, Bootstrap
<!-- - uses SSR and DFR strategies -->
- additional libraries: communica for Wikidata retrieval, react-select for multi selection, pm2 for deployment

<!-- Add Abstract here -->

👉 **All data grounded by Wikidata and Commons.**

![](./docs/tr-screenshot.png)

## Overview

- Project structure
- Data fetching and data handling
    - SPARQL (Wikidata request)
    - MediaWiki Action API (images)
    - GraphQL (schema)
- Installation
    - Locally
    - Docker
- Customize the template
    - Configure sites metadata
    - Configures styles
- Issues and development
- Further Reading

## Data fetching and data handling with Gatsby

- https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/conceptual/data-fetching.md

### SPARQL

See JS-Libraries

- https://comunica.dev/ (allows federated queries)
- https://zazuko.com/get-started/developers/#further-documentation-support-questions (no federated queries)

### Execute SPARQL queries with `@comunica/query-sparql`

#### Federated query

```bash
npx comunica-sparql https://query.wikidata.org/sparql https://vocabs-downloads.acdh.oeaw.ac.at/vocabs-main/Humanities/TaDiRAH/tadirah.ttl -f ./data/federated-sparql.rq --log-level debug
```

## Wikimedia Commons

- Image-URLs from Wikidata result in `❗ Das Cookie "NetworkProbeLimit" wurde abgelehnt, weil es sich in einem seitenübergreifenden Kontext befindet und sein "SameSite" auf "Lax" oder "Strict" gesetzt ist.`
    - Issue: URL from Wikidata is a Redirect-URL (301) that cause the cookie issue
    - when accessing it, Wikimedia may set a session cookie that is blocked by the SameSite setting.
- Fix: Use MediaWiki-API to retrieve the images: https://www.mediawiki.org/wiki/API:Imageinfo

### Credits

- Images from Commons can be used outside 
- Need license requirements: https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia

## Gatsby Cli

Explore the project e.g. schema, nodes, pages etc.

`npm run repl`

https://www.gatsbyjs.com/docs/reference/gatsby-cli/#repl

## Erros in the build-time React SSR process

### Browser globals (window or document)

- add browser check during the build time to skip: https://www.gatsbyjs.com/docs/debugging-html-builds/#how-to-check-if-window-is-defined

## [ARCHIV] JSON schema (for editing feature)

1. At the moment react-json-schema-from doesn't support `patternProperties` of Json Schema
    - see Issue on GitHub: https://github.com/rjsf-team/react-jsonschema-form/issues/1514
    - that means we need a workaround here