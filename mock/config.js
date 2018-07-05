const path = require('path');

const config = {
  '/tst/data': {
    data: './test.js'
  },
  '/admin/login': {
    data: './test.js'
  }
}

for (let item in config) {
  if (config.hasOwnProperty(item))
    config[item].path = path.resolve(__dirname, config[item].data);
}
console.log(config);
module.exports = config;
