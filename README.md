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
- GitHub Pages URL: `https://studentNJ.github.io/scrollyTelling-assignment/`

## Deployment Status

Deployment is live on GitHub Pages.

Local and deployment validation completed:

- `npm run build` generates the static `out/` directory
- The GitHub Actions workflow uploads `out/` for Pages deployment
- Browser-level tests pass against the exported site locally
- The public GitHub Pages homepage is reachable
- The production asset-path issue was fixed so deployed images load under the repository base path

The live GitHub Pages URL was rechecked on April 27, 2026 and is serving the deployed site successfully.

## QA Notes

- Automated QA evidence is recorded in `documents/qa/phase-5-report.md`
- Deployment-specific validation notes are recorded in `documents/qa/phase-6-report.md`
