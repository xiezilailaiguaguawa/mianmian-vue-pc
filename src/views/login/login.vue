// 26 ui表单验证
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
      <!-- 输入框 -->
      <el-form :model="ruleForm" status-icon :rules="rules">
        <el-form-item label="手机号码" prop="phone">
          <el-input
            class="phone-input"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            v-model="ruleForm.phone"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            class="password-input"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
          >
          </el-input>
        </el-form-item>
        <el-row class="captcha-row">
          <el-col :span="17"
            ><el-input
              placeholder="请输入验证码"
              prefix-icon="el-icon-key"
              v-model="input2"
            >
            </el-input
          ></el-col>
          <el-col :span="7">
            <img class="captcha" src="../../assets/login_captcha.png" alt="" />
          </el-col>
        </el-row>
      </el-form>

      <!-- 协议 -->
      <el-checkbox class="checkbox">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>
        和
        <el-link type="primary">隐私条款</el-link>
      </el-checkbox>
      <!-- 登录 注册按钮 -->
      <el-button class="login-btn" type="primary">登录</el-button>
      <el-button class="reg-btn" type="primary">注册</el-button>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_bg.png" alt="" class="banner" />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
         callback(new Error("不能为空"));
      } else {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if(reg.test(value)){
             callback();
        }else{
            callback(new Error("手机号码错误"));
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: "",
        password: "",
      },
      rules: {
        phone: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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