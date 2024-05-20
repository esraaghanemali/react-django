
# Frontend

Frontend setup on top of `vite` and template `react-ts`. See
[here](https://vitejs.dev/guide/) to learn more about `vite`.

Including:

- `jest`
- `eslint`
- `prettier`
- `madge`
- `sass`
- script targets `pnpm lint` and `pnpm test`

## Structure

- src folder
  - assets: contains styles images.icons
  - services: the api logic that fetch data from the backend
  - ui: all components related code
    - Store: use store to share data between react components.
  - utils: all ts logic and shared functionality
    - ApiClient: the functionality to fetching data, handling API responses, and managing errors.
    - types: shared types among the frontend
    - index.ts: shared functionality and helper functions
  - routes.ts: the registered routes

## Pre requisite

- pnpm
- node

## Instalation

- pnpm install

## Run

- pnpm dev
