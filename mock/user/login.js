const Mock = require('mockjs');

const mockData = function(){
  return Mock.mock({
    "code": 200,
    "msg": "登录成功",
    "data": {
      id: 123,
      token: 123123123,
    }
  });
};

module.exports = mockData;
