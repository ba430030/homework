<template>
  <div class="login-box">
    <div class="login-content">
      <h2>系统登录</h2>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="uname">
          <el-input
            type="text"
            prefix-icon="iconfont icon-yonghu"
            v-model="loginForm.uname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            :type="flagEye ? 'password' : 'text'"
            prefix-icon="iconfont icon-mima"
            v-model="loginForm.pass"
            autocomplete="off"
          >
            <i
              class="eye"
              slot="suffix"
              :class="flagEye ? 'iconfont icon-eyes' : 'iconfont icon-eyes-'"
              @click="changeEye"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/acount.js'
import local from '@/utils/local.js'

export default {
  data() {
    return {
      loginForm: {
        uname: '',
        pass: ''
      },
      flagEye: true,
      rules: {
        uname: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
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
          const { code, token } = await login({
            account: this.loginForm.uname,
            password: this.loginForm.pass
          })
          if (code === 0) {
            local.set('t_k', token)
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
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
.login-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(45, 58, 75);
  .login-content {
    h2 {
      color: #fff;
      font-size: 20px;
      letter-spacing: 3px;
      text-align: center;
    }
    .eye {
      position: absolute;
      right: 25px;
      cursor: pointer;
    }
    .btns {
      text-align: center;
    }
    width: 340px;
    padding: 30px;
  }
}
</style>
