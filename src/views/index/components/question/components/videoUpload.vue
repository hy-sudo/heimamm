<template>
  <div class="videoUpload">
    <el-upload
      class="avatar-uploader"
      :action="uploadURL"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过2mb</div>
    </el-upload>

    <!-- 预览视频 -->
    <video :src="videoUrl" controls></video>
  </div>
</template>

<script>
export default {
  props: ["video"],
  data() {
    return {
      // 视频上传的接口路径
      uploadURL: process.env.VUE_APP_PicURL + "/question/upload",
      // 上传后用来预览视频的路径
      videoUrl: ""
    };
  },

  methods: {
    // 上传成功的钩子
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);

      this.$emit("update:video", res.data.url);
    },

    // 上传之前的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.avatar-uploader {
  text-align: left !important;
}
</style>