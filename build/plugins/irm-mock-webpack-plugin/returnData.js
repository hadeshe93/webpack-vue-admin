const fs = require('fs');

module.exports = async function(req, res, next) {
  const config = req.config;

  res.setHeader("Content-Type", "application/json");
  // 判断请求的接口在配置中
  if (config[req.path]) {
    const data = await readData(config[req.path].path, req);
    res.send(data);
  } else {
    // 如果接口没在配置中，返回错误信息
    res.send({
      code: 404,
      msg: 'No such proxy: ' + req.path,
      data: [],
    });
  }
  next();
};

// 使用 promise 封装 fs.readFile，方便使用 async/await
function readData(filePath, req) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      // 无论是 json 还是 js 文件都可以读取
      if (require.cache[filePath]) {
        // 清除缓存
        delete require.cache[filePath];
      }
      const mockData = require(filePath);
      // 将请求对象传入伪造数据函数中，将能获得更好的定制
      resolve(mockData(req));
    } else {
      let msg = `File: ${filePath} doesn't exist !`;
      console.err(msg);
      reject(msg);
    }
  });
}
