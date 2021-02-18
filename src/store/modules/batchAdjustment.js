/*
 * @Author: xiaoyu.ren
 * @Date: 2019-06-19 13:47:56
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-04 15:19:06
 * @Description:
 */
import * as api from "@/api/loanafterManage";

const state = {
    list: {}, //批量调额列表
    searchData: {
        //批量调额查询搜索条件
        pageNum: 1,
        pageSize: 10
    },
    loading: false
};

const mutations = {
    saveList(state, response) {
        state.list = response;
        console.log(response, "response")
    },
    saveSearchData(state, response) {
        state.searchData = response;
    },
    saveLoading(state, response) {
        state.loading = response;
    }
};

const actions = {
    //批量调额查询
    queryList({
        commit
    }, params) {
        commit("saveLoading", true);
        api.getBatchAdjustmentsList(params).then(res => {
            commit("saveList", res.data);
            commit("saveLoading", false);
        });
    },
    saveSearchDataFN({
        commit
    }, params) {
        commit("saveSearchData", params);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};