# Integration Tests

## Pre-Requisite

Pack the project package before calling the `build` script in this directory.

## Running the tests against Mountebank

Mountebank is installed as a dev dependency. It needs to be started before running the tests, and there are 3 options:

1. Start MB yourself with `pnpm start:mb`
2. Run MB in docker `pnpm mb:up`
3. Start MB locally when running the tests: `pnpm test:ci` - note that this run does not allow the `run-only` filter for mocha.

When changing the integration tests it is easiest to work when MB is running independent of the tests, and to just run `pnpm test`.

## Before Commit

Please remove the dependency to the actual project before committing with the script `pnpm project:remove`
