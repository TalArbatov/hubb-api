const morgan = require('morgan');

const applyMiddleware = app => app.use(morgan('tiny'))

module.exports = applyMiddleware