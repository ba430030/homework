<template>
  <div>
    <panel>
      <template #header>
        <p>添加账号</p>
      </template>
      <template #content>
        <el-form
          :model="acountAdd"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="用户名" prop="uname">
            <el-input v-model="acountAdd.uname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="acountAdd.pwd"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="acountAdd.group" placeholder="请选择用户级别">
              <el-option label="普通管理员" value="普通管理员"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >添加</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { add } from '@/api/acount.js'
export default {
  components: {
    panel
  },
  data() {
    return {
      acountAdd: {
        uname: '',
        pwd: '',
        group: ''
      },
      rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { code } = await add({
            account: this.acountAdd.uname,
            password: this.acountAdd.pwd,
            userGroup: this.acountAdd.group
          })
          if (code === 0) {
            this.$refs[formName].resetFields()
            this.$router.push('/acount/acountlist')
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changeEye() {
      this.flagEye = !this.flagEye
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 20px;
}
.el-input,
.el-select {
  width: 200px;
}
</style>
