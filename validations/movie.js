const { body, param } = require("express-validator");

exports.movieCreationValidation = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("releaseDate").notEmpty().withMessage("releaseDate is required"),
  body("rating").notEmpty().withMessage("rating is required"),
  body("ticketPrice").notEmpty().withMessage("ticketPrice is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("genre").notEmpty().withMessage("genre is required"),
  body("photo").notEmpty().withMessage("photo is required"),
];

exports.movieUpdateValidation = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("releaseDate").notEmpty().withMessage("releaseDate is required"),
  body("rating").notEmpty().withMessage("rating is required"),
  body("ticketPrice").notEmpty().withMessage("ticketPrice is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("genre").notEmpty().withMessage("genre is required"),
  body("photo").notEmpty().withMessage("photo is required"),
];

exports.movieGetOneValidation = [
  param("id").trim().notEmpty().withMessage("amount is required"),
];
