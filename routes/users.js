const express = require('express');
const {
  getUsers,
  createUser,
  getUserByID,
  deleteUserByID,
  updadeUserByID,
} = require("../handlers/users");
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

router.get("/:id", getUserByID);
router.delete("/:id", deleteUserByID);
router.put("/:id", updadeUserByID);

module.exports = router;
