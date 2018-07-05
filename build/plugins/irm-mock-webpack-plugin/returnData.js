const fs = require('fs');

module.exports = async function(req, res, next) {
  const config = req.config;

  // 判断请求的接口在配置中
  if (config[req.path]) {
    const data = await readData(config[req.path].path);
    res.send(data);
  } else {
    // 如果接口没在配置中，返回错误信息
    res.send({
      errno: -1,
      msg: 'No such proxy: ' + req.path
    });
  }
  next();
};

// 使用 promise 封装 fs.readFile，方便使用 async/await
function readData(filePath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      // 无论是 json 还是 js 文件都可以读取
      if (require.cache[filePath]) {
        // 清除缓存
        delete require.cache[filePath];
      }
      const mockData = require(filePath);
      resolve(mockData());
    } else {
      let msg = `File: ${filePath} doesn't exist !`;
      console.err(msg);
      reject(msg);
    }
  })
}
