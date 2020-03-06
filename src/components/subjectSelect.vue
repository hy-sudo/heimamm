<template>
  <el-select v-model="subject" placeholder="请选择学科" @change="selChange">
    <!-- 按条件显示 -->
    <el-option value v-if="isSearch">所有学科</el-option>
    <el-option v-for="(item,index) in subjectList" :key="index" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import { subjectList } from "@/api/subject.js";
export default {
  props: {
    value: {
      default: ""
    },

    isSearch: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      subject: this.value,
      subjectList: []
    };
  },

  watch: {
    value(val) {
      this.subject = val;
    }
  },

  methods: {
    //下拉框的值改变事件
    selChange() {
      // 在这里给父组件传值
      this.$emit("input", this.subject);
    }
  },

  created() {
    //   获取学科数据
    subjectList({
      status: 1
    }).then(res => {
      this.subjectList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>