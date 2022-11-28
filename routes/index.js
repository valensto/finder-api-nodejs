const express = require("express");
// import des sous routers
const usersRouter = require("./users");
const filesRouter = require("./files");
const foldersRouter = require("./folders");
const authRouter = require("./auth");
const pagesRouter = require("./pages");

// creer un router pour les routes de l'api
const apiRouter = express.Router();

const initRouter = (app) => {
  // formater le body des requetes en JSON par defaut
  apiRouter.use(express.json());

  // enregistrement des routes de l'api
  apiRouter.use("/users", usersRouter);
  apiRouter.use("/files", filesRouter);
  apiRouter.use("/folders", foldersRouter);
  apiRouter.use("/auth", authRouter);

  // injection du router de l'api dans l'app express
  app.use("/api", apiRouter);

  // injection du router des pages dans l'app express
  app.use(pagesRouter);
};

// export du module par defaut
module.exports = initRouter;
