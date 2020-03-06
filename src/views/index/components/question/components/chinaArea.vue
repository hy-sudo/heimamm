<template>
  <el-cascader
    v-model="city"
    :options="options"
    :props="{ expandTrigger: 'hover' ,value:'label'}"
    @change="handleChange"
  ></el-cascader>
</template>

<script>
//导入省市区级联数据
import { regionDataPlus } from "element-china-area-data";

export default {
  props: {
    value: {
      default: ""
    }
  },
  data() {
    return {
      city: this.value,
      //绑定级联选择器内容的数组
      options: regionDataPlus
    };
  },
  methods: {
    handleChange() {
      this.$emit("input", this.city);
    //   window.console.log(this.city);
    }
  }
};
</script>

<style>
</style>