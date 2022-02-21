# Clock

Frontend code repo for Overcast

Server repo: https://github.com/williamsk91/time

![Overcast](https://user-images.githubusercontent.com/25893551/155019675-4599b3c3-3247-4d7a-877a-7d1e97fa63bf.png)



# Stack

- Language - [Typescript](https://www.typescriptlang.org/)
- Framework - [React](https://reactjs.org/) ([CRA](https://create-react-app.dev/))
- GraphQL - [Apollo](https://www.apollographql.com/docs/react/api/react-apollo/)
- Styling - [styled-components](https://styled-components.com/)
- Calendar - [FullCalendar](https://fullcalendar.io/)

# Getting started

The following will set you up for development.

## Installation

First, install dependencies

```
yarn
```

## Start development

This will launch at [http://localhost:2000/](http://localhost:2000/)

```
yarn start
```

## Component library

Component library, including documentation is set up using [Storybook](https://storybook.js.org/)

```
yarn storybook
```

## GraphQL typings

GraphQL typing should not be done manually, instead be generated using [codegen](https://graphql-code-generator.com/)

```
yarn codegen
```
