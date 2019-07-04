const publicPath = require("path").join(__dirname, "..", "..", "client", "public");
const applyMiddleware = app => app.use(require("express").static(publicPath));

module.exports = applyMiddleware;
