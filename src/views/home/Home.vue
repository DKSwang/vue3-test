<!--
 * @Author: xxuzhong.wang
 * @Date: 2021-01-27 16:33:27
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-07 10:18:11
 * @Description: 
-->
<template>
  <div class="template-container">
    <div class="contentBox">
      <img style="width: 100%; height: 100%" :src="url" />
    </div>
  </div>
</template>

<script >
export default {
  name: "Home",
  setup(props, { refs, root }) {
    const url = require("../../assets/images/home.png");
    return {
      url
    };
  }
};
</script>

<style scoped lang="scss">
.template-container {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>