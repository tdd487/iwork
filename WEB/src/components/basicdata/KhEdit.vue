<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">{{ menuName }}</span>
        <el-button-group style="float: right">
          <el-button type="primary"  @click.native="cancel">返 回</el-button>
        </el-button-group>
      </div>
      <el-form :model="kh" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="代码" prop="code">
          <el-input v-model="kh.code" placeholder="单位代码"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="kh.name" placeholder="单位名称"></el-input>
        </el-form-item>
        <el-form-item label="全称" prop="fullname">
          <el-input v-model="kh.fullname" placeholder="单位全称"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="kh.contacts" placeholder="联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="kh.tel" placeholder="联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="kh.fax" placeholder="单位传真"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="kh.addr" placeholder="单位地址"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="kh.remark" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="save" :loading="khLoading">确 定</el-button>
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
      return {
        rules: {
          code: [
            {required: true, message: '请输入单位代号', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入单位名称', trigger: 'blur'}
          ],
          contacts: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '请输入联系人电话', trigger: 'blur'}
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
            if (this.kh.id) {
              this.$store.dispatch('updateKh', this.kh).then(() => {
                this.$router.replace({name: 'khList'})
              })
            } else {
              this.$store.dispatch('addKh', this.kh).then(() => {
                this.$router.replace({name: 'khList'})
              })
            }
          }
        })
      }
    },
    computed: {
      ...mapState({
        khLoading: state => state.showLoading,
        menuName: state => state.menuName,
        kh: state => state.basicdata.kh
      })
    }
  }
</script>

<style scoped>
</style>
