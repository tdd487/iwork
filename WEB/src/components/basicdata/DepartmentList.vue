<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">{{ menuName }}</span>
      <el-button-group style="float: right">
        <el-button type="primary" @click.native="add" size="small"><i class="el-icon-plus"></i> 添加</el-button>
        <el-button type="primary" @click.native="edit" size="small"><i class="el-icon-edit"></i> 修改</el-button>
        <el-button type="primary" @click.native="del" size="small"><i class="el-icon-delete"></i> 删除</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col :span="6">
        <el-tree :data="departmentList" highlight-current :props="{ children: 'children',label: 'name' }"
                 @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <el-form :model="department" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="上级">
            <el-select v-model="department.parentId" :disabled="disabled">
              <el-option label="无" value=""></el-option>
              <el-option v-for="item in firstDepartment" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model="department.code" placeholder="分类代码" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="department.name" placeholder="分类名称" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="顺序号" prop="sort">
            <el-input v-model="department.sort" :number="true" placeholder="分类顺序号" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="department.status" :disabled="disabled">
              <el-option label="正常" :value="0"></el-option>
              <el-option label="停用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="department.remark" placeholder="分类备注" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item v-show="!disabled">
            <el-button type="primary" @click.native="save" :loading="btnLoading">保存</el-button>
            <el-button @click.native.prevent="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

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
        disabled: true,
        department: {
          name: '',
          code: '',
          sort: '',
          parentId: ''
        },
        rules: {
          code: [
            {required: true, message: '请输入分类代号', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '请输入分类顺序号', trigger: 'blur'},
            {validator: checkNum, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.$store.commit('changeMenu', 'kht')
      this.$store.dispatch('getDepartmentList')
      this.$on('add', () => this.add())
      this.$on('update', () => this.update())
      this.$on('del', () => this.del())
    },
    beforeDestroy () {
    },
    methods: {
      btnClick (code) {
        this.$emit(code)
      },
      initForm () {
        this.kht = {
          name: '',
          code: '',
          sort: '',
          parentId: ''
        }
      },
      handleNodeClick (row) {
        this.$refs.ruleForm.resetFields()
        this.$store.dispatch('findDepartmentById', {id: row.id}).then((department) => {
          this.department = {...department}
          this.disabled = true
        })
      },
      handleReset () {
        this.$refs.ruleForm.resetFields()
        this.initForm()
      },
      add () {
        this.initForm()
        this.disabled = false
      },
      update () {
        console.log(this.kht)
        if (!this.kht.id) {
          this.$store.commit('noSelect')
          return
        }
        this.kht.sort = '' + this.kht.sort
        this.disabled = false
      },
      save () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.department.id) {
              this.$store.dispatch('updateKht', this.kht)
            } else {
              this.$store.dispatch('addDepartment', this.kht)
            }
          }
        })
      },
      del () {
        if (!this.kht || !this.kht.id) {
          this.$store.commit('noSelect')
          return
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('delKht', this.kht)
          this.initForm()
        }).catch(() => {
        })
      }
    },
    watch: {
      btnLoading (newVal) {
        if (!newVal) {
          this.disabled = true
          // this.initForm()
        }
      }
    },
    computed: {
      ...mapState({
        menuName: state => state.menuName,
        departmentList: state => state.public.departmentList,
        btnLoading: state => state.showLoading
      }),
      ...mapGetters({firstDepartment: 'getFirstDepartment', authBtns: 'authBtns'})
    }
  }
</script>

<style scoped>
  .el-tree {
    overflow-y: hidden;
  }
</style>
