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

To install the necessary packages within package.json run

    npm install

If the install was successful you should be able to run the following commands below
### Running unit tests
To run unit tests using jest run

    npm test

### Running integration tests
To run integration tests using supertest run

    npm run integration:test

### Running the project in dev
To start the dev nodemon server run

    npm run dev
You should see the below message saying what port the app is running printed in the console

    app running on 3000
    
### Example expected POST request
When posting to /tickets this is an example of the object the app expects.

Child and infant are optional for a successful call to the service, everything else is required.
```
{
  "accountInfo": {
    "id": 1
  },
  "tickets": {
    "ADULT": 2,
    "CHILD": 2,
    "INFANT":2
  }
}
```
### Swagger file api doc
The swagger api docs can be found at the path once the nodemon server is running

    /api-docs
    
### Building a docker image with the dockerfile
Build a docker image with the following

    docker build -t cinema-tickets
    
Check that the image has been created successfully with

    docker image ls
    
Run the docker container with the command below. It will map the ports to 3000, this can be changed to anything
    
    docker run -p 3000:3000
    
The app should be available on the port specified now
    

