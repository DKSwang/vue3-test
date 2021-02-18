<!--
 * @Author: xxuzhong.wang
 * @Date: 2021-01-29 18:26:52
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-01 16:51:42
 * @Description: 
-->
<template>
  <el-drawer title="设置中心" size="300px" v-model="showPannel" :with-header="false" @close="closeDrawer">
    <slot />
  </el-drawer>
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
  toRefs, //解构数据
  watchEffect,
  inject,//拦截数据
  getCurrentInstance //就是当前实例
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Base64 } from "js-base64";
import md5 from "md5";
export default {
  name: 'RightPanel',
  props: ['showPannel'],
  setup(props, { refs, root }) {

    //实例化
    const { ctx } = getCurrentInstance()
    const store = useStore()
    const router = useRouter();
    let { showPannel } = toRefs(props)
    const closeDrawer = () => {
      ctx.$emit("close", false);
    }
    return {
      showPannel,
      closeDrawer

    }
  }
}
</script>


<style lang="scss" scoped>
</style>
