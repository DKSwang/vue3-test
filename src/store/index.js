/*
 * @Author: xxuzhong.wang
 * @Date: 2021-01-27 16:33:27
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-04 11:11:32
 * @Description: 
 */
import {
    createStore
} from 'vuex'
import login from "./modules/login"
import common from "./modules/common"
import modifyPassword from "./modules/modifyPassword"
import batchAdjustment from "./modules/batchAdjustment"
export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        login,
        common,
        modifyPassword,
        batchAdjustment
    }
})