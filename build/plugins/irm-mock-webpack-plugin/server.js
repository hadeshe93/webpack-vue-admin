const express = require('express');
const chalk = require('chalk');
const returnData = require('./returnData.js');

const configPath = process.argv[2];
const config = require(configPath);
const port = Number(process.argv[3]);
const log = console.log;

log('\r\n\r\n');
log(configPath, port);
log(config);
log('\r\n\r\n');

// module.exports = function({config, port=3000}){
  if (!config) {
    log(chalk.red('No Configuration'));
    return false;
  }

  const mockPort = port || 3000;
  const app = express();

  // 将配置参数放置请求体里，方便后面的中间件可以使用
  app.use((req, res, next) => {
    req.config = config;
    next();
  });

  // 用自定义中间件处理请求
  app.use(returnData);

  // 启动server
  const server = app.listen(mockPort, function(){
    log('\r\n\r\n');
    log(chalk.red(JSON.stringify(server.address())));
    let host = server.address().address;
    let port = server.address().port;
    log(chalk.green(`Mock server is listening at http://${host}:${port}`));
    log('\r\n\r\n');
  });

// };
