# Scrollytelling Assignment

## Project

Signals In Motion is a static-export-ready scrollytelling site built with Next.js App Router, TypeScript, CSS Modules, and local typed content objects. The project demonstrates a data-story topic on transit reliability while also exposing the spec-driven workflow used to build it.

## Features

- Scrollytelling homepage with sticky visual and active-step progress controls
- Separate Process page documenting the phased workflow
- Separate Specs page summarizing the governing project documents
- Static-export-compatible routing and assets for GitHub Pages
- Unit and browser-level test coverage for story behavior, content pages, and navigation

## Tech Stack

- Next.js App Router
- TypeScript
- CSS Modules and CSS custom properties
- Vitest and Testing Library
- Playwright
- GitHub Pages via GitHub Actions

## Scripts

- `npm run lint`
- `npm test`
- `npm run build`
- `npm run test:e2e`

## Repository

- GitHub repository: `https://github.com/studentNJ/scrollyTelling-assignment`
- Intended GitHub Pages URL: `https://studentNJ.github.io/scrollyTelling-assignment/`

## Deployment Status

Local deployment validation is complete:

- `npm run build` generates the static `out/` directory
- The GitHub Actions workflow uploads `out/` for Pages deployment
- Browser-level tests pass against the exported site locally

The live GitHub Pages URL was checked on April 26, 2026 and returned `404`, so deployment is prepared but not yet confirmed as publicly available.

## QA Notes

- Automated QA evidence is recorded in `documents/qa/phase-5-report.md`
- Deployment-specific validation notes are recorded in `documents/qa/phase-6-report.md`
