
<h1 align="center">
  <small><</small> <strong>ToolFindr</strong> <small>/></small><br>
  <div align="center"><img src="./docs/assets/Wikidata_stamp.png" width="90" alt="Logo of the ToolFindr Website" /> 
</div>
</h1>

[![Deploy pages](https://github.com/FuReSH/tool-storage-interface/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/FuReSH/tool-storage-interface/actions/workflows/deploy.yml)

## A Lightweight Explorer for Discovering Research Tools in the Digital Humanities

**Open, community-curated, and built on the Tool Registry Framework, integrating Wikidata and TaDiRAH**

- powered by 
    - Wikidata SPARQL Service, 
    - Wikidata Linked Data Fragments Service
    - MediaWiki Action API,
    - Comunica 
    - GatsbyJS with React and GraphQL
    - Bootstrap 5
<!-- - uses SSR and DFR strategies -->

<!-- Add Abstract here -->

👉 **All data grounded in Wikidata, Commons and the TaDiRAH Taxonomy.**

## Overview

- Project structure
- Data fetching and data handling
    - Local `gatsby-source-research-tools` plugin
        - SPARQL
        - Triple Pattern Fragment
        - GraphQL
    - MediaWiki Action API (Wikimedia Commons)
- Installation
    - Locally
    - Docker
- Customize the explorer
    - Configure sites metadata
    - Configures styles
- Issues and development
- Further Reading

## Data fetching and data handling with Gatsby

- https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/conceptual/data-fetching.md

### Local `gatsby-source-research-tools` plugin

Use the concept of Linked Data Fragements

#### Why Wikidata LDF and not REST?

- Not to complex SPARQL Query to not run into RateLimit Error (429)
- Drawbacks of Wikidata REST API:
    - Parallel request with e.g. `Promise.all()` is not allowed and will run into 429 error
    - Sequential requests, on the other hand, take a long time and are therefore not efficient
    - you need personal access token for larger requests

#### Documentation (technical)

- Change into the plugin's directory and create TypeDoc Documentation:

`npx typedoc`

### SPARQL

There a various endpoints available for fetching data from Wikidata
- WDQS - Wikimedia Foundation
- QLever (!) - Uni Freiburg
- Virtuoso
- see website for more information and benchmark tests: 
    - https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/WDQS_backend_update/WDQS_backend_alternatives
    - https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Alternative_endpoints

See JS-Libraries

- https://comunica.dev/ (allows federated queries)
- https://zazuko.com/get-started/developers/#further-documentation-support-questions (no federated queries)

### When to use which endpoint?

### Execute SPARQL queries with `@comunica/query-sparql`

#### Federated query

```bash
npx comunica-sparql https://query.wikidata.org/sparql https://vocabs-downloads.acdh.oeaw.ac.at/vocabs-main/Humanities/TaDiRAH/tadirah.ttl -f ./data/federated-sparql.rq --log-level debug
```

#### Linked Data Fragments (LDF)

- Wikidata LDF Server: https://query-main.wikidata.org/bigdata/ldf
- "template" : "https://query-main.wikidata.org/bigdata/ldf{?subject,predicate,object}"

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
