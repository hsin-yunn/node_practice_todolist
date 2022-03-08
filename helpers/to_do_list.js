const { v4: uuidv4 } = require('uuid');
module.exports = {
  test: function () {
    console.log('test helper');
    console.log(uuidv4());
  },
};
