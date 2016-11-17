<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">{{ menuName }}</span>
      <el-button-group style="float: right">
        <el-button type="primary" v-for="btn in authBtns" @click.native="btnClick(btn.code)" size="small"><i
          :class="btn.icon"></i> {{btn.name}}
        </el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col :span="6">
        <el-tree :data="khtList" highlight-current :props="{ children: 'children',label: 'name' }"
                 @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <el-form :model="kht" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="上级">
            <el-select v-model="kht.parentId" :disabled="disabled">
              <el-option label="无" value=""></el-option>
              <el-option v-for="item in fristKht" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model="kht.code" placeholder="分类代码" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="kht.name" placeholder="分类名称" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="是否末级" prop="isend">
            <el-select v-model="kht.isend" :disabled="disabled">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="顺序号" prop="sort">
            <el-input v-model="kht.sort" :number="true" placeholder="分类顺序号" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="kht.status" :disabled="disabled">
              <el-option label="正常" :value="0"></el-option>
              <el-option label="停用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="kht.remark" placeholder="分类备注" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item v-show="!disabled">
            <el-button type="primary" @click.native="save" :loading="khtLoading">保存</el-button>
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
        isend: 0,
        kht: {
          name: '',
          code: '',
          sort: '',
          isend: '0',
          status: '0',
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
      this.$store.dispatch('getKhtList')
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
          isend: '',
          status: '',
          parentId: ''
        }
      },
      handleNodeClick (row) {
        this.isend = row.isend
        this.$refs.ruleForm.resetFields()
        this.$store.dispatch('findKhtById', {id: row.id}).then((kht) => {
          this.kht = {...kht}
          this.disabled = true
        })
      },
      handleReset () {
        this.$refs.ruleForm.resetFields()
        this.initForm()
      },
      add () {
        if (this.isend === 1) {
          this.$store.commit('alertMsg', {msg: '末级分类下不能添加分类', type: 'warning'})
          return
        }
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
            if (this.kht.id) {
              this.$store.dispatch('updateKht', this.kht)
            } else {
              this.$store.dispatch('addKht', this.kht)
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
        khtList: state => state.basicdata.khtList,
        khtLoading: state => state.showLoading
      }),
      ...mapGetters({fristKht: 'getFirstKht', authBtns: 'authBtns'})
    }
  }
</script>

<style scoped>
  .el-tree {
    overflow-y: hidden;
  }
</style>
