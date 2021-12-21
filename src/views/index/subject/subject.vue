<template>
  <div class="subject">
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="" @click="onSubmit">清除</el-button>
          <el-button type="primary" @click="onSubmit" icon="el-icon-plus"
            >新增企业</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表单 -->
    <el-card class="box-card">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="企业编号" width="100">
        </el-table-column>
        <el-table-column prop="address" label="企业名称"> </el-table-column>
        <el-table-column prop="address" label="所属领域"> </el-table-column>
        <el-table-column prop="address" label="创建者"> </el-table-column>
        <el-table-column prop="address" label="创建日期"> </el-table-column>
        <el-table-column prop="address" label="状态"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text">禁用</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "subject",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less">
.enterprise .box-card:nth-child(2) {
  margin-top: 36px;
}
</style>