<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">{{menuName}}</span>
        <el-button-group style="float: right">
        </el-button-group>
      </div>
      <el-form :model="btn" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="btn.name" placeholder="按钮名称"></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="code">
          <el-input v-model="btn.code" placeholder="按钮代码"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="btn.icon" placeholder="按钮图标名称"></el-input>
        </el-form-item>
        <el-form-item label="顺序号" prop="sort">
          <el-input v-model="btn.sort" :number="true" placeholder="按钮顺序号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="save" :loading="btnLoading">确 定</el-button>
          <el-button @click.native="cancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      var checkNum = (rule, value, callback) => {
        let val = parseInt(value, 10)
        if (!Number.isInteger(val)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          name: [
            {required: true, message: '请输入按钮名称', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入按钮代号', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '请输入按钮顺序号', trigger: 'blur'},
            {validator: checkNum, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      cancel () {
        this.$router.go(-1)
      },
      save () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.btn.id) {
              this.$store.dispatch('updateBtn', this.btn).then(() => {
                this.$router.replace({name: 'btnList'})
              })
            } else {
              this.$store.dispatch('addBtn', this.btn).then(() => {
                this.$router.replace({name: 'btnList'})
              })
            }
          }
        })
      }
    },
    computed: {
      ...mapState({
        btnLoading: state => state.showLoading,
        menuName: state => state.menuName,
        btn: state => state.system.btn
      })
    }
  }
</script>

<style scoped>
</style>
