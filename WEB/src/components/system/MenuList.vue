<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">菜单管理</span>
      <el-button-group style="float: right">
        <el-button type="primary" v-for="btn in authBtns" @click.native="btnClick(btn.code)" size="small"><i
          :class="btn.icon"></i> {{btn.name}}
        </el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col :span="6">
        <el-tree :data="menuList" highlight-current :props="{ children: 'children',label: 'name' }"
                 @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <el-form :model="menu" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="上级">
            <el-select v-model="menu.parentId" :disabled="disabled">
              <el-option label="无" value=""></el-option>
              <el-option v-for="item in fristMenu" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="menu.name" placeholder="菜单名称" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model="menu.code" placeholder="菜单代码" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="顺序号" prop="sort">
            <el-input v-model="menu.sort" :number="true" placeholder="菜单顺序号" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="按钮">
            <el-select v-model="btnIds" multiple :disabled="disabled">
              <el-option v-for="item in btnList" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
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
        btnIds: [],
        menu: {
          name: '',
          code: '',
          sort: '',
          parentId: '',
          menuBtns: []
        },
        rules: {
          name: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入菜单代号', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '请输入菜单顺序号', trigger: 'blur'},
            {validator: checkNum, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.$store.commit('changeMenu', 'menu')
      this.$store.dispatch('getMenuList')
      this.$store.dispatch('getBtnList')
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
        this.menu = {
          name: '',
          code: '',
          sort: '',
          parentId: '',
          menuBtns: []
        }
        this.btnIds = []
      },
      handleNodeClick (row) {
        this.$refs.ruleForm.resetFields()
        this.$store.dispatch('findMenuById', {id: row.id}).then((menu) => {
          this.menu = {...menu}
          this.btnIds = this.menu.menuBtns.map(t => t.btnId)
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
        if (!this.menu.id) {
          this.$store.commit('noSelect')
          return
        }
        this.menu.sort = '' + this.menu.sort
        this.disabled = false
      },
      save () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.menu.menuBtns = this.btnIds
            if (this.menu.id) {
              this.$store.dispatch('updateMenu', this.menu)
            } else {
              this.$store.dispatch('addMenu', this.menu)
            }
          }
        })
      },
      del () {
        if (!this.menu || !this.menu.id) {
          this.$store.commit('noSelect')
          return
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('delMenu', this.menu)
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
        menuList: state => state.system.menuList,
        btnList: state => state.system.btnList,
        btnLoading: state => state.showLoading
      }),
      ...mapGetters({fristMenu: 'getFirstMenu', authBtns: 'authBtns'})
    }
  }
</script>

<style scoped>
  .el-tree {
    overflow-y: hidden;
  }
</style>
