const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { createToken } = require("../utils/jwt");

const login = (req, res) => {
  // récupérer l'utilisateur dans la bdd via son email
  // si utilisateur check si le mdp est le même que le mdp passer dans le payload

  if (
    req.body.email !== "v.e.brochard@gmail.com" ||
    req.body.mdp !== "Azerty.51@"
  ) {
    return res.status(401).send({
      message: "invalid credentials",
    });
  }

  const payload = {
    id: 287,
    email: "v.e.brochard@gmail.com",
    fullname: "val brd",
    role: "admin",
  };

  const token = createToken(payload, 60 * 60);

  res.send({
    token: token,
  });
};

const activeAccount = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      throw new Error("no token");
    }

    const {email} = jwt.verify(token, process.env.JWT_SECRET_ACTIVE);
    await User.findOneAndUpdate({ email: email }, { is_confirmed : true});

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