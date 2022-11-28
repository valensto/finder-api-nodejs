const express = require("express");
const { login, activeAccount } = require("../handlers/auth");

const router = express.Router();

router.post("/login", login)
router.get("/active-account", activeAccount);

module.exports = router;
