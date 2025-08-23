# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Switch to gatsby-plugin-local-search and flexsearch for the search index
- Add screenshots to the Wikidata tutorial (Get involved)
- Add documentation for the QLever SPARQL endpoint

## [1.0.0] - 2025-08-23

Initial release of the ToolFindr. See also the project [First Release of ToolFindr](https://github.com/orgs/FuReSH/projects/1) on GitHub for further details.

### Added

- Add `contributors` to `package.json`	https://github.com/FuReSH/tool-storage-interface/issues/19
- Add powered by Wikidata button to the website start page	https://github.com/FuReSH/tool-storage-interface/issues/18
- Add .env file for env variables	https://github.com/FuReSH/tool-storage-interface/issues/13
- Local Gatsby-Plugin for data requests on Wikidata and TaDiRAH	https://github.com/FuReSH/tool-storage-interface/issues/2
- DH Tool Registry Project Description (About)	https://github.com/FuReSH/tool-storage-interface/issues/7
- User Documentation (Get Involved)	https://github.com/FuReSH/tool-storage-interface/issues/6
- Technical Documentation (README and TDoc)	https://github.com/FuReSH/tool-storage-interface/issues/5

### Fixed

- Make the website even more mobile-friendly https://github.com/FuReSH/tool-storage-interface/issues/25
- [plugin] Duplicate values for version and license fields (origin: LDF source class)	https://github.com/FuReSH/tool-storage-interface/issues/21

### Changed

- [UX] All react icons in blue color https://github.com/FuReSH/tool-storage-interface/issues/22
- Change to GNU License	https://github.com/FuReSH/tool-storage-interface/issues/20
- Spice up the title a little	https://github.com/FuReSH/tool-storage-interface/issues/16
- Fancy title and subtitle for the site	https://github.com/FuReSH/tool-storage-interface/issues/15
- Simplify Github workflow	https://github.com/FuReSH/tool-storage-interface/issues/4
- Move image fetching to hooks and utils (from tool template)	https://github.com/FuReSH/tool-storage-interface/issues/12
- Split SPARQL query and use Wikidata REST API	https://github.com/FuReSH/tool-storage-interface/issues/11
- Update Gatsby plugin manifest (web app manifest)	https://github.com/FuReSH/tool-storage-interface/issues/3

### Removed

- Unused normalize.css file.
- Identical links assigned in each translation file.
- Duplicate index file for the english version.
