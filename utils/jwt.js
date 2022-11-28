var jwt = require("jsonwebtoken");

const createToken = (payload, expiresIn, secret) => {
  return jwt.sign(payload, secret || process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

module.exports = {
  createToken,
};
