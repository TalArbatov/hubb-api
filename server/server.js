const app = require('./app');
const http = require('http');

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`)
})

