const { Schema, model } = require("mongoose");
const { generateDate } = require("../utils/generateDate");
const movieSchema = new Schema({
  name: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
    index: true,
  },
  rating: {
    type: Number,
    require: true,
    index: true,
  },
  ticketPrice: {
    type: Number,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },

  genre: [String],
  photo: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: generateDate(),
  },
});

exports.Movie = model("Movie", movieSchema);
