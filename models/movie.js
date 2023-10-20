const { Schema, model } = require("mongoose");
const { generateDate } = require("../utils/generateDate");
const movieSchema = new Schema({
  name: {
    type: String,
    index: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    require: true,
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
