# goTenna Photo Viewer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Packages Used
* Create React App (React, React-Dom, React-Router-Dom, Babel, Webpack)
* Express
* Material-UI
* ES Lint
* React-Grid-Gallery
* Mongoose
* MongoDB
* dotenv

## How to Install dependencies

First install dependencies for client and server. While in root of the folder execute the following commands:

```sh
cd api
yarn install
```

```sh
cd client
yarn install
```

## How to Run

### Server

The server utilizes MongoDB to pull in data with the use of API calls. If you don't have MongoDB currently on your computer, you will have to set that up first.
Once you have MongoDB configured on your computer or cloud, you will then have to create a .env file to connect the server to the MongoDB database. I have provided an example .env file called ".env.example", enter the configuration needed for the fields provided in order to connect the database with the server and rename it to ".env".

#### Seeding

I have provided a script that will automatically seed the MongoDB database with data provided from a spreadsheet file. From the root folder, execute the following commands:

```sh
cd api
yarn seed
```

To run the server, while in the API directory:

```sh
yarn run
```

The server runs using nodemon so it automatically restarts in case there is a change with the server.

### Client

The client utilizes React along with other library to build out the components necessary for the photo gallery. The server must be up and running first before attempting to run the client. To run the client from the client directory:

```sh
yarn run
```