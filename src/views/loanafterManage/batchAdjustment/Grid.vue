<!--
 * @Author: xxuzhong.wang
 * @Date: 2021-01-27 16:33:27
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-07 10:29:07
 * @Description: 
-->
<template>
  <div>
    <content-wrapper>
      <template slot="title">
        列表信息
      </template>
      <template slot="extra-btn">
        <renderBtn code="">
          <el-button type="primary" class="br-btn">导入</el-button>
        </renderBtn>
      </template>
      <template v-slot:grid="scope">
        <el-table stripe :data="list.list" class="br-table" v-loading="loading">
          <el-table-column label="卡号/账户" prop="cardNo" min-width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="身份证号" prop="idNo" min-width="150"></el-table-column>
          <el-table-column label="产品名称" prop="proName"></el-table-column>
          <el-table-column label="网点机构" prop="dotOrgan"></el-table-column>
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

        <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

      </template>
    </content-wrapper>
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
  watch,
  toRef,
  getCurrentInstance //就是当前实例
} from "vue";
import { useStore } from "vuex";
import ContentWrapper from "@/components/ContentWrapper.vue";
import Pages from "@/components/Pages.vue";
export default {
  name: "grid",
  setup(props, { refs, root }) {
    //实例化
    const { ctx } = getCurrentInstance();
    const store = useStore();
    const changePageFn = (val) => {
      let parame = {
        ...ctx.$store.state.searchData,
        pageNum: val.pageNum,
        pageSize: val.pageSize
      };
      ctx.$store.dispatch('batchAdjustment/queryList', parame)
      ctx.$store.dispatch('batchAdjustment/saveSearchDataFN', parame)
    }
    const list = reactive({
      list: [
        {
          cardNo: '1',
          name: 'dd ',
          proName: '哈哈哈',
          idNo: '123',
          pageNum: 1,
          pageSize: 10,
          total: 10
        }
      ],

    })
    onMounted(() => {
      //   console.log('onMounted')
      //   console.log(ctx.$store.state.batchAdjustment.searchData.pageNum, "list")
    })
    return {
      changePageFn,
      list,
    };
  },
  components: {
    "content-wrapper": ContentWrapper,
    Pages
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