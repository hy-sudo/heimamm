<template>
  <el-dialog center title="新增学科" :visible.sync="dialogFormVisible">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { newSubject } from "@/api/subject.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    doAdd() {
      this.$refs.form.validate(v => {
        if (v) {
          // alert('全通过')
          newSubject({
            // rid: this.form.rid,
            // name: this.form.name,
            // short_name: this.form.short_name,
            // intro: this.form.intro,
            // remark: this.form.remark
            ...this.form
          }).then(res => {
            // console.log(res)
            if (res.data.code == 200) {
              this.$message.success("新增成功~");
              this.dialogFormVisible = false;
              //调用父组件的方法刷新表格数据
              this.$parent.getList();
            }else{
              this.$message.error(res.data.message)
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>