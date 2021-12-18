<template>
  <div class="main">
    <div style="font-size: 24px;margin-top:250px;text-align: center">
      <i class="el-icon-warning-outline" style="color: red"></i>
      <span style="color: red"
        >当前资源无法访问,系统将在{{ number }}秒后返回首页</span
      >
    </div>
    <div style="text-align: center;margin-top:20px">
      <el-button type="primary" @click="backClick">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  data() {
    return {
      number: 3,
      timerId: null,
    };
  },
  mounted() {
    this.timerId = setInterval(() => {
      if (this.number === 0) {
        this.$router.push("/index");
        clearInterval(this.timerId);
        return;
      }
      this.number -= 1;
    }, 1000);
  },
  methods: {
    backClick() {
      this.$router.push("/index");
    },
  },
};
</script>
<style lang="less" scoped>
</style>