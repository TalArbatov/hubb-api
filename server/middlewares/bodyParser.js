const bodyParser = require('body-parser');

const applyMiddleware = app => app.use(bodyParser.json()).use(bodyParser.urlencoded({extended:true}))

module.exports = applyMiddleware