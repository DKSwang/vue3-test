/*
 * @Author: xxuzhong.wang
 * @Date: 2021-01-27 16:33:27
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-07 10:14:02
 * @Description: 
 */
import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios';
//引入UI组件
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {
    ElMessage
} from 'element-plus'
//引入插件
import moment from "moment";
import bus from "./utils/eventBus"
import ZkTable from "vue-table-with-tree-grid";
//import i18n from "./i18n/i18n";
//引入全局封装的东西
import baseURL from "@/api/api"; //公共的url前缀
//引入自定义指令
import "./directives";
//引入公共样式
import "./assets/commonLess/common.scss";
import "./assets/commonLess/components.scss";
import "./assets/iconFont/iconfont.css";
import "./assets/commonLess/wrapper.scss";
//引入滑动验证
import SlideVerify from 'vue-monoplasty-slide-verify';
//实例化vue
const app = createApp(App);
//对$message进行二次封装
let package_message = (options) => {
    ElMessage.closeAll();
    ElMessage({
        message: options.message,
        type: options.type,
        duration: 2000,
        onClose: options.onClose
    });
}
//进行全局注册
app.config.globalProperties.$message = package_message;
app.config.globalProperties.$moment = moment;
//国际化
// app.use(element, {
//     i18n: (key, value) => i18n.t(key, value)
// });
//引入全局封装的东西
app.config.globalProperties.$baseUrl = baseURL.baseURL;
app.config.globalProperties.$http = axios;
app.config.globalProperties.$bus = bus;
app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(SlideVerify)
    .use(ZkTable)
    //.use(i18n)
    .mount('#app')