<template>
  <div class="user">
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="normal" v-model="formInline.email"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id">
          <el-select class="normal" v-model="formInline.role_id">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showAdd">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{ scope.row.status == 1 ? '禁用' : '启用' }}</el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="sizeChanged"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[ 5, 10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <user-dialog ref="userDialog"></user-dialog>
  </div>
</template>

<script>
import { userList, userRemove,userStatus } from "@/api/user.js";
import userDialog from "./components/userDialog.vue";

export default {
  name: "user",

  components: {
    userDialog
  },

  data() {
    return {
      formInline: {},
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      oldItem: null
    };
  },

  methods: {
    changeStatus(item) {

        userStatus({
            id:item.id
        })
        .then(res => {

            if(res.data.code == 200){

                this.$message.success('状态修改成功')
                this.getList();
            }else{

                this.$message.error(res.data.message)
            }
        })
    },
    showEdit(item) {
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.isAdd = false;

      if (this.oldItem != item) {
        this.$refs.userDialog.form = { ...item };
        this.oldItem = item;
      }
    },
    showAdd() {
      this.$refs.userDialog.dialogFormVisible = true;
      // 还要把表单内容清空
      this.$refs.userDialog.form = {};
    },
    remove(item) {
      userRemove({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    // 页容量改变
    sizeChanged(size) {
      this.size = size;
      this.page = 1;
      this.getList();
    },

    // 页码点击事件
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    // 清除的点击事件
    clear() {
      this.$refs.formInline.resetFields();
      this.page = 1;
      this.getList();
    },
    // 搜索的点击事件
    doSearch() {
      this.page = 1;
      this.getList();
    },
    getList() {
      userList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  },

  created() {
    this.getList();
  }
};
</script>

<style lang="less">
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 90px;
}

.user {
  .normal {
    width: 179px;
  }
}
</style>