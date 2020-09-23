<template>
  <div>
    <panel>
      <template #header>
        <p>个人中心</p>
      </template>
      <template #content>
        <ul>
          <li>
            <span>管理员ID:</span>
            {{userList.id}}
          </li>
          <li>
            <span>账号:</span>
            {{userList.account}}
          </li>
          <li>
            <span>用户组:</span>
            {{userList.userGroup}}
          </li>
          <li>
            <span>创建时间:</span>
            {{userList.ctime|getTime}}
          </li>
          <li class="avatar-box">
            <span>管理员头像:</span>
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/users/avatar_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </li>
          <li>
            <span></span>
            <el-button type="primary" size="mini" @click="editAvatar">修改头像</el-button>
          </li>
        </ul>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { mineInfo, avataredit } from '@/api/acount.js'
import { getTime } from '@/filters/getTime.js'

export default {
  components: {
    panel
  },
  created() {
    this.getData()
  },
  data() {
    return {
      userList: {},
      imageUrl: '',
      avatarImg: ''
    }
  },
  methods: {
    async getData() {
      const { accountInfo } = await mineInfo({})
      this.userList = accountInfo
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.avatarImg = res.imgUrl
    },
    beforeAvatarUpload(file) {
      const arr = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
      const isJPG = arr.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async editAvatar() {
      const data = await avataredit({
        imgUrl: this.avatarImg
      })
      if (data.code === 0) {
        location.reload()
      }
    }
  },
  filters: {
    getTime
  }
}
</script>

<style lang="less" scoped>
ul {
  li {
    line-height: 34px;
    span {
      display: inline-block;
      width: 120px;
      margin-right: 20px;
      text-align: right;
      font-weight: bold;
    }
  }
}
/deep/.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 10px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-box {
  display: flex;
}
</style>
