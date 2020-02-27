<template>
  <el-container>
    <el-header>
      <div class="header_left">
        <i
          :class="isCollapse? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="isCollapse = !isCollapse"
        ></i>
        <img class="logo" src="../../assets/login_logo.png" alt />
        <span class="header_name">黑马面面</span>
      </div>
      <div class="header_right">
        <img class="userImg" :src="avatar" alt />
        <span class="username">{{username}}，你好</span>
        <el-button type="primary" size="small" @click="doLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧导航菜单 -->
      <el-aside width="auto">
        <el-menu
          :router="true"
          default-active="/index/chart"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/business">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入接口
import { info, logout } from "@/api/index.js";
import { removeToken } from "@/utilis/token.js";
export default {
  data() {
    return {
      username: "",
      avatar: "",
      isCollapse: false
    };
  },
  created() {
    info().then(res => {
      console.log(res);
      this.username = res.data.data.username;
      this.avatar = process.env.VUE_APP_PicURL + "/" + res.data.data.avatar;
    });
  },
  methods: {
    doLogout() {
      this.$confirm("您将退出本系统, 是否继续退出?", "是否退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发请求
          logout().then(res => {
            if (res.data.code == 200) {
              this.$message.success("退出成功");
              removeToken();
              //跳转到登录页面
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
.el-container {
  height: 100%;

  .el-header {
    // background-color: pink;
    height: 60px;
    display: flex;
    justify-content: space-between;

    .header_left {
      height: 100%;
      display: flex;
      align-items: center;

      i {
        font-size: 26px;
        margin-right: 18px;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .header_name {
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .header_right {
      height: 100%;
      display: flex;
      align-items: center;
      .userImg {
        width: 33px;
        height: 28px;
        margin-right: 18px;
      }
      .username {
        margin-right: 11px;
      }
    }
  }
  .el-aside {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .el-main {
    background-color: #0094ff;
  }
}
</style>