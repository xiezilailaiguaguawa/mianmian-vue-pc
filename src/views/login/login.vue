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
                @click="changeCaptcha"
                :src="captchaSrc"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-checkbox class="checkbox" v-model="checked">
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
        <el-button class="reg-btn" type="primary" @click="dialogVisible = true"
          >注册</el-button
        >
      </el-form>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_bg.png" alt="" class="banner" />
    <el-dialog
      title="用户注册"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="regForm"
        status-icon
        :rules="regrules"
        ref="regForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="action"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="regForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="regForm.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="regForm.phonenumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="regForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图形验证码" prop="captcha">
          <el-row class="captcha-row">
            <el-col :span="17"
              ><el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="regForm.captcha"
              >
              </el-input
            ></el-col>
            <el-col :span="6" :offset="1">
              <img
                class="captcha code"
                @click="changeregCaptcha"
                :src="regcaptchaSrc"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="短信验证码" prop="smscode">
          <el-row class="captcha-row">
            <el-col :span="17"
              ><el-input
                placeholder="请输入短信验证码"
                prefix-icon="el-icon-key"
                v-model="regForm.smscode"
              >
              </el-input
            ></el-col>
            <el-col :span="6" :offset="1">
              <el-button class="code" @click="getSmscode">短信验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button @click="cencelreg">取 消</el-button>
          <el-button type="primary" @click="submitreg">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { login, getsendsms, register } from "../../api/api.js";
import { setToken } from "../../utils/token.js";
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
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("手机号码格式不对"));
        }
      }
    };
    const validatephonenumber = (rules, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      }
      let regexp =
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regexp.test(value)) {
        callback();
      } else {
        callback(new Error("手机号码格式不对"));
      }
    };
    const checkEmail = (rules, value, callback) => {
      // value是值
      if (!value) {
        callback(new Error("邮箱不能为空"));
      } else {
        // 格式验证
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 验证
        if (reg.test(value)) {
          // 对的
          callback();
        } else {
          // 错误
          callback(new Error("邮箱格式不对哦"));
        }
      }
    };
    return {
      loginForm: {
        // 手机号
        phone: "13923837334",
        // 密码
        password: "12345678",
        // 验证码
        captcha: "",
      },
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
      captchaSrc: "http://127.0.0.1/heimamm/public/captcha?type=login",
      regcaptchaSrc: "http://127.0.0.1/heimamm/public/captcha?type=sendsms",
      checked: false,
      dialogVisible: false,
      regForm: {
        nickname: "",
        mail: "",
        phonenumber: "",
        password: "",
        captcha: "",
        smscode: "",
        avatar: "",
      },
      regrules: {
        phonenumber: [{ validator: validatephonenumber, trigger: "blur" }],
        mail: [{ validator: checkEmail, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码的强度不够" },
        ],
      },
      action: "http://127.0.0.1/heimamm/public//uploads",
      imageUrl: "",
    };
  },
  // 方法
  methods: {
    submitForm(formName) {
      if (!this.checked) {
        this.$message.warning("请先勾选用户协议!!!");
        this.changeCaptcha();
        this.loginForm.captcha = "";
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login({
            phone: this.loginForm.phone,
            password: this.loginForm.password,
            code: this.loginForm.captcha,
          }).then((res) => {
            if (res.data.code === 200) {
              // TODO 登录成功进去下一个页面
              setToken(res.data.data.token);
              this.$store.commit("CHANGEINFO", res.data.data);
              // 判断用户来进入不同的页面
              if (res.data.data.role === "管理员") {
                this.$message.success("尊敬的管理员欢迎您");
              } else {
                this.$message.success(`用户${res.data.data.name}登录成功`);
              }
              this.$router.push("/index/dataRecord"); // 管理员
            } else {
              this.$message.warning("登录失败");
            }
          });
        } else {
          // 验证失败
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    changeCaptcha() {
      this.captchaSrc = `http://127.0.0.1/heimamm/public/captcha?type=login&${Date.now()}}`;
    },
    changeregCaptcha() {
      this.regcaptchaSrc = `http://127.0.0.1/heimamm/public/captcha?type=sendsms&${Date.now()}}`;
    },
    getSmscode() {
      if (this.regForm.phonenumber.trim() == "") {
        this.$message.warning("手机号不能为空");
        return;
      }
      const reg =
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.regForm.phonenumber)) {
        this.$message.warning("请输入正确的手机号码！");
        return;
      }
      getsendsms({
        code: this.regForm.captcha,
        phone: this.regForm.phonenumber,
      }).then((res) => {
        console.log(res);
        this.regForm.smscode = res.data.data.captcha;
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.regForm.avatar = res.data.file_path;
      this.$message.success("上传成功");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    cencelreg() {
      this.initform();
      this.dialogVisible = false;
    },
    submitreg() {
      register({
        name: this.regForm.nickname,
        phone: this.regForm.phonenumber,
        email: this.regForm.mail,
        avatar: this.regForm.avatar,
        password: this.regForm.password,
        rcode: this.regForm.smscode,
      })
        .then((res) => {
          console.log(res);
          this.$message.success("注册成功");
          this.loginForm.phone = this.regForm.phonenumber;
          this.initform();
          this.dialogVisible = false;
        })
        .catch(() => {
          this.$message.eeror("系统出错,请重新再试");
        });
    },
    initform() {
      this.imageUrl = "";
      this.regForm = {
        nickname: "",
        mail: "",
        phonenumber: "",
        password: "",
        captcha: "",
        smscode: "",
        avatar: "",
      };
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
  .code {
    width: 100%;
    height: 41px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    // overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload.el-upload--text {
    border: 1px dashed #d9d9d9;
  }
  .avatar-uploader {
    text-align: center;
  }
  .el-dialog {
    margin: 0 auto;
  }
  form.el-form.demo-ruleForm
    .el-form-item.el-form-item--feedback:nth-child(8)
    > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>