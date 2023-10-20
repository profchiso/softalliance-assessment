const { Router } = require("express");
const {
  getAllMovies,
  getAMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");

const { movieCreationValidation } = require("../validations/movie");

const movieRouter = Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getAMovie);
movieRouter.post("/", movieCreationValidation, createMovie);
movieRouter.patch("/", updateMovie);
movieRouter.delete("/:id", deleteMovie);

module.exports = { movieRouter };
