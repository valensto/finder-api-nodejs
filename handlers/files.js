const multer = require("multer");
const fs = require("fs");
const { getMulterDiskStorage, baseFoldersName } = require("../utils/upload");

const uploadFile = (req, res) => {
  try {
    const location = req.query.location || "default";
    const dir = `${baseFoldersName}/${location}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const storage = getMulterDiskStorage(dir);
    const upload = multer({ storage: storage }).single("file");

    upload(req, res, (err) => {
      if (err) {
        res.status(400).send("Something went wrong");
      }
      res.status(201).send();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong during upload",
    });
  }
};

module.exports = {
  uploadFile,
};
