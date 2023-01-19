const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { Schema } = mongoose;

const tvseriesSchema = new Schema(
  {
    Title: { type: String, required: [true, "Title is required!"] },
    Release_Year: {
      type: String,
      required: [true, "Release year is required"],
    },
    Runtime: String,
    Genre: { type: String, required: [true, "Genre is required"] },
    Rating: { type: String, required: [true, "Rating is required"] },
    Cast: { type: String, default: "Not Known" },
    Synopsis: String,
  },
  { timestamps: true }
);

tvseriesSchema.index({ "$**": "text" });

module.exports = mongoose.model("Serie", tvseriesSchema);
