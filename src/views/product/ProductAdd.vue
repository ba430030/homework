<template>
  <div>
    <panel>
      <template #header>
        <p>商品添加</p>
      </template>
      <template #content>
        <el-form
          :model="proForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input class="name-input" size="mini" v-model="proForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category">
            <el-select size="mini" v-model="proForm.category" placeholder="请选择商品分类">
              <el-option
                v-for="item in cateArr"
                :key="item.id"
                :label="item.cateName"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="delivery">
            <el-input-number size="mini" v-model="proForm.price" :min="1" :max="100" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="活动形式" prop="goodsDesc">
            <el-input class="type-input" size="mini" type="textarea" v-model="proForm.goodsDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">添加商品</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { getCateList, proAdd } from '@/api/product.js'

export default {
  components: {
    panel
  },
  data() {
    return {
      proForm: {
        name: '',
        category: '',
        price: '',
        goodsDesc: ''
      },
      num: 1,
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        category: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        goodsDesc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      cateImg: '',
      cateArr: []
    }
  },
  created() {
    this.getGory()
  },
  methods: {
    async getGory() {
      const { data } = await getCateList({
        currentPage: 1,
        pageSize: 100
      })
      this.cateArr = data
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 验证通过，发起请求
          const data = await proAdd({
            name: this.proForm.name,
            category: this.proForm.category,
            price: this.proForm.price,
            imgUrl: this.cateImg,
            goodsDesc: this.proForm.goodsDesc
          })
          if (data.code === 0) {
            this.$refs[formName].resetFields()
            this.$router.push('/product/productlist')
          }
        } else {
          this.$message.error('验证不通过')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.cateImg = res.imgUrl
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin: 20px 0;
  .type-input,
  .name-input {
    width: 300px;
  }
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
</style>
