<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-09 11:28:52
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-04 14:33:47
 * @Description: 折叠筛选条件
 -->
<template>
  <div>
    <div class="template-search-sort-icons" @click="currentActiveIndex=!currentActiveIndex">
      <slot name="text"></slot>
      <span>
        <i :class="['el-icon-caret-top',!currentActiveIndex?'active':'']"></i>
        <i :class="['el-icon-caret-bottom',currentActiveIndex?'active':'']"></i>
      </span>
    </div>

    <slot></slot>

    <div v-show="currentActiveIndex">
      <slot name="hidden"></slot>
    </div>
  </div>
</template>

<script >
import {
  ref
} from "vue";
export default {
  setup() {
    const currentActiveIndex = ref(false)
    return {
      currentActiveIndex
    }
  }
}
</script>

<style scoped lang="scss">
</style>