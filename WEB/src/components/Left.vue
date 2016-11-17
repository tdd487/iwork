<template>
    <el-menu :default-active="menuSelect" class="el-menu-vertical" @open="handleopen" @close="handleclose"
             theme="dark" unique-opened router unique-opened>
      <el-submenu v-for="m1 in userAuth" :index="m1.name">
        <template slot="title"><i :class="m1.icon"></i>{{m1.name}}</template>
        <el-menu-item v-for="menu in m1.children" :index="'/'+menu.code"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
      }
    },
    methods: {
      handleopen () {
      },
      handleclose () {
      }
    },
    created () {
      this.$store.dispatch('getUserMenu')
    },
    computed: mapState({
      menuSelect: state => state.menuSelect,
      userAuth: state => state.userAuth
    })
  }
</script>

<style scoped>
  .el-menu-vertical {
    border-radius: 0 !important;
  }
</style>
