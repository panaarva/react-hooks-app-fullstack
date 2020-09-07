const app = require('./src/app');
const http = require('http');
//const ngrok = require('ngrok');
const port = process.env.PORT || '9000';
const fs = require('fs');
app.set('port', port);

const server = http.createServer({
    key: "82b23a59-1bdd-4c2e-bfb5-8dcab057c0bc",
    cert: 'eb353a44-80e5-4bfe-86d0-40ad86185082'
},app);

server.listen(port);