// import des lib et package nodejs
require("./db/mongoose")
const express = require("express");
const path = require("path");
const logger = require("morgan");
// import des sous routers
const initRouter = require("./routes");

// initialisation de l'app express
const app = express();

// enregistrement des différents middlewares de l'application
// initialisation du logger en mode dev
app.use(logger("dev"));

// initialisation du dossier public
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "public")));

// initialisation des routers de l'application
initRouter(app);

// export du module par defaut
module.exports = app;