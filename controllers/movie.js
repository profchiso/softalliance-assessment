const {
  getOne,
  getAll,
  updateDocument,
  deleteDocument,
  createDocument,
} = require("../utils/crudOperations");

const { Movie } = require("../models/movie");

exports.getAllMovies = async (req, res) => {
  try {
    getAll(req, res, Movie, MovieExcludedFields);
  } catch (error) {
    console.log(error);
  }
};
exports.getAMovie = async (req, res) => {
  try {
    getOne(req, res, Movie, MovieExcludedFields);
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
