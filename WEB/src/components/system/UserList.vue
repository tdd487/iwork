<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">用户管理</span>
        <el-button-group style="float: right">
          <el-button type="primary" @click.native="add" size="small"><i class="el-icon-plus"></i> 新增</el-button>
          <el-button type="primary" @click.native="edit" size="small"><i class="el-icon-edit"></i> 修改</el-button>
          <el-button type="primary" @click.native="del" size="small"><i class="el-icon-delete"></i> 删除</el-button>
        </el-button-group>
      </div>
      <el-table :data="userList" selection-mode="single" stripe style="width: 100%"
                @row-click="clickRow" highlight-current-row>
        <el-table-column property="username" label="用户名" min-width="1"></el-table-column>
        <el-table-column property="name" label="姓名" min-width="1"></el-table-column>
        <el-table-column property="tel" label="电话" min-width="1"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" placeholder="登录用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="user.tel" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="user.roleId">
            <el-option v-for="item in roleList" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="save" :loading="btnLoading">确 定</el-button>
          <el-button @click.native="dialogVisible=false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Md5 from '../../assets/js/md5.js'

  export default {
    data () {
      return {
        dialogTitle: '',
        dialogVisible: false,
        selectRow: {},
        user: {},
        rules: {
          username: [
            {required: true, message: '请输入登录用户名', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '请输入用户电话', trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
      this.$store.dispatch('getRoleList')
      this.initModel()
      this.$store.commit('changeMenu', 'user')
      this.getList()
    },
    methods: {
      initModel () {
        this.user = {username: '', name: '', tel: '', roleId: ''}
      },
      getList () {
        this.$store.dispatch('getUserList', {offset: this.pageSize * (this.page - 1), limit: this.pageSize})
      },
      add () {
        this.dialogTitle = '新增用户'
        this.dialogVisible = true
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.resetFields()
        }
        this.initModel()
        this.user.roleId = this.roleList[0].id
      },
      edit () {
        this.user = {...this.selectRow}
        this.user.roleId = this.user['userRoles.role.id'] || 0
        if (!this.user.id) {
          this.$store.commit('noSelect')
          return
        }
        this.dialogTitle = '修改用户'
        this.dialogVisible = true
      },
      del () {
        if (!this.selectRow || !this.selectRow.id) {
          this.$store.commit('noSelect')
          return
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('delUser', {id: this.selectRow.id})
          this.selectRow = null
        }).catch(() => {
        })
      },
      clickRow (row) {
        this.selectRow = row
      },
      save () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.user.id) {
              this.$store.dispatch('updateUser', this.user).then(() => {
                this.dialogVisible = false
                this.selectRow = null
              })
            } else {
              this.user.password = Md5.md5('123456')
              this.$store.dispatch('addUser', this.user).then(() => {
                this.dialogVisible = false
                this.selectRow = null
              })
            }
          }
        })
      },
      handleSizeChange (val) {
        this.$store.commit('changePageSize', val)
        this.getList()
      },
      handleCurrentChange (val) {
        if (val !== 0) {
          this.$store.commit('changePage', val)
          this.getList()
        }
      }
    },
    computed: {
      ...mapState({
        userList: state => state.system.userList,
        roleList: state => state.system.roleList,
        btnLoading: state => state.showLoading,
        pageSize: state => state.pageSize,
        page: state => state.page,
        total: state => state.total
      })
    },
    filters: {
      userState: function (val) {
        return val ? '正常' : '禁用'
      }
    }
  }
</script>

<style scoped>
</style>
