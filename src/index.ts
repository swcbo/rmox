import Rmox from './core/rmox';
const RmoxInstantce = Rmox.getInstance();
import GlobalProvider from './provider/GlobalProvider';
import { createModel } from './core/index'; // 导出默认模块
export { createModel, RmoxInstantce, GlobalProvider };
