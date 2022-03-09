const headers = {
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json',
};
module.exports = {
  todoEditErrHandle: function (res) {
    res.writeHead(400, headers);
    res.write(
      JSON.stringify({
        status: 'failed',
        message: 'data formart not correct or title is required',
      }),
    );
    res.end();
  },
  todoDeleteErrHandle: function (res) {
    res.writeHead(400, headers);
    res.write(
      JSON.stringify({
        status: 'failed',
        message: 'data is not exist',
      }),
    );
    res.end();
  },
};
