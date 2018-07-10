const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const returnData = require('./returnData.js');

const mockPath = process.argv[2];
const logPath = path.resolve(mockPath, './dev.log');
const config = require(path.resolve(mockPath, './config.js'));
const port = Number(process.argv[3]);
const log = console.log;

if (!config) {
  log(chalk.red('No Configuration'));
  return false;
}

const mockPort = port || 3000;
const app = express();
const accessLogStream = fs.createWriteStream(logPath, {flags: 'a+'});

app.use(logger('dev', {stream: accessLogStream}));
app.use(cookieParser());
app.use(bodyParser.json());

// 如果表单以 form-data 形式上传你的
app.use((req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files)=>{
    req.form = { err, fields, files };
  });
  next();
});

// 将配置参数放置请求体里，方便后面的中间件可以使用
app.use((req, res, next) => {
  req.config = config;
  next();
});

// 用自定义中间件处理请求
app.use(returnData);

// 启动server
const server = app.listen(mockPort, function(){
  log(chalk.red(JSON.stringify(server.address())));
  let host = server.address().address;
  let port = server.address().port;
  log(chalk.green(`Mock server is listening at http://${host}:${port}`));
});
