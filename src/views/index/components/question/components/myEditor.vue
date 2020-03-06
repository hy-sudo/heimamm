<template>
  <div>
    <div class="toolbar" ref="toolbar"></div>
    <div class="content" ref="content"></div>
  </div>
</template>

<script>
// 导入编辑器
import wangEditor from "wangeditor";
export default {
  name: "myEditor",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    let editor = new wangEditor(this.$refs.toolbar, this.$refs.content);

    // 监听富文本值改变事件
    editor.customConfig.onchange = html => {
      //把值传递给父组件
      this.$emit("input", html);
    };

    editor.create();
    editor.txt.html(this.value);
  }
};
</script>

<style>
.toolbar {
  border: 1px solid #ccc;
}
.content {
  border: 1px solid #ccc;
  height: 50px;
}
</style>