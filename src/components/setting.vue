<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-29 15:39:09
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-02 15:16:09
 * @Description: setting组件
 -->
<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <div class="switch-group">
        <span class="switch-label">页签模式</span>
        <el-switch v-model="needTags"></el-switch>
      </div>
    </div>
    <div class="drawer-item">
      <div class="drawer-item-title">语言设置</div>
      <el-radio-group v-model="language" @change="changeLanguage">
        <el-radio label="zh">中文</el-radio>
        <el-radio label="en">English</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script >
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
  computed,
  getCurrentInstance //就是当前实例
} from "vue";
import { useStore } from "vuex";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { Base64 } from "js-base64";
import md5 from "md5";
import { getStore, setStore } from "@/utils/utils";
export default {
  name: "Tags",
  setup(props, { refs, root }) {
    //实例化
    const { ctx } = getCurrentInstance();
    //const store = useStore();
    const router = useRouter();
    //定义变量
    const language = ref("")

    //const needTags = computed(() => ctx.$store.state.common.needTags);// 这就是制度属性
    // 函数
    const changeLanguage = (lan) => {
      ctx.language = lan;
      // ctx.$i18n.locale = lan;
      setStore("locale", lan);
      ctx.$message({
        message: "切换成功",
        type: "success"
      });
    }
    //计算属性的写法之一
    const needTags = computed({
      get: () => ctx.$store.state.common.needTags,
      set: val => { ctx.$store.dispatch('common/changeNeedTags', !needTags.value) }
    })
    onBeforeMount(() => {
      ctx.language = getStore("locale") ? getStore("locale") : "zh";
    })
    return {
      language,
      needTags,
      changeLanguage

    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 0 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-item {
    border-bottom: 1px solid #e8e8e8;
    padding: 24px 0;
    .drawer-item-title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
      margin-bottom: 12px;
    }
    .img-check-box {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      display: inline-block;
      cursor: pointer;
      .check-item {
        position: absolute;
        top: 0;
        width: 100%;
        padding-top: 10px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .switch-group {
      color: rgba(0, 0, 0, 0.65);
      margin: 20px 0;
      span {
        padding-right: 20px;
      }
      .switch-label {
        width: 48px;
        display: inline-block;
        vertical-align: middlel;
        text-align: right;
      }
    }
  }
}
</style>
