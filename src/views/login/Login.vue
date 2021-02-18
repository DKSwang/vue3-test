<!--
 * @Author: xxuzhong.wang
 * @Date: 2021-01-27 16:33:27
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-18 14:48:30
 * @Description: 
-->
<template>
  <div class="login_page fillcontain">
    <div class="bg-box"></div>
    <div class="login-logo">
      <img class="logoImg" src="../../assets/images/logoVue.png" />
      <div>前端基础框架</div>
    </div>
    <section class="form_contianer">
      <div class="manage_tip">
        <div>登录</div>
      </div>
      <div class="login-container">
        <el-form :model="formParams" :rules="rules" ref="forms" class="login-form">
          <el-form-item prop="username">
            <el-input v-model.trim="formParams.username" placeholder="用户名" @keyup.enter.native="handleLogin" class="br-input-login"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model.trim="formParams.password" @keyup.enter.native="handleLogin" class="br-input-login"></el-input>
          </el-form-item>
          <!-- 个人感觉组件目前不支持vue3 -->
          <!-- <el-form-item v-if="showVerify">
            <div class="verify-content">
              <slide-verify :l="42" :r="10" :w="310" :h="155" slider-text="向右滑动" @success="onSuccess" @fail="onFail" @refresh="onRefresh" @fulfilled="onFulfilled"></slide-verify>
              <div class="verify-message" v-html="verifyMessage">
              </div>
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="handleLogin" class="submit_btn" :loading="btnloading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
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
import { renderMenu, getMenu, getBtn, setStore } from "@/config/mUtils.js";
import { Base64 } from "js-base64";
import md5 from "md5";
import { loginFN } from '../../api/loginAPI'
export default {
  name: 'Login',
  setup(props, { refs, root }) {
    const { ctx } = getCurrentInstance()
    const store = useStore()
    //实例化路由
    const router = useRouter();
    const btnloading = ref(false)
    const formParams = ref({
      username: "",
      password: ""
    });
    const rules = ref({
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }
      ]
    });
    //登录事件
    const handleLogin = () => {
      //页面直接写网络请求
      //   ctx.$http.get("../../../json/menu.json", loginParams).then(res => {
      //     console.log(res)
      //   })
      //单独的JS文件,需要引入
      //   loginFN(loginParams).then(res => {
      //     console.log(res)
      //   })
      //触发actions
      //   ctx.$store.dispatch('login/queryLogin', loginParams).then(res => {
      //     console.log(res)
      //   })
      //触发mutation
      // ctx.$store.commit('user/getUserInfo','存储数据');//调用mutations方法
      //读取state的方法
      // const a = computed(() => ctx.$store.state.test.a)
      let $ele = ctx.$refs.forms;
      btnloading.value = true
      $ele.validate(valid => {
        if (valid) {
          let loginParams = {
            username: ctx.formParams.username,
            password: md5(ctx.formParams.password)
          }
          ctx.$store.dispatch('login/queryLogin', loginParams)
            .then(res => {
              btnloading.value = false;
              if (res["code"] == 200) {
                ctx.$message({
                  type: "success",
                  message: res.msg
                });
                setStore("locale", "zh");
                // this.$i18n.locale = "zh";
                // 存储菜单
                setStore("token", res.data.token);
                let loginData = {
                  userName: res.data.userName,
                  orgName: res.data.orgName,
                  roleNames: res.data.roleNames
                };

                setStore("userInfo", Base64.encode(JSON.stringify(loginData)));
                // 存储菜单
                let tempMenu = getMenu(res.data.permission);
                let tempRenderMenuData = renderMenu(tempMenu);

                setStore("menu", Base64.encode(JSON.stringify(tempRenderMenuData)));
                // 存储按钮权限
                let tempBtn = getBtn(res.data.permission);

                setStore("btn", Base64.encode(JSON.stringify(tempBtn)));
                //页面跳转
                router.push("/home");
              }
            });
        } else {
          console.log('error submit!!');
          btnloading.value = false
          return false;
        }
      });

    }
    return { // 返回供template使用
      //变量
      btnloading,
      formParams,
      rules,
      //事件
      handleLogin,
    };
  },
  components: {

  }
}
</script>
<style scoped lang="scss">
.login_page {
  width: 100%;
  height: 100%;
  background-color: #324057;
  position: relative;
  background-image: url("../../assets/images/background.png");
  background-size: cover;
  .login-logo {
    position: absolute;
    top: 20px;
    left: 20px;
    .logoImg {
      height: 36px;
    }
    div {
      display: inline-block;
      height: 18px;
      line-height: 18px;
      color: #fff;
      font-size: 18px;
      vertical-align: middle;
      border-left: 1px solid #fff;
      padding-left: 10px;
      margin-left: 10px;
    }
    img {
      vertical-align: middle;
    }
  }
}

.manage_tip {
  text-align: left;
  font-family: ArialMT;
  font-weight: 400;
  color: #fff;
  margin-bottom: 38px;
  div {
    display: inline-block;
    line-height: 56px;
    border-bottom: 3px solid #4da1ff;
    font-size: 28px;
  }
}
.form_contianer {
  width: 310px;
  position: absolute;
  top: 12%;
  right: 200px;
  padding: 25px;
  text-align: center;

  .submit_btn {
    width: 100%;
    font-size: 14px;
  }
}
.verify-content {
  position: relative;
  .verify-message {
    position: absolute;
    left: 50%;
    top: 62px;
    transform: translateX(-50%);
    color: #fff;
    span {
      font-size: 14px;
    }
  }
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>