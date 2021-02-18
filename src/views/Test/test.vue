<!--
 * @Author: xxuzhong.wang
 * @Date: 2021-02-04 16:38:18
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-07 14:09:56
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
        <el-table stripe :data="list.cardAccountInfo" class="br-table" v-loading="loading">
          <el-table-column label="卡号/账户" prop="applyLoanAmount" min-width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="姓名" prop="loanGuaranteeType"></el-table-column>
          <el-table-column label="身份证号" prop="dataFileType" min-width="150"></el-table-column>
          <el-table-column label="产品名称" prop="customerName"></el-table-column>
          <el-table-column label="网点机构" prop="dataUploadDate"></el-table-column>
          <!-- <el-table-column label="调整前额度" prop="beforeAmt" min-width="100">
            <template slot-scope="scope">
              {{scope.row.beforeAmt|money}}
            </template>
          </el-table-column>
          <el-table-column label="调整后额度" prop="afterAmt" min-width="120">
            <template slot-scope="scope">
              {{scope.row.afterAmt|money}}
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="发放日期" prop="grantDate" min-width="100"></el-table-column>
          <el-table-column label="导入时间" prop="importTime" min-width="150"></el-table-column>
          <el-table-column label="导入批次号" prop="importNo" min-width="100"></el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import child from "./testChildren"
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
  data() {
    console.log()
    return {
      this: getCurrentInstance(),
      types: 'hhhh ',
      formInline: {}

    }
  },
  created() {
    this.queryList()
    console.log("created")
  },
  components: {
    child
  },
  mounted() {
    console.log("mounted")
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
      this.$store.commit('common/saveLoading', true);
      this.$bus.$emit('change', "我是bus传递的数据")
      this.queryList()
      console.log(this.list.cardAccountInfo, "斤斤计较军")
      this.$store.commit('common/saveLoading', false);


    }
  }
}
</script>

<style lang="scss">
.br-input {
  width: 200px;
}
</style>