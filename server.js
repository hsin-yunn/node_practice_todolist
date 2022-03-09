const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errorHelper = require('./helpers/errorHelper');

const todos = [];

const requestListener = function (req, res) {
  const headers = {
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json',
  };

  // body
  let body = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    body += chunk;
  });
  //api
  if (req.url == '/todos' && req.method == 'GET') {
    //get all todo
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 'success',
        data: todos,
      }),
    );
    res.end();
  } else if (req.url == '/todo' && req.method == 'GET') {
    // show todo
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
  } else if (req.url == '/todo' && req.method == 'POST') {
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (!data.title) {
          // title required
          errorHelper.todoEditErrHandle(res);
        } else {
          res.writeHead(201, headers);
          const todo = {
            id: uuidv4(),
            title: data.title,
          };
          todos.push(todo);
          res.write(
            JSON.stringify({
              data: todo,
            }),
          );
          res.end();
        }
      } catch (err) {
        errorHelper.todoEditErrHandle(res);
      }
    });
  } else if (req.url == '/todos' && req.method == 'DELETE') {
    //delete all todo
    todos.length = 0;
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 'success',
        message: 'todos deleted',
        data: todos,
      }),
    );
    res.end();
  } else if (req.url.startsWith('/todo/') && req.method == 'DELETE') {
    // delete one todo
    const id = req.url.split('/').pop();
    const index = todos.findIndex((item) => item.id === id);
    if (index > -1) {
      todos.splice(index, 1);
      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          status: 'success',
          message: 'data is deleted',
          data: todos,
        }),
      );
      res.end();
    } else {
      errorHelper.todoDeleteErrHandle(res);
    }
  } else if (req.url.startsWith('/todo/') && req.method == 'PATCH') {
    // update one todo
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const id = req.url.split('/').pop();
        const index = todos.findIndex((item) => item.id === id);
        if (data.title && index > -1) {
          // title required
          res.writeHead(200, headers);
          todos[index].title = data.title;
          res.write(
            JSON.stringify({
              data: todos[index],
            }),
          );
          res.end();
        } else {
          errorHelper.todoEditErrHandle(res);
        }
      } catch (err) {
        errorHelper.todoEditErrHandle(res);
      }
    });
  } else if (req.method === 'OPTIONS') {
    //OPTIONS
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
