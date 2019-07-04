const config = require("../config");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const https = require("https");
const http = require("http");

//setup mongodb connection via mongoose ORM
mongoose.connect(config.mongoURI, { useNewUrlParser: true }, err => {
  if (err) {
  } //console.log(`Failed to connect to ${config.mongoURI}, Error message: ${err}`)
  else console.log(`Sucessfully connected to ${config.mongoURI}`);
});

require("./models/UserSchema");
require("./models/HubSchema");
require("./models/PostSchema");

require("./passport/facebook-login");
require("./passport/google-login");

require("./passport/local-signup");
require("./passport/local-login");
require("./passport/jwt");
require("./passport/anonymous");

const applyMiddlewares = require("./middlewares");



//require passport modules

const PORT = config.port;

// var webpack = require('webpack');
// var webpackConfig = require('../webpack.config');

// var compiler = webpack(webpackConfig);

// app.use(require('webpack-dev-middleware')(compiler, {
//   publicPath: webpackConfig.output.path
// }));

// app.use(require('webpack-hot-middleware')(compiler));

applyMiddlewares(app);


app.set("port", PORT);

module.exports = app;

//app.listen()
