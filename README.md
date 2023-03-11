# cinema-tickets-javascript - a ticketing service app
A simple project to handle ticket purchase requests to be sent to third party APIs for payment and seat reservation

### Technologies used
- NodeJS
- Express
- Router
- Swagger-ui-express
- Jest
- Supertest

### Install
To install the necessary packages within package.json run:

npm install

If the install was successful you should be able to run the following commands below
### Running unit tests
To run unit tests using jest run:

    npm test

### Running integration tests
To run integration tests using supertest run:

    npm run integration:test

### Running the project in dev
To start the dev nodemon server run:

    npm run dev
you should see the below message saying what port the app is running printed in the console

    app running on 3000
    
### Swagger file api doc
the swagger api docs can be found at the path once the nodemon server is running:

    /api-docs
