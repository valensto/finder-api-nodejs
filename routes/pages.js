const express = require("express");
const { viewHome, viewContact } = require("../handlers/pages");
const router = express.Router();

router.get("/", viewHome);
router.get("/contact", viewContact);
router.get("/users", viewContact);

module.exports = router;
