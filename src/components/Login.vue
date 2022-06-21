<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
          >
          </el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" plain @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../network/login.js";
export default {
  name: "Login",
  data() {
    return {
      // 表单数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //表单数据验证规则
      //:model是表单数据验证对象
      //ps:prop的名字和rules规则里面的名字以及input里面v-model的名字要一样！！！
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        console.log(valid);
        //如果通过了验证
        if (valid) {
          //发起请求
          const result = await login(
            this.loginForm.username,
            this.loginForm.password
          );
          //登陆成功与否
          if (result.meta.status == 200) {
            this.$message({
              showClose: true,
              message: "恭喜你，登录成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "登陆失败！！",
              type: "warning",
            });
          }
          //存储的到sessionstorage中
          sessionStorage.setItem("token", result.data.token);
          //跳转
          this.$router.push({
            name: "home",
          });
          console.log("我是返回的data", result);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: pink;
  .login_box {
    width: 450px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    .avatar_box {
      width: 130px;
      height: 130px;
      border: 1px solid gray;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      margin: -75px auto 0 auto;
      // position: absolute;
      // left: 50%;
      // transform: translate(-50%, -50%);
      background-color: white;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .login_form {
      margin-top: 40px;
      padding: 0 20px;
      .btns {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
}
</style>