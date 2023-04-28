# Flash Link API

<p align="center">
  <img src="./assets/" alt="Flash Link Logo">
</p>

This project is a url shortener API build using Javascript with Typescript. The API is powered by Express as router, Mongoose for communication with database, MongoDB as the database, Swagger for API documentation and Jest for testing.

---

## Features

- Implementing an encoding to shorten urls to alphanumerics characters with length 6.
- Decouple code structure
- Using some design patters like adapter and factory
- Integrating Swagger for API documentation
- Implementing unit and integration tests to ensure API quality

## Live Version

You can check the documentation and perform tests to the API by visiting the live version hosted at []().

## Installation

To use this project, you need to follow these steps:

1. Clone the repository: `git clone https://github.com/rodrigofmeneses/flash-link.git`
2. Install the dependencies: `npm install`
3. Configure .env with `MONGO_URL` and `PORT`.
4. Build and run application: `npm run build && npm run dev`

## Used Tools

This project uses the following tools:

- [Node](https://nodejs.org/) + [Typescript](https://www.typescriptlang.org/) for backend development
- [Express](https://expressjs.com/) for route management
- [Mongoose](https://mongoosejs.com//) for database communication
- [MongoDB](https://mongodb.com/) as the database
- [Swagger](https://swagger.io/) for API documentation and testing

## Usage

After the API is running, you can use the Swagger UI to interact with the endpoints. The API can be accessed at `http://localhost:$PORT/docs`.

Default $PORT if not provided=7777.
