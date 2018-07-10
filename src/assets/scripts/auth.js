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
  UtilStorage.lcSet(MANAGER, UtilCrypto.encrypt(data));
};

const logout = ()=>{
  UtilStorage.lcRemove(MANAGER);
};

const getManager = ()=>{
  return UtilCrypto.decrypt(UtilStorage.lcGet(MANAGER));
}

export default {
  isLogin,
  login,
  logout,
  getManager,
};
