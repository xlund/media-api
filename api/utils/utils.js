module.exports = function getFilename(origin) {
  return origin.split("/").pop();
};
