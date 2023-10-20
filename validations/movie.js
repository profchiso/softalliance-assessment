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
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("releaseDate")
    .notEmpty()
    .withMessage("Release Date is required")
    .isDate()
    .withMessage("Release Date must be a valid date"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),

  body("ticketPrice")
    .notEmpty()
    .withMessage("Ticket Price is required")
    .isNumeric()
    .withMessage("Ticket Price is required to be a number"),

  body("country").notEmpty().withMessage("Country is required"),

  body("genre")
    .notEmpty()
    .withMessage("Genre is required")
    .isArray()
    .withMessage("Genre  is expected to be any array of string"),

  body("photo")
    .notEmpty()
    .withMessage("Photo is required")
    .isBase64()
    .withMessage("Photo is expected to be a base64 string"),
];

exports.movieGetOneValidation = [
  param("id").trim().notEmpty().withMessage("amount is required"),
];
