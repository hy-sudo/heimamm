<template>
  <div class="login_warp">
    <div class="login_box">
      <!-- 标题 -->
      <div class="login_title">
        <img class="login_logo" src="../../assets/login_logo.png" alt />
        <span class="title_left">黑马面面</span>
        <span class="line"></span>
        <span class="title_right">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form :model="form" label-width="43px" class="login_form" :rules="rules" ref="loginform">
        <el-form-item prop="phone">
          <el-input clearable placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="code" :src="imgURL" @click="changeImgCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="agreement_box" prop="agree">
          <el-checkbox class="agreement" v-model="form.agree">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" round @click="doLogin">登录</el-button>
          <el-button class="btn" type="primary" round @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 页面右侧的图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
    <!-- 注册对话框 -->
    <reg ref="reg"></reg>
  </div>
</template>

<script>
import reg from "./components/register";
import { login } from "@/api/login.js";
import {setToken} from '@/utilis/token.js'
export default {
  components: {
    reg
  },
  data() {
    return {
      //验证码图片
      imgURL: process.env.VUE_APP_PicURL + "/captcha?type=login&t="+Date.now(),

      //跟表单元素绑定的对象
      form: {
        phone: "",
        password: "",
        code: "",
        agree: false
      },
      //规则对象
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { min: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        agree: [
          {
            pattern: /true/,
            message: "必须勾选同意用户协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //登录的点击事件
    doLogin() {
      this.$refs.loginform.validate(v => {
        if (v) {
          //调用login方法发送请求
          login({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code
          }).then(res => {
            // window.console.log(res);
            if(res.data.code == 200){
              //把token存起来
              // window.localStorage.setItem('token',res.data.data.token);
              setToken(res.data.data.token);
              // this.$message.success('登录成功');
              this.$router.push('/index');
            }else{
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    //注册按钮点击事件
    register() {
      this.$refs.reg.dialogFormVisible = true;
    },
    //验证码图片的点击事件
    changeImgCode() {
      this.imgURL =
        process.env.VUE_APP_PicURL + "/captcha?type=login&t=" + Date.now();
    }
  }
};
</script>

<style lang="less">
.login_warp {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;

  .login_box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 41px;
    box-sizing: border-box;

    .login_title {
      display: flex;
      align-items: center;
      margin-top: 50px;
      margin-left: 48px;

      .login_logo {
        width: 22px;
        height: 17px;
      }

      .title_left {
        margin-left: 16px;
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }

      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-left: 14px;
        margin-right: 12px;
      }

      .title_right {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }

    .login_form {
      margin-top: 28px;

      .code {
        width: 100%;
        height: 42px;
      }

      .agreement_box {
        display: flex;

        .agreement {
          display: flex;
          align-items: center;
        }
      }

      .btn {
        width: 100%;
        &:nth-child(2) {
          margin-left: 0px;
          margin-top: 26px;
        }
      }
    }
  }
}
</style>