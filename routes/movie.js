const express = require("express");
const {
  getAllMovies,
  getAMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");

const { movieCreationValidation } = require("../validations/movie");

const movieRouter = express.Router();

courseRouter.get("/", getAllMovies);
courseRouter.get("/:id", getAMovie);
courseRouter.post("/", movieCreationValidation, createMovie);
courseRouter.patch("/", updateMovie);
courseRouter.delete("/:id", deleteMovie);

module.exports = { movieRouter };
