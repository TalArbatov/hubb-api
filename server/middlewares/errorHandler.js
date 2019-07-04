/*
 * Express middleware is broken up into different types based on the number of arguments your middleware function takes.
 *  A middleware function that takes 4 arguments is classified as "error handling middleware",
 *  and will only get called if an error occurs.
 */

const config = require("../../config");
const console = require("chalkify");

const applyMiddleware = app => {
  //GENERAL 404 ERROR
  app.use("*", (req, res) => {
    res.status(404).send("404");
  });

  // ERROR HANDLER
  app.use((err, req, res, next) => {
    if (config.isPorduction) {
      return res.status(500).send("Something went wrong.");
    } else {
      console.error(err.message);
      return res.status(500).send(`Something went wrong: stacktrace: ${err.stack}`);
    }
  });

  return app;
};

module.exports = applyMiddleware;
