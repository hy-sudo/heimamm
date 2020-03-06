<template>
  <div class="main">
    <el-card class="box-card-top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="学科" prop="subject">
          <subjectSelect v-model="formInline.subject"></subjectSelect>
        </el-form-item>

        <el-form-item label="阶段" prop="step">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <businessSelect v-model="formInline.enterprise"></businessSelect>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input v-model="formInline.username" class="author"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-date-picker type="date" placeholder="选择日期" v-model="formInline.create_date"></el-date-picker>
        </el-form-item>

        <el-form-item label="标题" class="title" prop="title">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getList()">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.questionAdd.dialogFormVisible = true"
          >新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card-bottom">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <p v-html="scope.row.title"></p>
          </template>
        </el-table-column>
        <el-table-column prop="subject_name" label="学科.阶段">
          <template slot-scope="scope">{{scope.row | formatSubjectStep}}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">单选</span>
            <span v-else-if="scope.row.type == 2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status == 1 ? "禁用" : "启用"}}</el-button>
            <el-button type="text" @click="doDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <questionAdd ref="questionAdd"></questionAdd>
  </div>
</template>

<script>
//导入配置好的获取接口的api
import {
  questionList,
  questionStatus,
  questionRemove
} from "@/api/question.js";
//导入新增题库组件
import questionAdd from "./components/questionAdd";

export default {
  components: {
    questionAdd
  },
  data() {
    return {
      formInline: {},
      subjectList: [],
      businessList: [],
      tableData: [],
      //分页当前页
      page: 1,
      //页容量
      size: 5,
      //总页数
      total: 0
    };
  },
  created() {
    //页面一加载获取题目列表
    this.getList();
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
    clear() {
      // 重置表单
      this.$refs.formInline.resetFields();
      // 重新加载数据
      this.getList();
    },

    // 编辑的点击事件
    showEdit(item) {
      this.$refs.questionEdit.form = { ...item };

      this.$refs.questionEdit.form.city = this.$refs.questionEdit.form.city.split(
        ","
      );
      this.$refs.questionEdit.form.multiple_select_answer = this.$refs.questionEdit.form.multiple_select_answer.spli(
        ","
      );

      //显示出对话框
      this.$refs.questionEdit.dialogFormVisible = true;
    },
    // 修改状态点击事件
    changeStatus(item) {
      questionStatus({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("修改状态成功！");
          this.getList();
        }
      });
    },
    doDel(item) {
      //弹出确认框
      this.$confirm("请问是否要删除这行数据？")
        .then(() => {
          questionRemove({
            id: item.id
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功！");
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message("乖孩子！不删库跑路");
        });
    },

    getList() {
      // 获取题目列表
      questionList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  },
  //过滤器
  filters: {
    formatSubjectStep(val) {
      let stepName = "";
      if (val.step == 1) {
        stepName = "初级";
      } else if (val.step == 2) {
        stepName = "中级";
      } else {
        stepName = "高级";
      }
      return val.subject_name + " · " + stepName;
    }
  }
};
</script>

<style lang="less">
.main {
  .box-card-top {
    height: 227px;
    margin-bottom: 20px;
  }

  .el-form--inline {
    .el-form-item:not(:last-child) .el-form-item__content {
      width: 280px;
    }
    .author {
      width: 217px !important;
    }
    .title {
      width: 500px;
    }
    .title .el-form-item__content {
      width: 460px !important;
    }
  }
}
</style>