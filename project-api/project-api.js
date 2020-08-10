const app = require('./src/app');
const http = require('http');
//const ngrok = require('ngrok');
const port = process.env.PORT || '9000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port);