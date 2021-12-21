<template>
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header class="header">
      <div class="left">
        <!-- 顶部图标,点击会旋转 -->
        <i
          class="el-icon-s-fold"
          @click="isCollapse = !isCollapse"
          :class="{ rotate: isCollapse }"
        ></i>
        <img class="logo" src="../../assets/index-logo.png" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="avatar" alt="" />
        <span class="name">{{ name }},你好</span>
        <el-button class="logout" type="primary" size="mini" @click="logout"
          >退出</el-button
        >
      </div>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <!-- width="auto" 让宽度自适应 被内容撑开 -->
      <el-aside width="auto" class="aside">
        <el-menu
          router
          :default-active="active"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-menu-item index="/index/dataRecord">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/questionList">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入获取token的函数工具
import { getToken, removeToken } from "../../utils/token.js";
// 导入用户信息接口方法
import { userInfo } from "../../api/api.js";
export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 头像
      avatar: "",
      // 名字
      name: "",
      // 导航刷新bug
      active: "",
    };
  },
  // 生命周期钩子
  beforeCreate() {
    // 判断token是否存在
    const token = getToken();
    if (!token) {
      // 提示用户
      this.$message.error("用户未登录");
      // 不存在 去登录页
      this.$router.push("/login");
    }
  },
  // 创建钩子
  mounted() {
    //  给el-menu中default-active的属性动态绑定 通过判断地址栏#之后的地址是在哪一个页面
    this.active = window.location.href.split("#")[1];
    userInfo().then((res) => {
      // if (res.data.code === 0) {
      //   // token有问题
      //   this.$message.error("token有问题");
      //   // 删除token
      //   removeToken();
      //   // 去登录页
      //   this.$router.push("/login");
      //   return;
      // }
      // window.console.log(res);
      // 保存在data中
      this.avatar = `http://127.0.0.1/heimamm/public/${res.data.data.avatar}`;
      this.name = res.data.data.name;
    });
  },
  methods: {
    // 退出按钮逻辑
    logout() {
      this.$confirm("你将要离开我这个网站了，555", "警告", {
        confirmButtonText: "狠心离开",
        cancelButtonText: "继续留下",
        type: "error",
      })
        .then(() => {
          // 删除token
          removeToken();
          // 去登录页
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "爱你哟，ღ( ´･ᴗ･` )比心",
          });
        });
    },
  },
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .header {
    background-color: orange;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        font-size: 23px;
        margin-right: 22px;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .name {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .aside {
    // background-color: skyblue;
  }
  .main {
    background-color: #ccc;
  }
  // 折叠菜单相关的类名
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-icon-s-fold {
    font-size: 40px;
    transition: 0.5s;
  }
  .rotate {
    transform: rotate(-90deg);
  }
}
</style>