const {
  getOne,
  getAll,
  updateDocument,
  deleteDocument,
  createDocument,
} = require("../utils/crudOperations");

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
