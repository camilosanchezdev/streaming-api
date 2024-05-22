# Streaming API

Streaming API is a simple and efficient API built using NestJS, Prisma, Postgres, and Swagger. This API provides CRUD operations for three main entities: Roles, Users, and Movies.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
- [Running the API](#running-the-api)
- [Running the tests](#running-the-tests)
- [API Documentation](#api-documentation)

## Technologies

This project is built with the following technologies:

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)

## Features

The Streaming API includes the following features for each entity (Roles, Users, Movies):

- Create
- Read (all and one)
- Update
- Delete

## Getting Started

To get started with running the API locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/camilosanchezdev/streaming-api.git
   cd streaming-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create the database:**

   Ensure you have PostgreSQL installed and running. Then create a database called `streaming`.

   ```sql
   CREATE DATABASE streaming;
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and populate it with the variables found in `.env-example`.

   ```bash
   cp .env-example .env
   ```

5. **Migrate the database schema:**

   Run the following command to deploy the Prisma schema to your PostgreSQL database.

   ```bash
   npx prisma migrate deploy
   ```

6. **Seed the database:**

   Seed the database with initial data.

   ```bash
   npx prisma db seed
   ```

7. **Run the application:**

   Start the NestJS application.

   ```bash
   npm start
   ```

## Running the API

Once the application is running, the API will be available at `http://localhost:5000`.

## Running the tests

You can run all the test using the command:

```bash
 npm run test
```

## API Documentation

The API is documented using Swagger. You can access the Swagger UI for the API documentation at `http://localhost:5000/docs`.

## License

This project is licensed under the MIT License.
