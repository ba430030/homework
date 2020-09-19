<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path:'/order' }">订单管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  display: flex;
  align-items: center;
}
</style>
