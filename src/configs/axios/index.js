import axios from 'axios';
import IrmUtil from 'irm-util';

// 所有 api 请求均在该域名下
axios.defaults.baseURL = '';
// 请求超时时间
axios.defaults.timeout = 5000;
// POST 请求的默认 Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 更改请求参数
axios.defaults.transformRequest = function(data, headers){
  if (data instanceof FormData) {
    headers.post['Content-Type'] = 'multipart/form-data';
    return data;
  }
  return IrmUtil.UtilQS.stringify(data);
};

// 设置 axios 的请求拦截器
const setReqInterceptor = (vm)=>{
  axios.interceptors.request.use((config) => {
    /**
     * 区分 mock 和正式的 api
     * - mock：走本地 proxy 代理服务器
     * - 正式：走正式 api 服务器
     */
    if (config.url.indexOf('/mock') !== -1) {
      config.baseURL = '';
    }
    config.params = (config.params && (typeof config.params === 'object')) ? config.params : {};
    // 删除空的 params 属性
    vm.$util.UtilBlade.delEmptyAttr(config.params);
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
};

// 设置 axios 的响应拦截器
const setRspInterceptor = (vm)=>{
  axios.interceptors.response.use((res) => {
    let code = res.data.code;
    let msg = res.data.msg;
    let data = res.data.data;

    if (code == 403 && msg==="认证失败，请重新认证"
      && (data==="无效的 Token 值" || data==="缺少必要参数 token")) {
      // 登出账号
      vm.$router.replace('/login?from=logout');
      vm.$Message.error(msg);
      return Promise.reject(res);
    } else if (`${code}`[0] !== '2') {
      let data = res.data.data;
      vm.$Message.error(`${res.data.msg}${data?('：'+data):''}`);
      return Promise.reject(res);
    }
    return res;
  }, (error) => {
    vm.$Message.error('网络错误，请联系系统管理员~');
    return Promise.reject(error);
  });
};

const axiosConfig = {
  setReqInterceptor,
  setRspInterceptor,
};

export default axios;
export { axiosConfig };
