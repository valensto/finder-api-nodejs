const express = require("express");
const { createFolder, getListFolders } = require("../handlers/folders");
const {isAuth, isAdmin} = require("../middlewares/auth")

const router = express.Router();

router.use(isAuth)
router.get("/", getListFolders);
router.post("/", isAdmin, createFolder);

module.exports = router;