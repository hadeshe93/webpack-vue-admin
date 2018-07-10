const Mock = require('mockjs');

const mockData = function(){
  return Mock.mock({
    "code": 200,
    "msg": "登录成功",
    "data": {
      uid: 'Cyber Hades',
    }
  });
};

module.exports = mockData;
