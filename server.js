console.log('object');
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200, { 'Content-Type': 'Text/plain' });
  res.write('hello world');
  res.end();
};

const server = http.createServer(requestListener);
server.listen('3000');
