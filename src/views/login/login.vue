<template>
  <div class="login-container">
    <!-- 左侧 from表单 -->
    <div class="from-wrapper">
      <!-- 标题 -->
      <div class="title-box">
        <img class="login-logo" src="../../assets/login_icon.png" alt="" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        status-icon
      >
        <el-form-item label="" prop="phone">
          <!-- 手机号 -->
          <el-input
            class="phone-input"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            v-model="loginForm.phone"
          >
          </el-input
        ></el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            class="password-input"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          >
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="" prop="captcha">
          <el-row class="captcha-row">
            <el-col :span="17"
              ><el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="loginForm.captcha"
              >
              </el-input
            ></el-col>
            <el-col :span="7">
              <img
                class="captcha" 
                @click="changeCaptcha" :src="captchaSrc"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-checkbox class="checkbox">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>
          和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>
        <!-- 登录 注册按钮 -->
        <el-button
          class="login-btn"
          type="primary"
          @click="submitForm('loginForm')"
          >登录</el-button
        >
        <el-button class="reg-btn" type="primary">注册</el-button>
      </el-form>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_bg.png" alt="" class="banner" />
  </div>
</template>

<script>
// 导入axios
import axios from 'axios' ;
export default {
  name: "login",
  // 数据
  data() {
    // 定义校验规则
    const checkPhone = (rules, value, callback) => {
      // value是值
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else {
        const reg =
          /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        //验证
        if (reg.test(value)) {
          // 正确的
          callback();
        } else {
          // 错误的
          callback(new Error("手机号码格式不对"));
        }
      }
    };
    return {
      // 登录表单数据
      loginForm: {
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 验证码
        captcha: "",
      },
      // 登录验证规则
      loginRules: {
        phone: [{ validator: checkPhone }],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码长度不够" },
        ],
        captcha: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "密码长度不够" },
        ],
      },
      captchaSrc : "http://127.0.0.1/heimamm/public/captcha?type=login"
    };
  },
  // 方法
  methods: {
    submitForm(formName) {
      // this.$refs['rulesForm']==> 获取饿了么的表单
      // 饿了么的表单.validate()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功
          // alert("submit!");
          // 接口调用
          axios({
            url:'http://127.0.0.1/heimamm/public/login',
            method:"post",
            data:{
              phone:this.loginForm.phone,
              password:this.loginForm.password,
              code:this.loginForm.captcha,
            },
            // 1.axios跨域请求时,默认不会携带cookie,导致验证码无法验证
            // 2.为了携带cookie 添加一个设置:withCredentials:true 设置为true即可
            withCredentials:true,
          }).then(res=>{
            // window.console.log(res)
              if(res.data.code === 200){
                this.$message.success('ok')
              }else{
                this.$message.warning('登录失败')
              }
          })
        } else {
          // 验证失败
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    changeCaptcha(){
      // 修改值即可
      // 随机数很有可能重复
      // this.captchaSrc = "http://127.0.0.1/heimamm/public/captcha?type=login&${Math.random()}"
      // 时间戳绝对不会重复
      this.captchaSrc = "http://127.0.0.1/heimamm/public/captcha?type=login&${Date.now()}}"
    }
  },
};
</script>

<style lang="less">
.login-container {
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 水平对齐方式 */
  justify-content: space-around;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .from-wrapper {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 48px;
    padding-left: 43px;
    padding-right: 41px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      .login-logo {
        width: 22px;
        height: 17px;
        margin-right: 14px;
      }
      .title {
        font-size: 24px;
        margin-right: 12px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 14px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .phone-input {
      margin-top: 30px;
    }
    .password-input {
      margin-top: 25px;
    }
    .captcha-row {
      margin-top: 25px;
      .captcha {
        // width: 110px;
        width: 100%;
        height: 42px;
      }
    }
    // 协议
    .checkbox {
      margin-top: 32px;
      color: #999;
      font-size: 14px;
      display: flex;
      align-items: center;
      .el-checkbox_label {
        display: flex;
        align-items: center;
      }
    }
    // 按钮
    .login-btn,
    .reg-btn {
      width: 100%;
      margin-left: 0;
      margin-top: 27px;
    }
  }
}
</style>