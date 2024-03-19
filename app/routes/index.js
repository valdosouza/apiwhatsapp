const routes = require("express").Router();

const apiRouter = require("../routes/api.route");
routes.use("/", apiRouter);

module.exports = routes;