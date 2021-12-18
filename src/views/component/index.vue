<template>
  <div class="index">
    <el-container class="index-container">
      <el-header class="header">
        <div>
          <i
            class="el-icon-s-fold"
            @click="isCollapse = !isCollapse"
            :class="{ rotate: isCollapse }"
          ></i>
          <img class="logo" src="../../assets/index-logo.png" alt="" />
          <span class="title">黑马面面</span>
        </div>
        <div>
          <img class="avatar" :src="getIcon" alt="" />
          <span class="name">{{ getName }},您好</span>
          <el-button class="logout" @click="logout" size="mini" type="primary"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside style="width: auto" class="aside">
          <el-menu
            :collapse="isCollapse"
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            router
          >
            <el-menu-item
              v-if="['管理员'].includes(getRole)"
              index="/index/dataRecord"
            >
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item
              v-if="['管理员'].includes(getRole)"
              index="/index/userList"
            >
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item
              v-if="['管理员', '老师', '学生'].includes(getRole)"
              index="/index/questionList"
            >
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item
              v-if="['管理员', '老师'].includes(getRole)"
              index="/index/enterprise"
            >
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item
              v-if="['管理员', '老师', '学生'].includes(getRole)"
              index="/index/subject"
            >
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { removeToken } from "../../utils/token.js";
export default {
  name: "index",
  data() {
    return {
      msg: "hello world",
      isCollapse: false,
      avatar: "",
      name: "",
      activeIndex: "/index/dataRecord",
    };
  },
  created() {},
  mounted() {
    this.activeIndex = window.location.href.split('#')[1];
  },
  methods: {
    logout() {
      this.$confirm("您将退出黑马面面系统, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除token
          removeToken();
          // 删除仓库数据
          this.$store.commit("CHANGEINFO", undefined);
          // 返回login
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "您已取消退出",
          });
        });
    },
  },
  computed: {
    // 获取名字
    getName() {
      return this.$store.state.userInfo.name;
    },
    // 获取头像
    getIcon() {
      return (
        process.env.VUE_APP_BASEURL + "/" + this.$store.state.userInfo.avatar
      );
    },
    // 用户角色
    getRole() {
      return this.$store.state.userInfo.role;
    },
  },
};
</script>

<style lang="less">
.index {
  height: 100%;
  .index-container {
    height: 100%;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon-s-fold {
        cursor: pointer;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin: 0 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    > div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .name {
        margin: 0 24px 0 12px;
      }
    }
  }
  // 折叠菜单相关的类名
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  // 设置旋转时间
  .el-icon-s-fold {
    font-size: 36px;
    transition: 0.5s;
  }
  // 图片旋转
  .rotate {
    transform: rotate(-90deg);
  }
  .el-main {
    background-color: #ccc;
  }
}
</style>