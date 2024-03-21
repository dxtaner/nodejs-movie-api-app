const express = require("express");
const router = express.Router();
const directorController = require("../controllers/directorController.js");

router.post("/", directorController.addDirector);
router.post(
  "/addDirectorToMovie/:movieId/:directorId",
  directorController.addDirectorToMovie
);
router.get("/", directorController.getAllDirectors);
router.get("/:director_id", directorController.getDirectorById);
router.put("/:director_id", directorController.updateDirector);
router.delete("/:director_id", directorController.deleteDirector);
router.get(
  "/:director_id/best10movie",
  directorController.getBest10MoviesByDirector
);

module.exports = router;
