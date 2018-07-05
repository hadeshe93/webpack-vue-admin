import List from './enums.js'
import IrmUtil from 'irm-util';

const UtilFilter = IrmUtil.UtilFilter;

export const accountLevelFilter = UtilFilter(List.ACCOUNT_LEVEL, 'key', 'value', '暂无信息');
export default {
  accountLevelFilter,
};
