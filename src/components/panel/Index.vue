<template>
  <div>
    <el-card>
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
/deep/.el-card__body {
  padding: 0;
}
.header {
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
}
.content {
  padding: 0 20px;
  font-size: 14px;
}
</style>
