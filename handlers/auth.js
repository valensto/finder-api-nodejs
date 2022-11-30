const User = require("../models/user");

const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()

    res.send({
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "bad credentials"
    })
  }
};

const activeAccount = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      throw new Error("no token");
    }
    User.activeWithToken(token);

    res.status(301).redirect(`${process.env.BASE_URL}`)
  } catch (error) {
    res.status(401).send({
      message: "invalid token to active account",
    });
  }
};

module.exports = {
  login,
  activeAccount,
};