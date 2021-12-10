<template>
  <div class="login-container">
    <!-- 左侧 from表单 -->
    <div class="from-wrapper"></div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_bg.png" alt="" class="banner" />
  </div>
</template>

<script>
export default {
  name: "login",
};
</script>

<style>
.login-container {
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 水平对齐方式 */
  justify-content: space-around;
  height: 100%;
  background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
}
.from-wrapper {
  width: 478px;
  height: 550px;
  background-color: #f5f5f5;
}
</style>