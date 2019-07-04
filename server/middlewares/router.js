const router = require('../routes');

const applyMiddleware = app => app.use(router)

module.exports = applyMiddleware