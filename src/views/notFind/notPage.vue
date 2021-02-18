<!--
 * @Author: xxuzhong.wang
 * @Date: 2021-01-27 16:33:27
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-01 14:28:33
 * @Description: 
-->
<template>
  <div class="not-find" @click="toHomePage">
    <img src="../../assets/images/404.jpeg" alt="">
  </div>
</template>

<script>


import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  reactive,
  ref,
  getCurrentInstance //就是当前实例
} from "vue";
export default {
  name: 'NotPage',
  setup(props, context) {
    const { ctx } = getCurrentInstance()
    //点击条状首页
    const toHomePage = () => {
      ctx.$router.push({ path: "/home" }); // 强制切换当前路由 path
    }
    //倒计时跳转
    const backToHome = () => {
      setTimeout(() => {
        ctx.$router.push({ path: "/home" }); // 强制切换当前路由 path
      }, 8000);
    }
    onMounted(() => {
      backToHome()
    })
    return {
      toHomePage,
      backToHome
    }
  }

}
</script>
<style scoped lang="scss">
.not-find {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.not-find img {
  width: 100%;
  height: 100%;
}
</style >
