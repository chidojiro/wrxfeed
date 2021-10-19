# Gravity Web

Web UI for Gravity fintech.

## Netlify deploy status

[![Netlify Status](https://api.netlify.com/api/v1/badges/bf53b711-3921-47e7-b1c0-e53f9995e189/deploy-status)](https://app.netlify.com/sites/wrxfeed/deploys)

## Requirements

- Mac OS X, Windows, or Linux
- [Yarn](https://yarnpkg.com/) package + [Node.js](https://nodejs.org/) v12.16 or newer
- IDE: VSCode with [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed. Or any IDE that support ESLint integration.


## Running project locally

```sh
cp .env.example .env
yarn && yarn start
```


## Development Workflow

This project use [GitHub flow](https://guides.github.com/introduction/flow/). The following table is the rule of branch name.

| name | description |
| :--- | :--- |
| master | production branch, master branch is always deployable. |
| feature/{name} | this branch is derived from master. use it when you develop a new function. |
| fix/{name} | this branch is derived from a master branch. use it when you fix bug. |
| hotfix/{name} | this branch is derived from a release tag. use it when you fix urgent bugs for a version. |

Your branch name is automatically checked when committing by [git-branch-is](https://github.com/kevinoid/git-branch-is).

Here's a typical workflow when working on a ticket

1. Make sure to create a branch and a pull request **before starting development**.

```sh
git checkout -b feature/setup-env-be
npm run preversion # check your branch name is correct format.
git commit --allow-empty -m "chore: setup env be"
```

2. Create a pull request in bitbucket, please prepend `[WIP]` to your pull request's title.
3. Start development of your task. Update the PR every day.
4. When you finish the task, remove `[WIP]` from the pull request's title, assign it to reviewer.


## Standards

### Code Style

- [TypeScript Style Guide](https://basarat.gitbook.io/typescript/styleguide) + [Airbnb Style Guide](https://github.com/airbnb/javascript).
- Code will be checked by linter (ESLint) before committing.
- Code pushing will be checked by unit test locally before transferring to remote repository. Unit test also has to pass test coverage minimum threshold defined in `jest.config.js` to ensure effective unit test.

### Commit message

- Commit message has to follow [conventional commit](https://conventionalcommits.org/) format.


### Branch name

- Check **Development Workflow** section.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn start:dev`

Same as `yarn start` but in watch mode.

### `yarn start:prod`

Runs the app in the production mode.

### `yarn test`

Launch unit test runner with coverage information. Minimum coverage threshold is also configured for the test to pass.

### `yarn test:e2e`

Launch end to end test.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `dist` folder.<br />

Your app is ready to be deployed!

### `yarn lint`

Launches the linter that analyzes source code to flag programming errors, bugs.


## Release and deploy

Application version is stored in `package.json`. The version number is updated automatically every time a new release is created. To create a new release and deploy to **test** environment automatically, run this command:

```sh
yarn release
```

## Deploy Automatically

Website will be deployed automatically via Netlify. Check deploy status above **Netlify deploy status**


## Technologies

- TypeScript v4.3
- React v17.0, React Hook
- Tailwind
- Storybook
- ESLint
- Github Actions (CI/CD)
