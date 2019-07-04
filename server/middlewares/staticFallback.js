//used as a catch-all method to re-direct client-side routing 
const publicPath = require("path").join(__dirname, "..", "..", "client", "public");

const applyMiddleware = app => {
    app.get('/*', (req,res) => {
        res.sendFile(require('path').join(publicPath, 'index.html'))
    })
    
return app;    
}

module.exports = applyMiddleware