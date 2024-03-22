
Node.js Movie API Application
=============================

This project provides a basic structure for creating a Node.js application. This application serves as an API for performing basic functions related to movies and directors.

Getting Started
---------------

### Prerequisites

To run this project, you'll need the following software and tools:

*   Node.js
*   npm or Yarn
*   A database (e.g., MongoDB)

### Installation

1.  Clone the project:

    git clone https://github.com/dxtaner/nodejs-movie-api-app.git

3.  Navigate to the project directory:

    cd nodejs-movie-api-app

5.  Install dependencies:

    npm install
    # or
    yarn install

7.  Configure the database connection:

You'll need a MongoDB database to run the project. Configure your database connection settings in the `config.js` file.

9.  Start the application:

    npm start
    # or
    yarn start

Or, to start in development mode:

    npm run dev
    # or
    yarn dev

13.  View the application in your browser at [http://localhost:3000](http://localhost:3000).

API Endpoints
-------------

List of available API endpoints and their descriptions.


### Movies

- `GET /api/movies`: Get all movies.
- `GET /api/movies/top10`: Get top 10 movies.
- `GET /api/movies/:movie_id`: Get movie by ID.
- `PUT /api/movies/:movie_id`: Update movie by ID.
- `DELETE /api/movies/:movie_id`: Delete movie by ID.
- `POST /api/movies`: Add a new movie.
- `GET /api/movies/between/:start_year/:end_year`: Get movies released between two years.




Usage
-----

You can manage movies and directors using the API. Refer to the documentation in the `routes` folder for more information about API routes.

Contributing
------------

Contributions are welcome! Feel free to share any issues or feedback in the [issues](https://github.com/dxtaner/nodejs-movie-api-app/issues) section or submit a pull request.

License
-------

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
