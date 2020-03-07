<template>
  <div class="login-wapper">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-content">
      <h3>叩丁狼客户管理系统</h3>
      <el-form-item class="login-item" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="login-item" prop="pwd">
        <el-input placeholder="请输入密码" v-model="ruleForm.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" type="primary" @click="loginForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginApi } from "../../request/api";

export default {
  methods: {
    loginForm() {
      this.$refs.ruleForm.validate((res, resObj) => {
        // bool(校检结果) 和 obj(校检失败的字段项)
        // console.log(res,resObj);

        if (res) {
          // console.log("调用登录接口");
          
          //获取登录用户名密码
          let formData = {
            username: this.ruleForm.username,
            password: this.ruleForm.pwd
          };
          // console.log(formData);
          loginApi(formData).then(resObj => {
            // 请求成功后跳转路由
            if (resObj.success) {
              this.$router.replace("/department");
              // 缓存 token  localStorage 本地缓存 （永久性缓存到本地） sessionStorage 会话缓存（窗口关闭时数据删除）
              localStorage.setItem('token',resObj.data)
              
            }
            // console.log(resObj.success);
          });
        } else {
          // console.log('内容不符合定义规则');
          return false;
        }
      });
    }
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  }
};
</script>

<style lang='less'>
.login-wapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324057;
  .login-content {
    width: 350px;
    height: 280px;
    h3 {
      font-size: 24px;
      color: #fff;
      text-align: center;
      padding: 10px 0;
    }
    .login-button {
      width: 100%;
    }
  }
}
</style>