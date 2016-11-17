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
      <el-row :gutter="20">
        <el-col :span="6">
          <el-tree :data="letList" highlight-current :props="{ children: 'children',label: 'name' }"
                   @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="18">
          <el-table :data="leList" selection-mode="single" stripe style="width: 100%"
                    @row-click="clickRow" highlight-current-row>
            <el-table-column prop="leId" label="分类"></el-table-column>
            <el-table-column prop="code" label="货物编号"></el-table-column>
            <el-table-column prop="name" label="货物名称"></el-table-column>
            <el-table-column prop="size" label="规格型号"></el-table-column>
            <el-table-column prop="weightUpper" label="数量上限"></el-table-column>
            <el-table-column prop="weightLower" label="数量下限"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20, 50, 100, 200]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    data () {
      return {
        isEnd: 0,
        selectRow: {}
      }
    },
    created () {
      this.$store.commit('changeMenu', 'le')
      this.$store.dispatch('getLetList')
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
        this.$store.dispatch('getLeList', {
          offset: this.pageSize * (this.page - 1),
          limit: this.pageSize,
          letId: this.letId
        })
      },
      add () {
        if (this.letId === 0) {
          this.$store.commit('alertMsg', {msg: '请选择货物分类', type: 'warning'})
          return
        }
        console.log(this.selectRow)
        if (this.isEnd === 0 || Number.isNaN(this.isEnd)) {
          this.$store.commit('alertMsg', {msg: '此分类wewr下不能添wewe加，请选择末级分类', type: 'warning'})
          return
        }
        this.$store.commit('changeMenuName', '新增按钮')
        this.$store.commit('leEdit', {
          code: '',
          name: '',
          size: '',
          weightUpper: '',
          weightLower: '',
          remark: ''
        })
        this.$router.push({name: 'leEdit'})
      },
      update () {
        this.le = {...this.selectRow}
        if (!this.le.id) {
          this.$store.commit('noSelect')
          return
        }
        this.le.sort = '' + this.selectRow.sort
        this.$store.commit('changeMenuName', '修改按钮')
        this.$store.commit('leEdit', this.le)
        this.$router.push({name: 'leEdit'})
      },
      del () {
        if (!this.selectRow || !this.selectRow.id) {
          this.$store.commit('noSelect')
          return
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('delLe', {id: this.selectRow.id})
        }).catch(() => {
        })
      },
      clickRow (row) {
        this.selectRow = row
      },
      handleNodeClick (row) {
        this.$store.commit('updateLetId', row.id)
        this.isEnd = row.isEnd
        if (this.isEnd === 1) {
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
    computed: {
      ...mapState({
        menuName: state => state.menuName,
        leList: state => state.basicdata.leList,
        letList: state => state.basicdata.letList,
        btnLoading: state => state.showLoading,
        pageSize: state => state.pageSize,
        page: state => state.page,
        total: state => state.total,
        letId: state => state.basicdata.letId
      }),
      ...mapGetters({authBtns: 'authBtns'})
    }
  }
</script>

<style scoped>
</style>
