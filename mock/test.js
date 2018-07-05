const Mock = require('mockjs');

const mockData = function(){
  return Mock.mock({
    "code": 200,
    "msg": "数据获取成功",
    "data|6": [{
      'id|+1': 1,
    }]
  });
};

module.exports = mockData;
