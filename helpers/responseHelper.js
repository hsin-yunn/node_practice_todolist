const corsHeader = require('./corsHeader');
const headers = corsHeader.headers;

module.exports = {
  errorHandle(res, statusCode, message) {
    res.writeHead(statusCode, headers);
    res.write(
      JSON.stringify({
        status: 'failed',
        message: message,
      }),
    );
    res.end();
  },
  successHandle(res, statusCode, data, message) {
    res.writeHead(statusCode, headers);
    let response = {
      status: 'success',
      data: data,
    };
    if (message) {
      response = {
        ...response,
        ...message,
      };
    }
    res.write(JSON.stringify(response));
    res.end();
  },
};
