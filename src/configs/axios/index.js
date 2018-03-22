import axios from 'axios';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  console.log("错误的传参");
  return Promise.reject(error);
});

// 状态码200判断
axios.interceptors.response.use((res) => {
  if (res.status !== 200) {
    console.log(res.statusText);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  console.log("网络异常");
  return Promise.reject(error);
});

export default axios;
