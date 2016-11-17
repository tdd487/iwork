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
        <el-tree :data="letList" highlight-current :props="{ children: 'children',label: 'name' }"
                 @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <el-form :model="let" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="上级分类">
            <el-select v-model="let.parentId" :disabled="disabled">
              <el-option label="无" value=""></el-option>
              <el-option v-for="item in fristLet" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类编号" prop="code">
            <el-input v-model="let.code" placeholder="分类代码" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="let.name" placeholder="分类名称" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="是否末级" prop="isend">
            <el-select v-model="let.isEnd" :disabled="disabled">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="sort">
            <el-input v-model="let.remark"  placeholder="备注" :disabled="disabled"></el-input>
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
      return {
        disabled: true,
        let: {
          code: '',
          name: '',
          remark: '',
          isend: '0',
          parentId: '',
          les: []
        },
        rules: {
          code: [
            {required: true, message: '请输入分类代号', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.$store.commit('changeMenu', 'let')
      this.$store.dispatch('getLetList')
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
        this.let = {
          code: '',
          name: '',
          remark: '',
          isEnd: '',
          parentId: '',
          les: []
        }
      },
      handleNodeClick (row) {
        this.$refs.ruleForm.resetFields()
        this.$store.dispatch('findLetById', {id: row.id}).then((let1) => {
          this.let = {...let1}
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
        if (!this.let.id) {
          this.$store.commit('noSelect')
          return
        }
        this.let.sort = '' + this.let.sort
        this.disabled = false
      },
      save () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.let.id) {
              this.$store.dispatch('updateLet', this.let)
            } else {
              this.$store.dispatch('addLet', this.let)
            }
          }
        })
      },
      del () {
        if (!this.let || !this.let.id) {
          this.$store.commit('noSelect')
          return
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('delLet', this.let)
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
        letList: state => state.basicdata.letList,
        btnLoading: state => state.showLoading
      }),
      ...mapGetters({fristLet: 'getFirstLet', authBtns: 'authBtns'})
    }
  }
</script>

<style scoped>
  .el-tree {
    overflow-y: hidden;
  }
</style>
