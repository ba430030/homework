<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#2b3c4d"
    text-color="#fff"
    active-text-color="#409eff"
    :collapse="bool"
    :collapse-transition="false"
    router
  >
    <!-- 后台首页 -->
    <el-menu-item index="/dashboard">
      <i class="iconfont icon-shouye"></i>
      <span slot="title">后台首页</span>
    </el-menu-item>
    <!-- 订单管理 -->
    <el-menu-item index="/order/ordercontent">
      <i class="iconfont icon-icon-"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>
    <!-- 商品管理 -->
    <el-submenu index="/product">
      <template slot="title">
        <i class="iconfont icon-shangpin"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/product/productlist">商品列表</el-menu-item>
      <el-menu-item index="/product/productadd">商品添加</el-menu-item>
      <el-menu-item index="/product/productcate">商品分类</el-menu-item>
    </el-submenu>
    <!-- 店铺管理 -->
    <el-menu-item index="/store/storecontent">
      <i class="iconfont icon-dianpu"></i>
      <span slot="title">店铺管理</span>
    </el-menu-item>
    <!-- 账号管理 -->
    <el-submenu index="/acount/acountlist">
      <template slot="title">
        <i class="iconfont icon-yonghu"></i>
        <span>账号管理</span>
      </template>
      <el-menu-item index="/acount/acountlist">账号列表</el-menu-item>
      <el-menu-item index="/acount/acountadd">添加账号</el-menu-item>
      <el-menu-item index="/acount/resetpwd">修改密码</el-menu-item>
    </el-submenu>
    <!-- 销售统计 -->
    <el-submenu index="/saleCount/GoodsCount">
      <template slot="title">
        <i class="iconfont icon-tongji"></i>
        <span>销售统计</span>
      </template>
      <el-menu-item index="/saleCount/GoodsCount">商品统计</el-menu-item>
      <el-menu-item index="/saleCount/OrderCount">订单统计</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: {
    bool: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
}
.el-menu {
  .iconfont {
    margin-right: 10px;
    color: #fff;
  }
}
</style>
