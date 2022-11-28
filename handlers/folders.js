const fs = require("fs")
const slugify = require("slugify");
const { baseFoldersName } = require("../utils/upload");

const getListFolders = (req, res) => {
  let subpath = "";
  if (req.query.location) {
    subpath = req.query.location;
  }
  const path = baseFoldersName + subpath;

  const folders = [];
  try {
    fs.readdirSync(path, { withFileTypes: true }).forEach((f) => {
      if (f.isDirectory()) {
        folders.push(`/${f.name}`);
      }
    });
  } catch (error) {
    return res.status(400).send({
      message: "folder does not exist",
    });
  }

  res.status(200).send(folders);
};

const createFolder = (req, res) => {
  const slug = slugify(req.body.name);
  const dir = `${baseFoldersName}${req.body.location}/${slug}`;

  if (fs.existsSync(dir)) {
    return res.status(409).send({
      message: "folder already exist",
    });
  }

  fs.mkdirSync(dir, { recursive: true });
  res.status(201).send();
};

module.exports = {
  createFolder,
  getListFolders,
};
