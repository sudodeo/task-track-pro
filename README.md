# Task Track Pro API

This is the API for the Task Track Pro application, a simple task tracking application that allows users to create, update, delete, and view tasks. This API is built using NestJS and TypeORM. Also implements a socket to stream the data created in real-time.


## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Use the following command to create a `.env` file in the root of the project and fill in the necessary environment variables:
   ```bash
   cp .env.example .env
   ```
4. Run `npm run start:dev` to start the development server

> Note: You need to have a PostgreSQL database running on your machine. You can use the docker-compose file to run the database and the application together if you have Docker installed on your machine. See the next section for instructions on how to run the application with Docker.

## Running the application with Docker

1. Use the following command to create a `.env` file in the root of the project and fill in the necessary environment variables:
   ```bash
   cp .env.example .env
   ```
2. Run `docker compose up --build` to build and start the application

3. Run `docker compose up` to start the application

## API Documentation

The API documentation can be found at `http://localhost:{PORT_defined_in_.env}/docs`

## Live Demo

A live demo of the application can be found [here](https://task-track-pro.sliplane.app/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
