
<!--
 * @Author: xxuzhong.wang
 * @Date: 2021-02-04 16:38:18
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-07 10:47:13
 * @Description: 
-->
<!--
 * @Author: xinyu.zhang
 * @Date: 2019-12-24 13:52:51
 * @LastEditTime : 2020-01-11 19:22:55
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \br-CapitalassetDocking\src\page\customerManage\customerManage\components\index.vue
 -->
<template>
  {{message}}
  <div class="template-container">
    <div class="template-content">
      <div class="template-content-main">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="userManageSearch" size="small" label-width="105px">
          <div class="dialog-footer">
            <span slot="footer">
              <el-button @click="cancel" size="small"> 取消</el-button>
              <el-button type="primary" @click="submit" size="small"> 保存</el-button>
            </span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
  name: "testChildren",
  data() {
    return {
      this: getCurrentInstance(),
      types: 'hhhh ',
      message: '',//
      formInline: {}

    }
  },
  created() {
    this.queryList()
    // console.log("created")
  },
  mounted() {
    console.log("test Children ")
    //this.$bus.$emit('dr-workOrd-change', "我是bus传递的数据")
    this.$bus.$on("change", value => {
      this.message = value
      console.log(`value: ${value}`)
    });
  },
  computed: {
    ...mapState("batchAdjustment", [
      "list",
    ])
  },
  methods: {
    ...mapActions("batchAdjustment", ["queryList"]),
    cancel() {
      console.log(this.types)
    },
    submit() {
      this.queryList()
      console.log(this.list.cardAccountInfo)


    }
  }
}
</script>

<style lang="scss">
.br-input {
  width: 200px;
}
</style>