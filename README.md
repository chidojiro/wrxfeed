# Gravity Web

Web UI for Gravity.

## Environments

**Dev**

Website: http://dev.gravitylabs.co
API endpoint: http://dev-api.gravitylabs.co/api
API doc: http://dev-api.gravitylabs.co/api/doc
Netlify: https://app.netlify.com/sites/gravity-dev/overview

**Staging**

Website: http://staging.gravitylabs.co
API endpoint: http://staging-api.gravitylabs.co/api
API doc: http://staging-api.gravitylabs.co/api/doc
Netlify: https://app.netlify.com/sites/gravity-staging/overview

**Production**

Website: http://app.gravitylabs.co
API endpoint: http://api.gravitylabs.co/api
API doc: http://api.gravitylabs.co/api/doc
Netlify: https://app.netlify.com/sites/gravity-prod/overview

**Demo**

Website: http://demo.gravitylabs.co
API endpoint: http://demo-api.gravitylabs.co/api
API doc: http://demo-api.gravitylabs.co/api/doc
Netlify: https://app.netlify.com/sites/gravity-demo-app/overview

## Requirements

- Mac OS X, Windows, or Linux
- [Yarn](https://yarnpkg.com/) package + [Node.js](https://nodejs.org/) v12.16 or newer
- IDE: VSCode with [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed. Or any IDE that support ESLint integration.

## Running project locally

```sh
yarn install
cp .env.example .env
yarn && yarn start
```

## Development Workflow

This project use [GitHub flow](https://guides.github.com/introduction/flow/). The following table is the rule of branch name.

| name          | description                                                                               |
| :------------ | :---------------------------------------------------------------------------------------- |
| master        | production branch, master branch is always deployable.                                    |
| develop       | develop branch, develop branch is always deployable.                                      |
| staging       | staging branch, staging branch is always deployable.                                      |
| feat/{name}   | this branch is derived from master. use it when you develop a new function.               |
| fix/{name}    | this branch is derived from a master branch. use it when you fix bug.                     |
| hotfix/{name} | this branch is derived from a release tag. use it when you fix urgent bugs for a version. |

Your branch name is automatically checked when committing by [git-branch-is](https://github.com/kevinoid/git-branch-is).

Here's a typical workflow when working on a ticket

1. Make sure to create a branch and a pull request **before starting development**.

```sh
git checkout -b feat/setup-env-be
npm run preversion # check your branch name is correct format.
git commit --allow-empty -m "chore: setup env be"
```

2. Create a pull request in bitbucket, please prepend `[WIP]` to your pull request's title.
3. Start development of your task. Update the PR every day.
4. When you finish the task, remove `[WIP]` from the pull request's title, assign it to reviewer.

## Standards

### Code Style

- [TypeScript Style Guide](https://basarat.gitbook.io/typescript/styleguide).
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

### `yarn dev`

Same as `yarn start` but in watch mode.

### `yarn test`

Launch unit test runner with coverage information. Minimum coverage threshold is also configured for the test to pass.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `dist` folder.<br />

Your app is ready to be deployed!

### `yarn lint`

Launches the linter that analyzes source code to flag programming errors, bugs.

### `yarn storybook`

Runs the storybook of components.

## Deploy Automatically

Website will be deployed via Netlify.

**For Staging:** Whenever there is a new commit to `staging` branch, Netlify will trigger to build and deploy a new staging version automatically.

**For Production:** Whenever there is a new commit to `main` branch, Netlify will trigger to build a new production version automatically. For deploy a production version, you need to access Netlify and deploy manually in [Gravity-prod](https://app.netlify.com/sites/gravity-prod/overview)

Check deploy status above **Netlify deploy status**

## Technologies

- Create-react-app
- React, React Hook
- TypeScript
- SWR
- React-hook-form
- State management: React Context
- UI libs: Tailwind, headless UI, draft-js, popperjs, emoji-mart, recharts
- Storybook
- ESLint
- Github Actions (CI/CD)

## File structure

The app is mostly structured by features, with at most 2 level nesting (`./src` is exempted). e.g `src/admin/RoleDrawer/RoleDrawer.tsx`
https://reactjs.org/docs/faq-structure.html#grouping-by-features-or-routes

The is only one exception of `common`, which is structured by types

If you find any components not structured as mentioned above, please make them aligned with it.
