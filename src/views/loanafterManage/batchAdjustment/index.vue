<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-06-19 11:21:16
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-04 14:18:17
 * @Description: 批量调额
 -->
<template>
  <div class="template-container">
    哈哈哈
    <Search></Search>
    <Grid></Grid>
  </div>
</template>

<script >
import Search from "./Search.vue";
import Grid from "./Grid.vue";
export default {
  name: "batchAdjustment",
  setup(props, { refs, root }) {
    return {
    };
  },
  components: {
    Search,
    Grid
  }
}
</script>

<style scoped lang="scss">
</style>