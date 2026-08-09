# Enterprise Playwright Test Framework

This repository contains a production-grade Playwright test framework structured for enterprise regression, API, and UI automation.

## Tech Stack
- Playwright
- TypeScript
- Allure reporting

## Folder Structure
- `tests/specs/ui`: UI and functional tests
- `tests/specs/api`: API tests
- `tests/specs/regression`: dedicated regression tests
- `tests/pages`: page object model classes
- `tests/support`: shared fixtures and custom base test setup
- `tests/fixtures`: reusable test data
- `playwright.config.ts`: Playwright test configuration

## Installation
1. Install dependencies:
   ```bash
   npm install
   ```

## Environment Configuration
Copy `.env.example` to `.env` and adjust the URLs or browser settings as needed.

## Running Tests
- Run all tests:
  ```bash
  npm test
  ```
- Run UI tests only:
  ```bash
  npm run test:ui
  ```
- Run API tests only:
  ```bash
  npm run test:api
  ```
- Run regression tests only:
  ```bash
  npm run test:regression
  ```

## Allure Reports
- Generate report after running tests with Allure reporter:
  ```bash
  npm run allure:generate
  ```
- Serve the generated report:
  ```bash
  npm run allure:serve
  ```

## Notes
- The framework uses `tests/specs` as the centralized test directory.
- Page objects are implemented in `tests/pages`.
- Shared fixtures are provided through `tests/support/base-test.ts`.
