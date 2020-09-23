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
        <!-- 头部导航 -->
        <Header />
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
import Header from './components/Header.vue'
export default {
  components: {
    NavMenu,
    Header
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
    background-color: #fff;
  }
  .el-main {
    background-color: #e4e4e4;
  }
}
</style>
