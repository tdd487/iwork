<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">角色授权</span>
      <div style="float: right;margin-right: 20px;">
        <el-alert title="选择左边的菜单授权" type="info" show-icon></el-alert>
      </div>
    </div>
    <el-row>
      <el-col :span="6">
        <el-tree :data="menuList" highlight-current :props="{ children: 'children',label: 'name' }"
                 @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <div class="kuang">
          <el-checkbox-group v-model="menuBtnIds" @change="changeBtn">
            <el-checkbox v-for="item in menuBtns" :label="item.id">{{item.btnName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button type="primary" @click.native="save" :loading="btnLoading">保存</el-button>
      </el-col>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        oldMenuBtnIds: [],
        menuBtnIds: [],
        menuBtns: [],
        menuId: 0
      }
    },
    created () {
      this.$store.commit('changeMenu', '/role')
      this.$store.dispatch('getMenuList')
    },
    methods: {
      handleNodeClick (row) {
        this.menuId = row.id
        this.$store.dispatch('findRoleAuth', {menuId: row.id, roleId: this.$route.params.roleId}).then((data) => {
          this.menuBtns = data.menuBtns
          this.menuBtnIds = data.roleMenuBtns.map(t => t.menuBtnId)
          this.oldMenuBtnIds = [...this.menuBtnIds]
        })
      },
      save () {
        this.$store.dispatch('roleAuth', {
          roleId: this.$route.params.roleId, oldMenuBtnIds: this.oldMenuBtnIds, menuBtnIds: this.menuBtnIds
        })
      },
      changeBtn () {
      }
    },
    computed: {
      ...mapState({
        menuList: state => state.system.menuList,
        btnLoading: state => state.showLoading
      })
    }
  }
</script>

<style scoped>
  .el-tree {
    overflow-y: hidden;
  }

  .kuang {
    margin-left: 20px;
    padding-left: 0;
    line-height: 30px;
  }

  .el-alert {
    margin: 0 20px;
  }

  button {
    margin: 10px 0 0 20px;
  }

  .el-checkbox {
    margin-left: 15px !important;
  }
</style>
