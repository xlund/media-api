const health = (req, res, next) => {
  res.status(200).send("OK");
};

module.exports = {
  health,
};
