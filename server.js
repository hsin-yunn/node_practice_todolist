const http = require('http');
const { v4: uuidv4 } = require('uuid');
const corsHeader = require('./helpers/corsHeader');
const responseHelper = require('./helpers/responseHelper');

const todos = [];

const requestListener = function (req, res) {
  const headers = corsHeader.headers;

  // body
  let body = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    body += chunk;
  });
  //api
  if (req.url == '/todos' && req.method == 'GET') {
    //get all todo
    responseHelper.successHandle(res, 200, todos);
  } else if (req.url.startsWith('/todo/') && req.method == 'GET') {
    // show todo
    const id = req.url.split('/').pop();
    const index = todos.findIndex((item) => item.id === id);
    if (index > -1) {
      responseHelper.successHandle(res, 200, todos[index]);
    } else {
      responseHelper.errorHandle(res, 400, 'data is not exist');
    }
  } else if (req.url == '/todo' && req.method == 'POST') {
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (!data.title) {
          // title required
          responseHelper.errorHandle(
            res,
            400,
            'data formart not correct or title is required',
          );
        } else {
          const todo = {
            id: uuidv4(),
            title: data.title,
          };
          todos.push(todo);
          responseHelper.successHandle(res, 201, todos);
        }
      } catch (err) {
        responseHelper.errorHandle(
          res,
          400,
          'data formart not correct or title is required',
        );
      }
    });
  } else if (req.url == '/todos' && req.method == 'DELETE') {
    //delete all todo
    todos.length = 0;
    responseHelper.successHandle(res, 200, todos, {
      message: 'todos deleted',
    });
  } else if (req.url.startsWith('/todo/') && req.method == 'DELETE') {
    // delete one todo
    const id = req.url.split('/').pop();
    const index = todos.findIndex((item) => item.id === id);
    if (index > -1) {
      todos.splice(index, 1);
      responseHelper.successHandle(res, 200, todos, {
        message: 'data is deleted',
      });
    } else {
      responseHelper.errorHandle(res, 400, 'data is not exist');
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
          todos[index].title = data.title;
          responseHelper.successHandle(res, 200, todos);
        } else {
          responseHelper.errorHandle(res, 400, 'data is not exist');
        }
      } catch (err) {
        responseHelper.errorHandle(
          res,
          400,
          'data formart not correct or title is required',
        );
      }
    });
  } else if (req.method === 'OPTIONS') {
    //OPTIONS
    res.writeHead(200, headers);
    res.end();
  } else {
    responseHelper.errorHandle(res, 404, 'page not found');
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || '3000');
