
const init = function(vm){
  // 注册内部的通信管道
  vm.$comm.register('H5WindowResize');
};

export default {
  init,
};
