const session = require('express-session');

const applyMiddleware = app => app.use(session({
    secret: require('../../config').sessionSecret,
    resave: true,
    saveUninitialized: true 
})) 

module.exports = applyMiddleware