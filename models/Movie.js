const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { Schema } = mongoose;

const moviesSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    overview: String,
    original_language: String,
    vote_count: Number,
    default: 0,
    vote_average: {
      type: Number,
      required: [true, "Vote average is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", moviesSchema);
