<template>
  <div class="header">
    <div class="left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in breadcrumbList"
          :key="item.title"
          :to="{ path: item.path }"
        >{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          欢迎你，
          <span>{{userList.account}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar :size="30" :src="userList.imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import local from '@/utils/local.js'
import { mineInfo } from '@/api/acount.js'

export default {
  data() {
    return {
      breadcrumbList: [],
      userList: {},
      sizeList: ['large', 'medium', 'small']
    }
  },
  created() {
    this.caclRoute()
    this.getData()
  },
  methods: {
    caclRoute() {
      const arr = [{ title: '首页', path: '/dashboard' }]
      this.$route.matched.forEach((item) => {
        if (item.meta && item.meta.title) {
          arr.push({
            title: item.meta.title,
            path: item.path
          })
        }
      })
      this.breadcrumbList = arr
    },
    handleCommand(command) {
      if (command === 'exit') {
        local.remove('t_k')
        this.$router.push('/login')
      }
      if (command === 'personal') {
        this.$router.push('/acount/mine')
      }
    },
    async getData() {
      const { accountInfo } = await mineInfo({})
      this.userList = accountInfo
    }
  },
  watch: {
    '$route.path'() {
      this.caclRoute()
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #000;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-avatar {
  margin-left: 10px;
}
.right {
  display: flex;
  align-items: center;
}
</style>
