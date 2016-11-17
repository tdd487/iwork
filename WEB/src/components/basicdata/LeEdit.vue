<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">{{menuName}}</span>
        <el-button-group style="float: right">
        </el-button-group>
      </div>
      <el-form :model="le" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="分类">
          <el-select v-model="le.letId">
            <el-option v-for="item in letList" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货物编号" prop="code">
          <el-input v-model="le.code" placeholder="货物编号"></el-input>
        </el-form-item>
        <el-form-item label="货物名称" prop="name">
          <el-input v-model="le.name" placeholder="货物名称"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" prop="size">
          <el-input v-model="le.size" placeholder="规格型号"></el-input>
        </el-form-item>
        <el-form-item label="数量上限" prop="weightUpper">
          <el-input v-model="le.weightUpper" placeholder="数量上限"></el-input>
        </el-form-item>
        <el-form-item label="数量下限" prop="weightLower">
          <el-input v-model="le.weightLower" placeholder="数量下限"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="le.remark" placeholder="备注"></el-input>
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
        let val = parseFloat(value)
        if (!Number.isInteger(val)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          name: [
            {required: true, message: '请输入货物名称', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入货物编号', trigger: 'blur'}
          ],
          letId: [
            {required: true, message: '请选择分类', trigger: 'blur'}
          ],
          weightUpper: [
            {validator: checkNum, trigger: 'blur'}
          ],
          weightLower: [
            {validator: checkNum, trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      cancel () {
        this.$router.go(-1)
      },
      save () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.le.id) {
              this.$store.dispatch('updateLe', this.le).then(() => {
                this.$router.replace({name: 'leList'})
              })
            } else {
              this.$store.dispatch('addLe', this.le).then(() => {
                this.$router.replace({name: 'leList'})
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
        le: state => state.basicdata.le
      })
    }
  }
</script>

<style scoped>
</style>
