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

API code lives in `src/services/api/`: `client/` holds the Axios client and one function per endpoint (for example `getArticles`), `schemas/` the Zod schemas (TypeScript types come from them with `z.infer`) and `utils/` helpers. Components never import Axios.

Every answer from the API is checked with a Zod schema (`parseResponse`). A response interceptor on the client turns every failed request into an `ApiError` with a `reason` (`network`, `timeout`, `http`, `cancelled`, ...), and an answer that does not match its schema becomes an `ApiError` with the reason `invalid-response`. Code that calls the API only ever has to handle one kind of error.

### Changing the API address

The app reads the API address from the `VITE_API_URL` environment variable. Its default, `http://localhost`, is set in `.env`, so `yarn dev` talks to the local back end with no setup.

To use another API, create a `.env.local` file next to `.env` (Git ignores it):

```shell
VITE_API_URL=https://api.example.com
```

or set the variable for a single command:

```shell
VITE_API_URL=https://api.example.com yarn build
```

Vite reads the variable when the dev server starts and when the app is built, so restart `yarn dev` or build again after changing it.

In development the back end only accepts requests from `http://localhost:5173`, so use `yarn dev` to see the real articles locally (`yarn preview` runs on another port and is blocked by CORS).

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

Before the first `yarn e2e` run, install the browser with `yarn playwright install chromium`. `yarn e2e` builds the app and serves the build at http://localhost:4173 before running the tests (in CI it serves the build from the build job). The HTML report is written to `playwright-report/`. The end-to-end tests do not need the API: they answer its requests with Playwright mocks (`e2e/blog/articlesApi.ts`).

## Pages

| Address          | Page                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `/`              | About me: introduction, tech stack, journey                                                   |
| `/portfolio`     | Projects with status, platforms and store links                                               |
| `/blog`          | Articles from the API                                                                         |
| `/articles/:id`  | One article, with reading progress and a button that copies its link                          |
| `/contact`       | Ways to reach me (add `{ kind: "email", ... }` to `src/constants/contacts.ts` to show email)  |
| anything else    | "Page not found" (`src/pages/$.tsx`); unexpected errors show the error page from `root.tsx` |

Every page sets its title and description for search engines and link previews with `createMeta` (`src/utils/createMeta.ts`). Crawler rules are in `public/robots.txt`. Because the app is a single-page app (`ssr: false`), the host must answer unknown addresses with `index.html`.

## Accessibility

The site targets [WCAG 2.2](https://www.w3.org/TR/WCAG22/) level AA. `e2e/accessibility/accessibility.spec.ts` keeps it there:

- it runs [axe](https://github.com/dequelabs/axe-core) on every page and state (loading, empty, error, not found) on a phone and a desktop screen, so any problem it can detect fails CI
- it tabs through every page and checks that each link and button shows a focus outline
- it checks the site at 400 % zoom, with wider text spacing and in a high contrast theme

Some behaviour to keep when changing the code:

- After an in-app navigation, focus moves to `<main>` and the new page title is announced (`useNavigationFocus` in `PageLayout`). Buttons that disappear when pressed move focus to `<main>` too (`focusMainContent`), so keyboard users are never sent back to the top.
- Every page and state has exactly one `<h1>`.
- Some Athena colours are too light for small text on white. Use `StatusBadge` instead of `Badge` with a type, and `StatusMessage` instead of `InfoMessage`. Athena's `Button` needs `focus-visible:outline-solid` next to the outline classes, or it shows no focus outline.
- Animations must stop when the visitor prefers reduced motion (`motion-reduce:` / `motion-safe:`).

## Project structure

```text
src/
├── assets/        # Images and vectors
├── components/    # Components grouped by domain; shared/ for components used across the app
├── constants/     # Constants (site name, paths, contact links)
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
- Fill in the pull request template. CI (`.github/workflows/build-frontend.yml`) runs the build, unit tests, lint and end-to-end tests on every pull request to `main`.
