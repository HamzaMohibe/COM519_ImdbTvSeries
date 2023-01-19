require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/User");

/**
 * Controllers (route handlers).
 */
const serieController = require("./controllers/serie");
const movieController = require("./controllers/movie");
const userController = require("./controllers/user");

const tvseriesApiController = require("./controllers/api/serie");
const moviesApiController = require("./controllers/api/movie");

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

app.use(
  expressSession({
    secret: "foo barr",
    cookie: { expires: new Date(253402300000000) },
  })
);

app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
});

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect("/");
  }
  next();
};

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect("/");
});

app.get("/sign_up", (req, res) => {
  res.render("sign_up", { errors: {} });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/series", serieController.list);
app.get("/series/delete/:id", serieController.delete);
app.get("/series/update/:id", serieController.edit);
app.post("/series/update/:id", serieController.update);
app.post("/add_tvseries", serieController.add);
app.get("/add_tvseries", authMiddleware, (req, res) => {
  res.render("add_tvseries", { errors: {} });
});

app.get("/movies", movieController.list);
app.get("/movies/delete/:id", movieController.delete);
app.get("/movies/update/:id", movieController.edit);
app.post("/movies/update/:id", movieController.update);
app.post("/add_movie", movieController.add);
app.get("/add_movie", authMiddleware, (req, res) => {
  res.render("add_movie", { errors: {} });
});

app.get("/sign_up", (req, res) => {
  res.render("sign_up", { errors: {} });
});
app.post("/sign_up", userController.create);

app.get("/login", (req, res) => {
  res.render("login", { errors: {} });
});
app.post("/login", userController.login);

app.get("/series", (req, res) => {
  res.render("series", tvseriesApiController);
});
app.get("/api/series", tvseriesApiController.list);

app.get("/movies", (req, res) => {
  res.render("movies", moviesApiController);
});
app.get("/api/movies", moviesApiController.list);

app.listen(WEB_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${WEB_PORT}`,
    chalk.green("✓")
  );
});
