<template>
  <el-dialog center title="编辑企业" :visible.sync="dialogFormVisible">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { BusinessEdit } from "@/api/business.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      rules: {
        rid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    //对话框确定按钮的点击事件
    doEdit() {
      BusinessEdit(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message.success("修改成功~");
          this.dialogFormVisible = false;
          //调用父组件的方法刷新表格数据
          this.$parent.getList();
        }else{
            this.$message.error(res.data.message)
        }
      });
    }
  }
};
</script>

<style>
</style>