import STORAGE_CONFIGS from '@SRC/configs/storage/index.js'
import IrmUtil from 'irm-util';

const UtilStorage = IrmUtil.UtilStorage;
const UtilCrypto = IrmUtil.UtilCrypto;

const MANAGER = STORAGE_CONFIGS['MANAGER'];


const isLogin = ()=>{
  if (UtilStorage.lcGet(MANAGER)) {
    return true;
  }
  return false;
};

const login = (data)=>{
  console.log('成功登录');
  UtilStorage.lcSet(MANAGER, UtilCrypto.encrypt(data));
};

const logout = ()=>{
  console.log('成功登出账号');
  UtilStorage.lcRemove(MANAGER);
};

const getManager = ()=>{
  console.log('获取当前账号信息');
  return UtilCrypto.decrypt(UtilStorage.lcGet(MANAGER));
}

export default {
  isLogin,
  login,
  logout,
  getManager,
};
