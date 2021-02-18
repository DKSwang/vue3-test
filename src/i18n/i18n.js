/*
 * @Author: xxuzhong.wang
 * @Date: 2021-01-28 16:48:31
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-01-28 17:06:02
 * @Description: 
 */
import {
    createApp
} from 'vue'
import {
    createI18n
} from 'vue-i18n'
import locale from 'element-plus/lib/locale'
import zh from "./langs/zh";
import en from "./langs/en";
import ElementPlus from 'element-plus'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
const app = createApp(App)
app.use(createI18n);

const messages = {
    en: Object.assign(en, enLocale),
    zh: Object.assign(zh, zhLocale)
};

const i18n = createI18n({
    locale: window.localStorage.getItem("locale") || "zh",
    messages
});

locale.i18n((key, value) => i18n.t(key, value)); //为了实现element插件的多语言切换

export default i18n;