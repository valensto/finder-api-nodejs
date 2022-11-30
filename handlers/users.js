const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save();

    user.sendValidationEmail();

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
};

const updadeUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body);
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserByID,
  deleteUserByID,
  updadeUserByID,
};
