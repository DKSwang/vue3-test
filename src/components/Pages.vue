<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-03-23 10:15:24
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-04 15:30:06
 * @Description: 分页组件
 -->
<template>
  <div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" :page-sizes="pageSizeList" :layout="isShowSizeList ? 'total, sizes, prev, pager, next, jumper' : 'total, prev, pager, next, jumper'" :total="Number(total)" class="br-pagination">
    </el-pagination>
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
  toRef,
  getCurrentInstance //就是当前实例
} from "vue";
export default {
  props: {
    pageNum: {
      default: 1
    },
    pageSize: {
      default: 10
    },
    total: {
      default: 0
    },
    isShowSizeList: {
      default: true
    },
    autoScroll: {
      default: true
    }

  },
  setup() {
    //实例化
    const { ctx } = getCurrentInstance();
    const handleSizeChange = (pageSize) => {
      ctx.$emit("changePage", { pageNum: ctx.pageNum, pageSize: pageSize });
      if (ctx.autoScroll) {
        scrollTo(0, 800);
      }
    }
    const handleCurrentChange = (pageNum) => {
      ctx.$emit("changePage", { pageNum: pageNum, pageSize: ctx.pageSize });
      if (ctx.autoScroll) {
        scrollTo(0, 800);
      }
    }
    return {
      handleSizeChange,
      handleCurrentChange

    }
  }



}
</script>