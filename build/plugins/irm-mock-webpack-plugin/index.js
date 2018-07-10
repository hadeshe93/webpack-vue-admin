// const server = require('./server.js');
const path = require('path');
const { spawn, fork, execSync } = require('child_process');

const RUNNER_PATH = path.resolve(__dirname, './runner.js');
const SERVER_PATH = path.resolve(__dirname, './server.js');

function IrmMockWebpackPlugin({config, port = 3000}) {
    // 将config和port放在属性里，方便apply方法调用
    this.config = config;
    this.port = port;
}

IrmMockWebpackPlugin.prototype.apply = function (compiler) {
    // 调用启动express的函数
    spawn('nodemon', [SERVER_PATH, this.config, this.port], {
      stdio: 'inherit', // 子进程使用父进程的 stdios
      shell: true,
    });

    // 注册一个webpack插件
    compiler.plugin("emit", (compilation, callback) => {
      callback();
    });
}

module.exports = IrmMockWebpackPlugin;
