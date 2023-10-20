const {
  getOne,
  getAll,
  updateDocument,
  deleteDocument,
  createDocument,
} = require("../utils/crudOperations");
const { validationCheck } = require("../utils/validationCheck");
const { uploadFile } = require("../utils/imageProcessing");
const { capitalize } = require("../utils/capitalize");

const { Movie } = require("../models/movie");

const populate = {
  required: false,
  field: "field to populate",
  columns: "columns to populate",
};
exports.getAllMovies = async (req, res) => {
  try {
    getAll(req, res, Movie, [], populate, "Movies fetched successfully");
  } catch (error) {
    console.log(error);
  }
};
exports.getAMovie = async (req, res) => {
  try {
    getOne(req, res, Movie, [], populate, "Movie fetched successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.createMovie = async (req, res) => {
  try {
    await validationCheck(req, res);
    const mediaURLuploaded = await uploadFile(req, "photo", "movie-photos");
    req.body.photo = mediaURLuploaded;
    const { name, description, country } = req.body;

    //capitalize necessary fields
    req.body.name = capitalize(name);
    req.body.description = capitalize(description);
    req.body.country = capitalize(country);

    createDocument(req, res, Movie);
  } catch (error) {
    console.log(error);
  }
};

exports.updateMovie = async (req, res) => {
  try {
    updateDocument(req, res, Movie);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    deleteDocument(req, res, Movie);
  } catch (error) {
    console.log(error);
  }
};
