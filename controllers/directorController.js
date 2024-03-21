const Director = require("../models/Director");
const Movie = require("../models/Movie");

const { errorHandler } = require("../utils/errorHandler.js");

const addDirector = async (req, res, next) => {
  try {
    const director = new Director(req.body);
    const data = await director.save();
    res.json({ director: data, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

const getAllDirectors = async (req, res) => {
  try {
    const data = await Director.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "director_id",
          as: "movies",
        },
      },
      {
        $unwind: {
          path: "$movies",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            name: "$name",
            surname: "$surname",
            bio: "$bio",
          },
          movies: {
            $push: "$movies",
          },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          name: "$_id.name",
          surname: "$_id.surname",
          movies: "$movies",
        },
      },
    ]);
    res.json({ directors: data, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

const getDirectorById = async (req, res, next) => {
  try {
    const director = await Director.findById(req.params.director_id);
    if (!director) {
      return next({ message: "The director was not found.", code: 99 });
    }

    const movies = await Movie.find({ director_id: director._id });

    res.json({ director, movies, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateDirector = async (req, res, next) => {
  try {
    const director = await Director.findByIdAndUpdate(
      req.params.director_id,
      req.body,
      {
        new: true,
      }
    );
    if (!director) {
      return next({ message: "The director was not found.", code: 99 });
    }
    res.json({ director: director, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteDirector = async (req, res, next) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.director_id);
    if (!director) {
      return next({ message: "The director was not found.", code: 99 });
    }
    res.json({ status: 1 });
  } catch (err) {
    errorHandler(err, res);
  }
};

const getBest10MoviesByDirector = async (req, res, next) => {
  try {
    const directorId = req.params.director_id;

    const movies = await Movie.find({ director_id: directorId })
      .sort({ imdb_score: -1 })
      .limit(10);

    if (!movies || movies.length === 0) {
      return next({ message: "No movies found for the director.", code: 99 });
    }

    res.json({ movies, status: true });
  } catch (err) {
    errorHandler(err, res);
  }
};

const addDirectorToMovie = async (req, res, next) => {
  try {
    const { movieId, directorId } = req.params;

    const movie = await Movie.findById(movieId);
    const director = await Director.findById(directorId);

    if (!movie) {
      return res
        .status(404)
        .json({ status: false, message: "Movie not found." });
    }

    if (!director) {
      return res
        .status(404)
        .json({ status: false, message: "Director not found." });
    }

    if (movie.director_id) {
      return res
        .status(400)
        .json({ status: false, message: "Movie already has a director." });
    }

    movie.director_id = directorId;
    director.movie = movieId;

    await Promise.all([movie.save(), director.save()]);

    res.json({
      status: true,
      message: "Director added to movie successfully.",
      movie: movie,
      director: director,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addDirector,
  getAllDirectors,
  getDirectorById,
  updateDirector,
  deleteDirector,
  getBest10MoviesByDirector,
  addDirectorToMovie,
};
