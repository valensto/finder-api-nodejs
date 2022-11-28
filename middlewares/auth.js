const jwt = require("jsonwebtoken")

const isAuth = (req, res, next) => {
    try {
        const bearer = req.header("authorization");
        console.log(bearer);
        const token = bearer.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = decoded

        next();
    } catch (error) {
        res.status(401).send()
    }
}

const isAdmin = (req, res, next) => {
  if (req.currentUser.role !== "admin") {
    return res.status(401).send()
  }

  next()
};

module.exports = {
    isAuth,
    isAdmin
}