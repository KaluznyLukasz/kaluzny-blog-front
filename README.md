# Kałużny Blog – front end

Personal page and blog of Łukasz Kałużny. This is the front-end application: a React single-page app built with Vite that runs fully in the browser. The data comes from a separate back-end API (see [API](#api)).

## Tech stack

| Technology | Version |
| ---------- | ------- |
| Node.js    | ^24.x   |
| TypeScript | ^5.9    |
| Yarn       | ^1.22   |

Main dependencies:

| Dependency                                                           | Version | Used for                                                       |
| -------------------------------------------------------------------- | ------- | -------------------------------------------------------------- |
| [Vite](https://vite.dev/)                                            | ^7.2    | Dev server with instant reload and the production build        |
| [React](https://react.dev/)                                          | ^19.x   | UI library                                                     |
| [React Router](https://reactrouter.com/) (framework mode)            | ^7.x    | Routing: every file in `src/pages/` is a page (`ssr: false`)   |
| [Tailwind CSS](https://tailwindcss.com/)                             | ^4.x    | Styling with utility classes                                   |
| [@gi-org-pl/athena](https://www.npmjs.com/package/@gi-org-pl/athena) | ^1.x    | Component library with the colour theme                        |
| [Axios](https://axios-http.com/) and [Zod](https://zod.dev/)         | ^1.x/^4.x | Calling the API and validating its responses                 |
| [Zustand](https://zustand.docs.pmnd.rs/)                             | ^5.x    | Shared state                                                   |
| [Vitest](https://vitest.dev/) and Testing Library                    | ^4.x    | Unit tests, kept next to the code they test                    |
| [Playwright](https://playwright.dev/)                                | ^1.x    | End-to-end tests in a real browser                             |
| [Storybook](https://storybook.js.org/)                               | ^10.x   | Component catalogue                                            |
| [Biome](https://biomejs.dev/)                                        | ^2.x    | Lint and formatting (replaces ESLint and Prettier)             |
| [Husky](https://typicode.github.io/husky/)                           | ^9.x    | Runs Biome before every commit                                 |

## Requirements

- [Node.js](https://nodejs.org/) 24 (for example installed with [nvm](https://github.com/nvm-sh/nvm): `nvm install 24`)
- [Yarn](https://classic.yarnpkg.com/) 1.22:

  ```shell
  npm install --global yarn@^1.22
  ```

- Git

The project uses Yarn only. Do not use npm to install packages, and always commit `yarn.lock`.

On Windows, use WSL 2 and keep the repository inside the WSL file system. The project is tested on Ubuntu and macOS.

## Getting started

1. Clone the repository and go to its directory:

   ```shell
   git clone https://github.com/KaluznyLukasz/kaluzny-blog-front.git
   cd kaluzny-blog-front
   ```

2. Install the dependencies (this also sets up the Husky Git hooks):

   ```shell
   yarn install
   ```

3. Start the development server:

   ```shell
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser. The page reloads when you save a file.

## API

The back end lives in a separate repository: [KaluznyLukasz/kaluzny-blog-back](https://github.com/KaluznyLukasz/kaluzny-blog-back). It runs in Docker; follow its README to start it. When it is running locally:

- the API is available at [http://localhost](http://localhost)
- the Swagger documentation is at [http://localhost/api](http://localhost/api)

API code goes in `src/services/api/` (`client/`, `schemas/`, `utils/`).

## Available scripts

```shell
yarn dev              # Start the development server (http://localhost:5173)
yarn build            # Build for production (output in build/)
yarn preview          # Serve the production build locally
yarn test             # Run unit tests in watch mode (yarn test --run to run once)
yarn test:coverage    # Run unit tests once with a coverage report
yarn e2e              # Run end-to-end tests with Playwright
yarn e2e:ui           # Run Playwright tests in UI mode
yarn lint             # Check the code with Biome
yarn lint:fix         # Fix lint and formatting issues
yarn storybook        # Start Storybook (http://localhost:6006)
yarn storybook:build  # Build Storybook as a static site
```

Before the first `yarn e2e` run, install the Playwright browsers with `npx playwright install`.

## Project structure

```text
src/
├── assets/        # Images and vectors
├── components/    # Components grouped by domain; shared/ for components used across the app
├── constants/     # Constants
├── pages/         # Pages; every file is a route (flat routes)
├── services/api/  # API client, Zod schemas and helpers
├── types/         # Shared TypeScript types
├── utils/         # Helper functions
├── index.css      # Tailwind CSS and Athena styles
├── root.tsx       # HTML document and app root
└── routes.ts      # Route configuration
e2e/               # Playwright end-to-end tests
```

Unit tests (`*.test.ts(x)`) and stories (`*.stories.tsx`) are kept next to the code they test.

## Code quality

Biome checks lint and formatting. Husky runs `yarn lint:fix` before every commit, and CI runs `yarn lint` on every pull request. The rules are in `biome.json`.

## Working with Athena

`@gi-org-pl/athena` exports the shared, reusable components. If you need a new reusable component, add it to [Athena](https://github.com/gi-org-pl/athena) instead of this project. Create components here only when they are specific to this project.

Athena's styles are loaded in `src/index.css` with `@import "@gi-org-pl/athena/athena.css";`, which also imports Tailwind CSS and Athena's theme. To update Athena to its latest release:

```shell
yarn upgrade @gi-org-pl/athena --latest
```

## Contributing

- `main` is protected: changes go through reviewed pull requests, and every commit must be signed.
- Name branches following [Conventional Branch](https://conventional-branch.github.io/), for example `feat/about-me-page`.
- Fill in the pull request template. CI (`.github/workflows/build-frontend.yml`) runs the build, unit tests and lint on every pull request to `main`.
