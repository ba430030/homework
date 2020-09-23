<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item,i) in dataList" :key="item.id">
      <div class="grid-content bg-purple">
        <div>
          <i :class="'iconfont '+item.icon" :style="{color:color[i]}"></i>
        </div>
        <div>
          <span>{{item.title}}</span>
          <p>{{item.num}}</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      color: ['#1296db', '#d4237a', '#1296db', '#1afa29']
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background-color: #fff;
  display: flex;
  // justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 10px 0;
  div {
    flex: 1;
    &:last-child {
      span {
        color: #666;
      }
      p {
        font-weight: bold;
      }
      margin-top: 20px;
    }
    i {
      font-size: 75px;
    }
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
