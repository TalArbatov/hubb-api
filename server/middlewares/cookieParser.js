const applyMiddleware = app => app.use(require('cookie-parser')());

module.exports = applyMiddleware