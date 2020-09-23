<template>
  <div>
    <panel>
      <template #header>
        <p>修改密码</p>
      </template>
      <template #content>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="pass">
            <el-input type="password" size="mini" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" size="mini" prop="newpass">
            <el-input type="password" v-model="ruleForm.newpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" size="mini" prop="checkNewpass">
            <el-input type="password" v-model="ruleForm.checkNewpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { pwdReg } from '@/utils/validate.js'
import { checkoldpwd, editpwd } from '@/api/acount.js'
import local from '@/utils/local.js'

export default {
  components: {
    panel
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!pwdReg.test(value)) {
        callback(
          new Error(
            '至少6个字符，至少包含1个大写字母或1个小写字母和1个数字,不能包含特殊字符（非数字字母）'
          )
        )
      } else if (this.ruleForm.checkNewpass !== '') {
        this.$refs.ruleForm.validateField('checkNewpass')
        callback()
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateOldpass = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const data = await checkoldpwd({
          oldPwd: this.ruleForm.pass
        })
        if (data.code === '00') {
          callback()
        } else {
          callback(new Error('原密码错误'))
        }
      }
    }

    return {
      ruleForm: {
        pass: '',
        newpass: '',
        checkNewpass: ''
      },
      rules: {
        pass: [{ validator: validateOldpass, trigger: 'blur' }],
        newpass: [{ validator: validatePass, trigger: 'blur' }],
        checkNewpass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = await editpwd({
            newPwd: this.ruleForm.newpass
          })
          if (data.code === 0) {
            local.remove('t_k')
            this.$router.push('/login')
          }
        } else {
          this.$message({
            showClose: true,
            message: '修改失败',
            type: 'error',
            duration: 1500
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin: 20px 0;
  .el-input {
    width: 200px;
  }
}
</style>
