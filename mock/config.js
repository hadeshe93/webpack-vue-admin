const path = require('path');

const config = {
  '/test/data': {
    data: './test/data.js'
  },
  '/user/login': {
    data: './user/login.js'
  },
  '/user/getUserInfo': {
    data: './user/getUserInfo.js'
  },
}

for (let item in config) {
  if (config.hasOwnProperty(item))
    // 相当于这里再做一层判断过滤了
    config[item].path = path.resolve(__dirname, config[item].data);
}


module.exports = config;
