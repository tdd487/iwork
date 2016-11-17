<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">{{ menuName }}</span>
        <el-button-group style="float: right">
          <el-button type="primary" v-for="btn in authBtns" @click.native="btnClick(btn.code)" size="small"><i
            :class="btn.icon"></i> {{btn.name}}
          </el-button>
        </el-button-group>
      </div>
      <el-table :data="btnList" stripe style="width: 100%"
                @row-click="clickRow" highlight-current-row >
        <el-table-column prop="name" label="名称" min-width="120"></el-table-column>
        <el-table-column prop="code" label="代号" min-width="120"></el-table-column>
        <el-table-column prop="icon" label="图标" min-width="120"></el-table-column>
        <el-table-column prop="sort" label="顺序号" show-tooltip-when-overflow></el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    data () {
      return {
        selectRow: {},
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519  弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    created () {
      this.$store.commit('changeMenu', 'btn')
      this.getList()
      this.$on('add', () => this.add())
      this.$on('update', () => this.update())
      this.$on('del', () => this.del())
    },
    methods: {
      btnClick (code) {
        this.$emit(code)
      },
      getList () {
        this.$store.dispatch('getBtnList', {offset: this.pageSize * (this.page - 1), limit: this.pageSize})
      },
      add () {
        this.$store.commit('changeMenuName', '新增按钮')
        this.$store.commit('btnEdit', {code: '', name: '', icon: '', sort: ''})
        this.$router.push({name: 'btnEdit'})
      },
      update () {
        this.btn = {...this.selectRow}
        if (!this.btn.id) {
          this.$store.commit('noSelect')
          return
        }
        this.btn.sort = '' + this.selectRow.sort
        this.$store.commit('changeMenuName', '修改按钮')
        this.$store.commit('btnEdit', this.btn)
        this.$router.push({name: 'btnEdit'})
      },
      del () {
        if (!this.selectRow || !this.selectRow.id) {
          this.$store.commit('noSelect')
          return
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('delBtn', {id: this.selectRow.id})
        }).catch(() => {
        })
      },
      clickRow (row) {
        this.selectRow = row
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
        menuName: state => state.menuName,
        btnList: state => state.system.btnList,
        btnLoading: state => state.showLoading,
        pageSize: state => state.pageSize,
        page: state => state.page,
        total: state => state.total
      }),
      ...mapGetters({authBtns: 'authBtns'})
    }
  }
</script>

<style scoped>
</style>
