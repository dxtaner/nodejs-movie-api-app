const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController.js");

router.get("/", movieController.getAllMovies);
router.get("/top10", movieController.getTop10Movies);
router.get("/:movie_id", movieController.getMovieById);
router.put("/:movie_id", movieController.updateMovieById);
router.delete("/:movie_id", movieController.deleteMovieById);
router.post("/", movieController.addMovie);
router.get(
  "/between/:start_year/:end_year",
  movieController.getMoviesBetweenYears
);

module.exports = router;
