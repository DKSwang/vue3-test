<!--
 * @Author: xxuzhong.wang
 * @Date: 2021-01-27 16:33:27
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-04 14:11:02
 * @Description: 
-->
<template>
  <div class="template-container">
    <content-wrapper>
      <template v-slot:grid="scope">
        <div style="margin:0 auto;width:450px;">
          <el-form :model="passwordForm" size="small" ref="passwordForm" label-width="100px" :rules="rules">
            <el-form-item label="原密码：" class="br-form-item-label" prop="oldPassword">
              <el-input type="password" class="br-input-large" v-model.trim="passwordForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" class="br-form-item-label" prop="newPassword">
              <el-input type="password" class="br-input-large" v-model.trim="passwordForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" class="br-form-item-label" prop="confirmPassword">
              <el-input type="password" class="br-input-large" v-model.trim="passwordForm.confirmPassword"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align:center;width:400px;margin-top:25px;">
            <el-button class="br-btn-large" type="primary" @click="submit" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="reset">重置</el-button>
          </div>
        </div>
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
  getCurrentInstance //就是当前实例
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ContentWrapper from "@/components/ContentWrapper.vue";
import md5 from "md5";
export default {
  name: "modifyPassword",
  setup(props, { refs, root }) {
    //   实例化
    const { ctx } = getCurrentInstance()
    const store = useStore()
    const router = useRouter();
    const btnloading = ref(false);
    const passwordForm = ref({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    const rules = ref({
      oldPassword: [
        {
          required: true,
          message: "请输入原密码"
        }
      ],
      newPassword: [
        {
          required: true,
          message: "请输入新密码"
        },
        {
          validator: ctx.checkNewPassword,
          trigger: "blur"
        }
      ],
      confirmPassword: [
        {
          required: true,
          message: "请输入确认密码"
        },
        {
          validator: ctx.checkConfirmPassword,
          trigger: "blur"
        }
      ]
    });
    const checkNewPassword = (rule, value, callback) => {
      let $ele = ctx.$refs["passwordForm"];

      var regUpper = /[A-Z]/;
      var regLower = /[a-z]/;
      var regNum = /[0-9]/;
      var regTeShu = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]"
      );
      var complex = 0;
      if (regLower.test(value)) {
        ++complex;
      }
      if (regUpper.test(value)) {
        ++complex;
      }
      if (regNum.test(value)) {
        ++complex;
      }
      if (regTeShu.test(value)) {
        ++complex;
      }
      if (complex < 3 || value.length < 8) {
        callback(
          new Error("长度不小于8位，包含数字、字母大、小写、符号中的至少3种")
        );
      } else {
        if (passwordForm.confirmPassword !== "") {
          $ele.validateField("confirmPassword");
        }
        callback();
      }
    }
    const checkConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== passwordForm.newPassword) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    }
    const submit = () => {
      console.log(ctx, store)
      let $ele = ctx.$refs.passwordForm;
      $ele.validate(valid => {
        console.log(valid, "valid")
        if (valid) {
          let param = {
            oldPassword: md5(ctx.passwordForm.oldPassword),
            newPassword: md5(ctx.passwordForm.newPassword)
          };
          btnloading.value = true;
          ctx.$store.dispatch('modifyPassword/queryModify', param)
            .then(res => {
              btnloading.value = false;
              if (res["code"] == 200) {
                ctx.$bus.$on("closeTag", '/modifyPassWord')
                ctx.$message({
                  type: "success",
                  message: res.msg,
                  onClose: () => {
                    router.push({ path: "/home" });
                  }
                });
              }
            });
        }
      });
    }
    const reset = () => {
      let $ele = ctx.$refs["passwordForm"];
      $ele.resetFields();
    }
    return {
      btnloading,
      passwordForm,
      rules,
      checkNewPassword,
      checkConfirmPassword,
      submit,
      reset
    };
  },
  components: {
    "content-wrapper": ContentWrapper
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