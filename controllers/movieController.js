const Movie = require("../models/Movie.js");
const { errorHandler } = require("../utils/errorHandler.js");

// Get all movies with directors
const getAllMovies = async (req, res) => {
  try {
    const data = await Movie.aggregate([
      {
        $lookup: {
          from: "directors",
          localField: "director_id",
          foreignField: "_id",
          as: "director",
        },
      },
      {
        $unwind: {
          path: "$director",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    res.json({ movies: data, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

// Get top 10 movies
const getTop10Movies = async (req, res) => {
  try {
    const data = await Movie.find({}).limit(10).sort({ imdb_score: -1 });
    res.json({ movie: data, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

// Get a movie by ID
const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movie_id);
    console.log(movie);

    if (!movie) {
      return next({
        status: false,
        message: "The movie was not found.",
        code: 99,
      });
    }

    res.json({ movie: movie, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

// Update a movie by ID
const updateMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.movie_id, req.body, {
      new: true,
    });

    if (!movie) {
      return next({
        status: false,
        message: "The movie was not found.",
        code: 99,
      });
    }

    res.json({ movie: movie, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

// Delete a movie by ID
const deleteMovieById = async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.movie_id);

    if (!deletedMovie) {
      return next({
        message: "The movie was not found.",
        code: 99,
      });
    }

    res.json({ deletedMovie, success: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

// Add a new movie
const addMovie = async (req, res, next) => {
  try {
    const movie = new Movie(req.body);

    const data = await movie.save();

    res.json({ movie: data, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

// Get movies between two years
const getMoviesBetweenYears = async (req, res) => {
  try {
    const { start_year, end_year } = req.params;
    const data = await Movie.find({
      year: { $gte: parseInt(start_year), $lte: parseInt(end_year) },
    });

    res.json({ movie: data, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  getAllMovies,
  getTop10Movies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  addMovie,
  getMoviesBetweenYears,
};
