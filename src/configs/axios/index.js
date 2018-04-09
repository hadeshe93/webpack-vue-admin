import axios from 'axios';
import IrmUtil from 'irm-util';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.transformRequest = function(data, headers){
  return IrmUtil.UtilQS.stringify(data);
};



export default axios;
