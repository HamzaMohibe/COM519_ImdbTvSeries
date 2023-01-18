require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");

/**
 * Controllers (route handlers).
 */
const serieController = require("./controllers/serie");
const movieController = require("./controllers/movie");

const tastingApiController = require("./controllers/api/serie");

const app = express();
app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

const { WEB_PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/series", serieController.list);
app.get("/series/delete/:id", serieController.delete);
app.get("/series/update/:id", serieController.edit);
app.post("/series/update/:id", serieController.update);
app.post("/add_tvseries", serieController.add);
app.get("/add_tvseries", (req, res) => {
  res.render("add_tvseries", { errors: {} });
});

app.get("/movies", movieController.list);
app.get("/movies/delete/:id", movieController.delete);
app.get("/movies/update/:id", movieController.edit);
app.post("/movies/update/:id", movieController.update);
app.post("/add_movie", movieController.add);
app.get("/add_movie", (req, res) => {
  res.render("add_movie", { errors: {} });
});

app.get("/series", (req, res) => {
  res.render("series", tastingApiController);
});

app.get("/api/series", tastingApiController.list);

app.listen(WEB_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${WEB_PORT}`,
    chalk.green("✓")
  );
});
