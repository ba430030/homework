<template>
  <el-container>
    <el-aside :width="isCollapse?'64px':'200px'">
      <h2>
        <div>
          <img src="../assets/imgs/logo.jpg" @click="isCollapse=!isCollapse" />
        </div>
        <span v-show="!isCollapse">外卖商家中心</span>
      </h2>
      <!-- 导航栏 -->
      <NavMenu :bool="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 面包屑导航 -->
        <Breadcrumb />
        <div class="user">
          <span>欢迎你，张益达</span>
          <img src="../assets/imgs/touxiang.jpg" />
        </div>
      </el-header>
      <el-main>
        <!-- 展示路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from './components/NavMenu.vue'
import Breadcrumb from './components/Breadcrumb.vue'
export default {
  components: {
    NavMenu,
    Breadcrumb
  },
  data() {
    return {
      isCollapse: false
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: #2b3c4d;
    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        display: flex;
        align-items: center;
      }
      img {
        width: 36px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
      }
      span {
        color: #fff;
        font-size: 18px;
      }
    }
  }
  .el-header {
    background-color: skyblue;
  }
  .el-main {
    background-color: pink;
  }
  .header {
    display: flex;
    justify-content: space-between;
    .user {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        border-radius: 50%;
        margin-left: 10px;
      }
    }
  }
}
</style>
