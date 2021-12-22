<template>
  <div class="subject">
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="">清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表单 -->
    <el-card class="main-card">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="学科名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="creater" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text">禁用</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入接口
import { subject } from "../../../api/api.js";
export default {
  name: "subject",
  data() {
    return {
      // 筛选的表格
      formInline: {},
      // 数据
      tableData: [],
      // 页码
      page: 0,
      // 页容量
      limit: 10,
      // 页码数组
      pageSizes: [5, 10, 15, 20],
      // 总条数
      total: 0,
    };
  },
  created() {
    // 调用接口
    subject
      .list({
        page: this.page,
        limit: this.limit,
      })
      .then((res) => {
        // console.log(res);
        // 赋值给table
        this.tableData = res.data.data.items;
        // 保存 总条数
        this.total = res.data.data.pagination.total;
      });
  },
  methods: {
    // 筛选逻辑
    getList() {
      // 调用接口 传递筛选的条件
      subject
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then((res) => {
          console.log(res);
          // 筛选后重新渲染页面
          this.tableData = res.data.data.items;
        });
    },
    search() {
      this.page = 1;
      this.getList();
    },
    // 页容量改变
    handleSizeChange(size) {
      // 保存页容量
      this.limit = size;
      // 去第一页
      this.page = 1;
      // 重新获取数据
      this.getList();
      
    },
    // 页码改变
    handleCurrentChange(current) {
      this.size = current;
      // 重新获取数据
      this.getList();
    },
  },
};
</script>

<style lang="less">
.subject {
  // 分页器的样式
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .red {
    color: red;
  }
}
// 主体区域 card 样式
.main-card {
  margin-top: 36px;
}
</style>