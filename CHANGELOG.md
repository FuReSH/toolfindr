# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Switch to gatsby-plugin-local-search and flexsearch for the search index
- Add screenshots to the Wikidata tutorial (Get involved)
- Add documentation for the QLever SPARQL endpoint

## [1.1.2] - 2025-10-23

### Fixed
- Upgrade axios to fix 1 high Dependabot alert in package-lock.json

### Added
- Dev-tools script for testing ldf server

## [1.1.1] - 2025-09-08

### Fixed
- GitHub Actions cache handling adjusted to avoid `Unable to reserve cache` errors.  
  Cache keys are now stable (`gatsby-cache-${branch}-${package-lock hash}`) instead of run-specific, ensuring proper reuse and preventing conflicts.
- Unnecessary variable output on the tools page (right-hand column) has been removed. This was accidentally included during refactoring.
- Typos

### Changed
- Removed Gatsby cache statistics step to simplify workflow logs.

## [1.1.0] - 2025-08-31

### Added

- Optional cache usage for manually triggered workflows (`workflow_dispatch`)  
  → selectable via dropdown input (`useCache: true/false`).
- Build logs now include cache statistics (Cached / Created / Deleted nodes) plus the total number of Wikidata nodes.
- Automatic cleanup of `.cache` and `public` directories when cache is disabled, ensuring clean builds.

### Changed

- Outdated remote GitHub repository path from “tool-storage-interface” to the new name "toolfindr"
- You can check the URL of your remote repository with the Git command `git remote -v`.
- Use the Git command `git remote set-url origin git@github.com:FuReSH/toolfindr.git` (ssh) to change the remote URL of your local repository if necessary.
- Set new repo name as path prefix in Gatsby configuration.
- GitHub Actions workflow now applies different cache strategies based on event type:  
  - `push`: cache is restored but not saved.  
  - `schedule`: cache is restored and saved after the build.  
  - `workflow_dispatch`: cache disabled by default, but can be explicitly enabled.

## [1.0.1] - 2025-08-23

### Fixed

- Snyc error with the package-lock.json and `npm cli`

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
