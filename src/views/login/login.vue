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
        <!-- 注册按钮 -->
        <el-button class="reg-btn" @click="showReg = true" type="primary"
          >注册</el-button
        >
      </el-form>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_bg.png" alt="" class="banner" />
    <!-- 注册对话框 -->
    <el-dialog title="用户注册" :visible.sync="showReg">
      <!-- 表单 -->
      <el-form :model="registerForm">
        <!-- 头像 -->
        <el-form-item label="头像" :label-width="formLabelWidth"
          ><el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="registerForm.name"
                autocomplete="off"
              ></el-input
            ></el-col>
            <el-col :span="7" offset="1">
              <img
                class="captcha"
                src="../../assets/login_captcha.png"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" :label-width="formLabelWidth"
          ><el-row>
            <el-col :span="16">
              <el-input
                v-model="registerForm.name"
                autocomplete="off"
              ></el-input
            ></el-col>
            <el-col :span="7" offset="1">
              <el-button class="captcha-btn" :type="primary">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showReg = false">取 消</el-button>
        <el-button type="primary" @click="showReg = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
        phone: "18888888888",
        // 密码
        password: "88888888",
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
      // 验证码地址
      captchaSrc: "http://127.0.0.1/heimamm/public/captcha?type=login",
      // 复选框勾选
      checked: true,
      // 注册对话框是否显示
      showReg: false,
      // 注册表单数据
      registerForm: {},
      // 文字的宽度
      formLabelWidth: "67px",
      // 图片地址
      imageUrl: "",
    };
  },
  // 方法
  methods: {
    // 登录表单验证
    // 点击登录
    submitForm(formName) {
      // 用户协议勾选
      // 布尔判断
      if (!this.checked) {
        this.$message.warning("请勾选用户协议");
        return;
      }
      // this.$refs['rulesForm']==> 获取饿了么的表单
      // 饿了么的表单.validate()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功
          // alert("submit!");
          // 接口调用
          this.$axios({
            url: "/login",
            method: "post",
            data: {
              phone: this.loginForm.phone,
              password: this.loginForm.password,
              code: this.loginForm.captcha,
            },
            // 1.axios跨域请求时,默认不会携带cookie,导致验证码无法验证
            // 2.为了携带cookie 添加一个设置:withCredentials:true 设置为true即可
            withCredentials: true,
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success("登录成功");
            } else {
              this.$message.warning(res.data.message);
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
      this.captchaSrc = `http://127.0.0.1/heimamm/public/captcha?type=login&${Date.now()}`;
    },
    // 图片上传的方法
    // 文件上传成功之后会触发的回调函数
    // res 服务器返回的值
    // file 文件信息
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 文件上传之前对文件做一些限制
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
  // 对话框中的样式
  .captcha{
    height: 41px;
    width: 100%;
  }
  .captcha-btn{
    width: 100%;
  }
  .el-dialog{
    width: 602px;
  }
}
// 头像组件样式
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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

</style>