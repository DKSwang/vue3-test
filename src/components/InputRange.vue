<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-09 11:28:52
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-04 14:39:40
 * @Description: 输入框区间
 -->
<template>
  <div class="range-container">
    <el-input class="br-input" :placeholder="startPlaceholder" v-model.number.trim="start" @blur="handleInput('start')"></el-input>
    <span class="range-span">-</span>
    <el-input class="br-input" :placeholder="endPlaceholder" v-model.number.trim="end" @blur="handleInput('end')"></el-input>
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
import { useStore } from "vuex";
export default {
  props: {
    value: {
      type: Array,
      default: "",
    },
    min: {
      type: [String, Number],
      default: 0,
    },
    max: {
      type: [String, Number],
      default: "",
    },
    startPlaceholder: {
      type: String,
      default: "",
    },
    endPlaceholder: {
      type: String,
      default: "",
    }

  },
  setup() {
    //实例化
    const { ctx } = getCurrentInstance();
    const store = useStore();
    //定义变量
    const start = ref("");
    const end = ref("");
    //函数
    const setDefaultValue = () => {
      const val = ctx.value;
      if (val.length === 2) {
        ctx.start = val[0] !== null ? val[0] : "";
        ctx.end = val[1] !== null ? val[1] : "";
      } else {
        ctx.start = "";
        ctx.end = "";
      }
    }
    const handleInput = (which) => {
      if (which === "start") {
        if (typeof ctx.start === "string")
          ctx.start = ctx.start.replace(/[^0-9.]/gi, "");
        if (ctx.end !== "" && ctx.start > ctx.end) {
          ctx.start = ctx.min;
        }
      } else {
        if (typeof ctx.end === "string")
          ctx.end = ctx.end.replace(/[^0-9.]/gi, "");
        if (ctx.start !== "" && ctx.start > ctx.end) {
          ctx.end = ctx.max;
        } else if (ctx.start === "") {
          ctx.start = ctx.min;
        }
      }
      let s, e;
      s = ctx.start !== "" ? ctx.start : null;
      e = ctx.end !== "" ? ctx.end : null;
      ctx.$emit("input", [s, e]);
    }
    onMounted(() => {
      ctx.setDefaultValue();
    })
    // watch(
    //   ctx.props.value,
    //   (newVal, oldVal) => {
    //     console.log("watch searchInput:", newVal, oldVal);
    //     ctx.setDefaultValue();
    //   },
    // );
    return {
      start,
      end,
      setDefaultValue,
      handleInput

    }
  }
}
</script>

<style scoped lang="scss">
.range-container {
  display: inline-block;
  .br-input {
    width: 94px !important;
    .el-input__inner {
      width: 100%;
    }
  }
  .range-span {
    margin: 0 2px;
    display: inline-block;
  }
}
</style>