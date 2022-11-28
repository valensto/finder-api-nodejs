const multer = require("multer");
const slugify = require("slugify");

const baseFoldersName = "./uploads"

const getMulterDiskStorage = (dir) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${slugify(file.originalname)}`);
    },
  });
};

module.exports = {
  getMulterDiskStorage,
  baseFoldersName
};
