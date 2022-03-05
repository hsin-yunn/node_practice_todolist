const http = require('http');
const toDoListService = require('./helpers/to_do_list');

const requestListener = function (req, res) {
  const headers = {
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json',
  };

  if (req.url == '/todolist') {
    toDoListService.test();
    res.writeHead(200, { 'Content-Type': 'Text/plain' });
    res.write('hello world');
    res.end();
  } else if (req.url == '/to-do-item' && req.method == 'GET') {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 'success',
        data: [
          {
            id: 1,
          },
        ],
      }),
    );
    res.end();
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: 'failed',
        message: 'page not found',
      }),
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen('3000');
