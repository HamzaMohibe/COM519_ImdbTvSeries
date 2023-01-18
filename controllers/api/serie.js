const TvSeries = require("../../models/Serie");
exports.list = async (req, res) => {
  const searchQuery = req.query.search;

  if (!searchQuery) {
    res.json([]);
  }

  try {
    const Result = await TvSeries.find(
      { $text: { $search: searchQuery } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(50);
    res.json(Result);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: `could not perform search`,
    });
  }
};
