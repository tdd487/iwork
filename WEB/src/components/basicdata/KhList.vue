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
    <el-row  :gutter="20">
      <el-col :span="6">
        <el-tree :data="khtList" highlight-current :props="{ children: 'children',label: 'name' }"
                 @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <el-table :data="khList" stripe
                  @row-click="clickRow" highlight-current-row >
          <el-table-column prop="code" label="代号" min-width="120"></el-table-column>
          <el-table-column prop="name" label="名称" min-width="120"></el-table-column>
          <el-table-column prop="contacts" label="联系人" min-width="120"></el-table-column>
          <el-table-column prop="tel" label="电话" min-width="120"></el-table-column>
          <el-table-column prop="addr" label="地址" min-width="120"></el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    data () {
      return {
        isend: 0,
        selectRow: {}
      }
    },
    created () {
      this.$store.commit('changeMenu', 'kh')
      this.$store.dispatch('getKhtList')
      this.getList()
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
      clickRow (row) {
        this.selectRow = row
      },
      getList () {
        this.$store.dispatch('getKhList', {offset: this.pageSize * (this.page - 1), limit: this.pageSize, khtId: this.khtId})
      },
      add () {
        if (this.khtId === 0) {
          this.$store.commit('alertMsg', {msg: '请选择单位分类', type: 'warning'})
          return
        }
        if (this.isend === 0) {
          this.$store.commit('alertMsg', {msg: '此分类下不能添加，请选择末级分类', type: 'warning'})
          return
        }
        this.$store.commit('changeMenuName', '新增单位资料')
        this.$store.commit('khEdit', {code: '', name: '', fullname: '', contacts: '', tel: '', addr: '', remark: '', khtId: this.khtId})
        this.$router.push({name: 'khEdit'})
      },
      update () {
        this.kh = {...this.selectRow}
        if (!this.kh.id) {
          this.$store.commit('noSelect')
          return
        }
        this.$store.commit('changeMenuName', '修改单位资料')
        this.$store.commit('khEdit', this.kh)
        this.$router.push({name: 'khEdit'})
      },
      del () {
        if (!this.selectRow || !this.selectRow.id) {
          this.$store.commit('noSelect')
          return
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('delKh', {id: this.selectRow.id})
        }).catch(() => {
        })
      },
      handleNodeClick (row) {
        this.$store.commit('sendKhtId', row.id)
        this.isend = row.isend
        if (this.isend === 1) {
          this.getList()
        }
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
    watch: {
      btnLoading (newVal) {
        if (!newVal) {
          this.disabled = true
        }
      }
    },
    computed: {
      ...mapState({
        menuName: state => state.menuName,
        khtList: state => state.basicdata.khtList,
        khList: state => state.basicdata.khList,
        btnLoading: state => state.showLoading,
        pageSize: state => state.pageSize,
        page: state => state.page,
        khtId: state => state.basicdata.khtId,
        total: state => state.total
      }),
      ...mapGetters({authBtns: 'authBtns'})
    }
  }
</script>

<style scoped>
  .el-tree {
    overflow-y: hidden;
  }
</style>
