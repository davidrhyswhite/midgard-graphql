# Midgard GraphQL

![Midgard GraphQL CI](https://github.com/davidrhyswhite/midgard-graphql/workflows/Midgard%20GraphQL%20CI/badge.svg)

A simple GraphQL service for the THORChain ⚡️ Midgard API. Build on [Apollo Server](https://www.apollographql.com).

![query](https://user-images.githubusercontent.com/458085/91698026-fc95f180-eb69-11ea-8bf4-7f7f1cef3e9d.jpg 'Apollo Playground')

## Table of contents:

- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Debugging](#debugging)
- [Testing](#testing)
- [Linting & Prettifying](#linting--prettifying)
- [VSCode Extensions](#vscode-extensions)

## Prerequisites

To build and run this app locally you will need a few things:

- Install: [Node.js v14.x](https://nodejs.org/en/)
- Install: [Yarn](https://yarnpkg.com) with `npm install --global yarn`
- Optionally install: [VS Code](https://code.visualstudio.com)
- Optionally install: [Docker](https://www.docker.com)

## Getting started

**Install the application**

    git clone --depth=1 https://github.com/davidrhyswhite/midgard-graphql.git
    cd midgard-graphql
    yarn install

**Build and run the project**

    yarn build
    yarn start

Or, if you're using VS Code, you can use `cmd + shift + b` to run the default build task (which is mapped to `yarn build`), and then you can use the command palette (`cmd + shift + p`) and select `Tasks: Run Task` > `yarn: debug` to run `npm debug` for you.

Finally, navigate to `http://localhost:8082/graphql` and you should see the GraphQL Playground running!

### Useful scripts

To call a script, simply run `yarn <script-name>` from the command line.

Below is a list of all the scripts this template has available:

| Script            | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `build`           | Runs the TypeScript compiler and builds the application into the ./dist folder.                    |
| `clean`           | Removes all generated files and builds and re-installs the applecations modules.                   |
| `container:build` | Build the docker container and tag to `midgard-graphql:latest`.                                    |
| `container:run`   | Run the docker container `midgard-graphql:latest`.                                                 |
| `dev`             | Run the application in dev mode. Runs with the `NODE_ENV=testnet` environment.                     |
| `dev:debug`       | As above but opens the running instance to the web inspector.                                      |
| `lint`            | Runs a combination of TypeScript type checking, ESLint and Prettier.                               |
| `lint:fix`        | Runs the above lint task but tries to fix / write any simple fixes                                 |
| `start`           | Runs the application in a production like mode currently with the `NODE_ENV=chaosnet` environment. |
| `test`            | Runs all the applications tests with Jest.                                                         |
| `test:coverage`   | As above but runs with the `--coverage` flag cor code coverage.                                    |
| `test:watch`      | Keeps the Jest test runner running in watch mode for changes.                                      |

## Debugging

Debugging TypeScript is exactly like debugging JavaScript with one caveat, you need source maps.

### Using the debugger in VS Code

You can debug in the following ways using the `.vscode/launch.json` tasks:

| Process                | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| **Run debug**          | Runs the application with `yarn dev:debug` and attaches the VSCode debugger. |
| **Test: All**          | Runs all the tests and allows debugging with break points.                   |
| **Test: Current File** | Runs the open and active test file in VSCode.                                |

## Testing

The [Jest](https://facebook.github.io/jest/) testing framework is used for testing and all the tests are located under the `./test/` directory. Simply run `yarn test`.

### Unit, Integration, E2Es

The testing approach is split across unit, integration and e2e tests.

1. **Unit testing**: Units have the `*.unit.ts` file extension. The unit tests have full mocking on all external dependencies.
2. **Integration testing**: Integrations have the `*.integration.ts` file extension. They use no mocking letting the underlying calls pass through and use snapshots for data.
3. **E2E testing**: The e2e tests are located under the `./test/e2e/` directory and use the [Nock](https://github.com/nock/nock) framework for intercepting HTTP calls.

## Linting & Prettifying

[ESLint](https://eslint.org) and [Prettier](https://prettier.io) are used in combination to help catch minor code quality and style issues.

### Running Linting

The linting and prettifying is all run through a single command

    yarn lint

## VSCode Extensions

To enhance your development experience while working in VSCode, a list of the suggested extensions for working with this project:

- [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Jest](https://marketplace.visualstudio.com/items?itemName=orta.vscode-jest)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
