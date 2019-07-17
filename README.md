### Job Applications Dashboard

#### Requirements
- Dashboard should show a list of all applications with the ability to sort and filter
- Manager should have the ability to fave or bookmark an application for later viewing
- Details of a specific application should be accessible
- Use JSON data as the input for your program in place of a REST API (see below)

#### Prerequisites
To build this application you must have [node.js](https://node.js) and [yarn](https://yarnpkg.com/en/) installed on your machine.  Use brew, apt-get etc. or just download it.

Run `yarn` from the root of the project to pull down dependencies.

#### Build and run
Build, start a dev web server, and launch a browser by running `yarn start` from the root of the project.

Or build an optimized bundle with `yarn build`.  You can serve up that bundle with a node pushstate server, install it with `yarn add -g pushstate-server` start it with `pushstate-server build` then open a browser `open http://localhost:9000`.

#### Notes
This application is front-end only, there is no back-end.  When the app starts it seeds all of its data from `applicants.json`.

The app config was generated using [create-react-app](https://github.com/facebookincubator/create-react-app)
