const {createToken} = require("../utils/jwt")

const login = (req, res) => {
  // récupérer l'utilisateur dans la bdd via son email
  // si utilisateur check si le mdp est le même que le mdp passer dans le payload

  if (
    req.body.email !== "v.e.brochard@gmail.com" ||
    req.body.mdp !== "Azerty.51@"
  ) {
    return res.status(401).send({
        message: "invalid credentials"
    });
  }

  const payload = {
    id: 287,
    email: "v.e.brochard@gmail.com",
    fullname: "val brd",
    role: "admin",
  };

  const token = createToken(payload, 60 * 60)
  
  res.send({
    token: token,
  });
};

module.exports = {
  login,
};
