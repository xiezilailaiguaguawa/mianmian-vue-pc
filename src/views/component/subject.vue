<template>
  <div class="subject">
    <el-card class="select-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSelect">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addSub"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="tabel-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        v-loading="loading"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"> </el-table-column>
        <el-table-column prop="name" label="学科名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="creater" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime_global }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else class="success">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="status(scope.row)" type="text">
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-button>
            <el-button
              @click="remove(scope.row)"
              type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addForm" :rules="addRules">
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="学科名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cencelAdd">取 消</el-button>
        <el-button type="primary" v-if="formtitle == '新增学科'" @click="submitForm">确 定</el-button>
        <el-button type="primary" v-else @click="editForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSubjectList,
  addSubject,
  editSubject,
  setSubjectStatus,
  delSubject,
} from "../../api/api.js";
export default {
  name: "subject",
  data() {
    return {
      msg: "学科列表",
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: "",
      },
      tableData: null,
      currentPage: 1,
      pagesize: 10,
      total: null,
      loading: false,
      dialogFormVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
      },
      formLabelWidth: "120px",
      addRules: {
        rid: [
          { required: true, message: "学科编号不能为空哦", trigger: "blur" },
        ],
        name: [
          { required: true, message: "学科名称不能为空哦", trigger: "blur" },
        ],
      },
      formtitle: '',
    };
  },
  methods: {
    onSelect() {
      this.getSubjectList();
    },
    resetForm() {
      this.formInline = {
        rid: "",
        name: "",
        username: "",
        status: "",
      };
      this.getSubjectList();
    },
    addSub() {
      this.dialogFormVisible = true;
      this.formtitle = '新增学科'
    },
    getSubjectList() {
      this.loading = true;
      getSubjectList({
        ...this.formInline,
        page: this.currentPage,
        limit: this.pagesize,
      })
        .then((res) => {
          this.tableData = res.data.data.items;
          this.total = res.data.data.pagination.total;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        })
        .catch(() => {
          this.$message.error("系统出错,请稍后刷新尝试");
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    },
    handleSizeChange() {
      this.getSubjectList();
    },
    handleCurrentChange() {
      this.getSubjectList();
    },
    cencelAdd() {
      this.initform();
      this.dialogFormVisible = false;
    },
    submitForm() {
      addSubject(this.form)
        .then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.initform();
            this.$message.success("添加成功");
            this.getSubjectList();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error("系统出错,请稍后尝试");
        });
    },
    initform() {
      this.form = {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
      };
    },
    showEdit(data) {
      this.form = JSON.parse(JSON.stringify(data));
      this.dialogFormVisible = true;
      this.formtitle = '编辑学科'
    },
    status(data) {
      this.$confirm("此操作将修改状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setSubjectStatus({
            id: data.id,
          })
            .then((res) => {
              if (res.data.code === 200) {
                this.getSubjectList();
                this.$message.success("修改状态成功");
              } else {
                this.$message.error("系统出错,请稍后尝试");
              }
            })
            .catch(() => {
              this.$message.error("系统出错,请稍后尝试");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    remove(data) {
      this.$confirm("此操作将删除该学科, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delSubject({
            id: data.id,
          })
            .then((res) => {
              if (res.data.code === 200) {
                this.getSubjectList();
                this.$message.success("删除成功");
              } else {
                this.$message.error("系统出错,请稍后尝试");
              }
            })
            .catch(() => {
              this.$message.error("系统出错,请稍后尝试");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editForm() {
      editSubject(this.form)
        .then((res) => {
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.initform();
            this.$message.success("编辑成功");
            this.getSubjectList();
          } else {
            this.$message.error("系统出错,请稍后尝试");
          }
        })
        .catch(() => {
          this.$message.error("系统出错,请稍后尝试");
        });
    }
  },
  mounted() {
    this.getSubjectList();
  },
};
</script>

<style lang="less">
.subject {
  background-color: #ccc;
  .el-form-item {
    margin: 20px 0;
  }
  .el-card.select-card.is-always-shadow {
    margin-bottom: 24px;
  }
  .el-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 36px;
  }
  .dialog-footer {
    text-align: center;
  }
  button.el-button.el-button--default {
    margin-right: 32px;
  }
  .success {
    color: green;
  }
  .red {
    color: red;
  }
}
</style>