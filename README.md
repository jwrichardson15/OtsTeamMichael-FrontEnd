# National Parks Frontend

React frontend for National Parks ticket service

## Running the backend

The backend is expected to be available at `http://localhost:8080`. Consult the backend documentation to get this running.

## Running the application

With the backend running, the application can be started with

    npm start

If it is your first time running or dependencies have changed since your last run, you will need to install the dependencies

    npm install

## Running Tests

Tests can be run with

    npm test -- --coverage

This will produce test coverage results in `national_parks/coverage/`.

## Packaging the production site

The production site can be packaged with:

    npm run build

This will produce the needed files in `national_parks/build/`.

## Continuous Integration

Continuous Integration is provided by Amazon CodeBuild, with the test configuration available in `buildspec_test.yml`. On each pull request and push, the code will be pulled and tested, with the test status reported back to Github.

## Continuous Deployment

Continuous Deployment is provided by Amazon CodePipeline, with the build configuration available in `buildspec_build.yml`. On each commit to `master`, the code will be pulled, tested, built, and deployed to S3.
