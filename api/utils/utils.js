const fs = require("fs");
module.exports = {
  getFilename: function (origin) {
    return origin.split("/").pop();
  },
  fileExist: function (path) {
    try {
      if (fs.existsSync(path)) {
        return true;
      }
    } catch (e) {
      return false;
    }
  },
};
