const flash = require('connect-flash')

const applyMiddleware = app => {
    return app.use(flash())
        
}

module.exports = applyMiddleware

