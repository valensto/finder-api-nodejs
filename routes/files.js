const express = require("express");
const { uploadFile } = require("../handlers/files");
const router = express.Router();

router.post("/", uploadFile);

module.exports = router