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
  },
  releaseDate: {
    type: Date,
    default: generateDate(),
  },
  rating: [{ user: { type: Schema.Types.ObjectId }, rate: { type: Number } }],
  ticketPrice: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
  },

  genre: [String],
  photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: generateDate(),
  },
});

exports.Movie = model("Movie", movieSchema);
