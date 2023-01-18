const TvSeries = require("../models/Serie");

exports.list = async (req, res) => {
  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;
  try {
    const series = await TvSeries.find({})
      .skip(perPage * page - perPage)
      .limit(limit);
    const count = await TvSeries.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);
    res.render("series", {
      series: series,
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
    await TvSeries.findByIdAndRemove(id);
    res.redirect("/series");
  } catch (e) {
    res.status(404).send({
      message: `could not delete a tv series ${id}.`,
    });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const serie = await TvSeries.findById(id);
    res.render("update_tvseries", { serie: serie, id: id });
  } catch (e) {
    res.status(404).send({
      message: `Could not find a tv series ${id}.`,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const serie = await TvSeries.updateOne({ _id: id }, req.body);
    res.redirect("/series/?message= the tv series has been updated");
  } catch (e) {
    res.status(404).send({
      message: `Could not find a tv series ${id}.`,
    });
  }
};

exports.add = async (req, res) => {
  try {
    const tvseries = new TvSeries({
      Title: req.body.Title,
      Release_Year: req.body.Release_Year,
      Runtime: req.body.Runtime,
      Genre: req.body.Genre,
      Rating: req.body.Rating,
      Cast: req.body.Cast,
      Synopsis: req.body.Synopsis,
    });
    await tvseries.save();
    res.redirect("/series/?message=tv series has been added");
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render("add_tvseries", { errors: e.errors });
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
};
