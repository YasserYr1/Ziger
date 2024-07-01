const multer = require("multer");

module.exports.photosMiddleware = multer({ dest: "uploads" });