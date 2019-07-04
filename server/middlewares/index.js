const bodyParser = require("./bodyParser");
const router = require("./router");
const static = require("./static");
const cookieParser = require("./cookieParser");
const passport = require("./passport");
const misc = require("./misc");
const session = require("./session");
const morgan = require("./morgan");
const errorHandler = require("./errorHandler");
const staticFallback = require('./staticFallback')
const middlewares = [
  bodyParser,
  static,
  cookieParser,
  session,
  morgan,
  misc,
  passport,
  router,
  staticFallback,
  errorHandler,
  
];

const applyMiddlewares = app => {
  middlewares.forEach(middleware => {
    return middleware(app);
  });
};

module.exports = applyMiddlewares;
