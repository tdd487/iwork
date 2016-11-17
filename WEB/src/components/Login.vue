<script src="../assets/js/utils.js"></script>
<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">登录</span>
      </div>
      <el-form :model="user" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" placeholder="请输入密码" type="password"
                    @keyup.native.enter="handleSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="handleSubmit" :loading="btnLoading">登录</el-button>
          <el-button @click.native.prevent="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Md5 from '../assets/js/md5'
  export default {
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.user.password = Md5.md5(this.user.password)
            this.$store.dispatch('login', this.user).then(() => {
              this.$router.replace({name: 'home'})
            })
          }
        })
      },
      handleReset () {
        this.$refs.ruleForm.resetFields()
      }
    },
    computed: mapState({
      message: state => state.message,
      btnLoading: state => state.showLoading
    }),
    watch: {
      message (newVal, oldVal) {
        if (newVal != null) {
          this.$message({
            message: newVal.message,
            type: newVal.type
          })
          newVal = null
        }
      }
    }
  }
</script>

<style scoped>
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .el-card {
    display: block;
    height: auto;
    padding: 0 30px;
  }
</style>
