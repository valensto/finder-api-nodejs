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
// http://localhost:3000/api/users?page=2&limit=20&search=val
router.post("/", createUser);

router.get("/:id", getUserByID);
// http://localhost:3000/api/users/12345

router.delete("/:id", deleteUserByID);
router.put("/:id", updadeUserByID);

module.exports = router;
