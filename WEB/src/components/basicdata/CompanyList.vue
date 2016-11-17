<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">公司资料</span>
        <el-button-group style="float: right">
          <el-button type="primary" @click.native="addDepartment" size="small"><i class="el-icon-plus"></i> 添加部门资料</el-button>
          <el-button type="primary" @click.native="edit" size="small"><i class="el-icon-edit"></i> 修改</el-button>
          <el-button type="primary" @click.native="del" size="small"><i class="el-icon-delete"></i> 删除</el-button>

        </el-button-group>
      </div>
      <el-table :data="companyList" selection-mode="single" stripe style="width: 100%"
                @row-click="clickRow" highlight-current-row>
        <el-table-column property="name" label="名称"></el-table-column>
        <el-table-column property="code" label="代号"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form :model="company" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="company.name" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="code">
          <el-input v-model="company.code" placeholder="公司代码"></el-input>
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

  export default {
    data () {
      return {
        dialogTitle: '',
        dialogVisible: false,
        selectRow: {},
        company: {},
        rules: {
          name: [
            {required: true, message: '请输入公司名称', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入公司代号', trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
      this.initModel()
      this.$store.commit('changeMenu', 'company')
      this.getList()
    },
    methods: {
      initModel () {
        this.company = {name: '', code: ''}
      },
      getList () {
        this.$store.dispatch('getCompanyList', {offset: this.pageSize * (this.page - 1), limit: this.pageSize})
      },
      addDepartment () {
        this.company = {...this.selectRow}
        if (!this.company.id) {
          this.$store.commit('noSelect')
          return
        } else {
          this.$store.commit('changeMenuName', '新增部门资料')
          this.$router.push({name: 'departmentList'})
        }
      },
      edit () {
        this.company = {...this.selectRow}
        if (!this.company.id) {
          this.$store.commit('noSelect')
          return
        }
        this.dialogTitle = '修改角色'
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
          this.$store.dispatch('delCompany', {id: this.selectRow.id})
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
            if (this.company.id) {
              this.$store.dispatch('updateCompany', this.company).then(() => {
                this.dialogVisible = false
                this.selectRow = null
              })
            } else {
              this.$store.dispatch('addCompany', this.company).then(() => {
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
        companyList: state => state.sysmesage.companyList,
        btnLoading: state => state.showLoading,
        pageSize: state => state.pageSize,
        page: state => state.page,
        total: state => state.total
      })
    }
  }
</script>

<style scoped>
</style>
