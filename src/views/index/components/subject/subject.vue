<template>
  <div>
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid" class="short"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name" class="normal"></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username" class="short"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态" class="normal">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.subjectAdd.dialogFormVisible = true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{ scope.row.create_time | formatTime}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="['超级管理员', '管理员', '老师'].includes($store.state.role)">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 1 ? "禁用" : "启用"}}</el-button>
            <el-button
              type="text"
              @click="doRemove(scope.row)"
              v-if="['超级管理员', '管理员'].includes($store.state.role)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <subject-add ref="subjectAdd"></subject-add>
    <subject-edit ref="subjectEdit"></subject-edit>
  </div>
</template>

<script>
//导入subject文件
import { subjectList, subjectStatus, SubjectRemove } from "@/api/subject.js";
import subjectAdd from "./components/subjectAdd";
import subjectEdit from "./components/subjectEdit";

export default {
  name: "subject",
  components: {
    subjectAdd,
    subjectEdit
  },
  data() {
    return {
      //表单绑定的数据
      formInline: {
        rid: "",
        name: "",
        username: ""
      },
      //表格的数据源
      tableData: [],
      //分页当前页
      page: 1,
      //页容量
      size: 5,
      //总页数
      total: 0,
      //用这个变量来保存上次被点击的行
      olditem: null
    };
  },
  methods: {
    //页容量改变事件
    handleSizeChange(size) {
      // console.log(size);
      this.size = size;
      this.page = 1;
      this.getList();
    },
    //页码改变事件
    handleCurrentChange(page) {
      // console.log(page);
      this.page = page;
      this.getList();
    },
    //状态按钮的点击事件
    changeStatus(item) {
      // console.log(item)
      subjectStatus({
        id: item.id
      }).then(() => {
        //调用获取列表数据的方法手动刷新表格
        this.getList();
      });
    },
    //封装获取列表数据的方法
    getList() {
      subjectList({
        page: this.page,
        limit: this.size,
        // rid: this.formInline.rid,
        // name: this.formInline.name,
        // username: this.formInline.username,
        // status: this.formInline.status
        ...this.formInline
      }).then(res => {
        // console.log(res);
        //渲染数据源
        this.tableData = res.data.data.items;
        //渲染分页总页数
        this.total = res.data.data.pagination.total;
      });
    },
    //查询按钮的点击事件
    doSearch() {
      this.getList();
    },

    //清除按钮的点击事件
    clearSearch() {
      //调用表单自带的清除方法清除表单
      this.$refs.formInline.resetFields();
      //清除输入框后重新渲染表单
      this.getList();
    },

    //编辑按钮的点击事件
    showEdit(item) {
      this.$refs.subjectEdit.dialogFormVisible = true;
      if (item != this.olditem) {
        this.$refs.subjectEdit.form = { ...item };
        this.olditem = item;
      }
    },

    //删除按钮的点击事件
    doRemove(item) {
      SubjectRemove({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功~");
          //判断当前页删除数据是否为最后一条，如果是则删除后就渲染上一页的数据
          if (this.tableData.length == 1) {
            this.page--;
          }
          //如果是最后一页，那么当前页--后还是为1
          if (this.page == 0) {
            this.page = 1;
          }

          //默认刷新页面
          this.getList();
        }
      });
    }
  },

  created() {
    //页面一加载就调用获取列表数据的方法渲染列表
    this.getList();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.el-pagination {
  text-align: center;
}
</style>