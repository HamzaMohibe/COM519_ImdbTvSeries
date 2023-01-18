const Movie = require("../models/Movie");

exports.list = async (req, res) => {
  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await Movie.find({})
      .skip(perPage * page - perPage)
      .limit(limit);
    const count = await Movie.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);
    res.render("movies", {
      movies: movies,
      numberOfPages: numberOfPages,
      currentPage: page,
    });
  } catch (e) {
    res.status(404).send({ message: "Could Not list tv series" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Movie.findByIdAndRemove(id);
    res.redirect("/movies");
  } catch (e) {
    res.status(404).send({
      message: `could not delete movie ${id}.`,
    });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    res.render("update_movie", { movie: movie, id: id });
  } catch (e) {
    res.status(404).send({
      message: `could not find a movie ${id}.`,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.updateOne({ _id: id }, req.body);
    res.redirect("/movies/?message= movie has been updated");
  } catch (e) {
    res.status(404).send({
      message: `could not find movie ${id}.`,
    });
  }
};

exports.add = async (req, res) => {
  try {
    const movie = new Movie({
      title: req.body.title,
      overview: req.body.overview,
      original_language: req.body.original_language,
      vote_count: req.body.vote_count,
      vote_average: parseFloat(req.body.vote_average),
    });
    await movie.save();
    res.redirect("/movies/?message=movie has been added");
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render("add_movie", { errors: e.errors });
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
};
