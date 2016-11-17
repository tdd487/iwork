<template>
  <div class="h100">
    <my-header></my-header>
    <prograssbar></prograssbar>
    <el-row :gutter="24">
      <el-col :span="5">
        <my-left></my-left>
      </el-col>
      <el-col :span="19">
        <div class="content">
          <transition enter-active-class="animated bounceInDown">
            <router-view></router-view>
          </transition>
          <div class="margin-v-20"></div>
          <!--          <div>页面底部</div>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import MyHeader from './Header'
  import MyLeft from './Left'
  import Prograssbar from './common/Prograssbar'
  export default {
    data () {
      return {
      }
    },
    components: {
      MyHeader,
      MyLeft,
      Prograssbar
    },
    computed: mapState({
      message: state => state.message
    }),
    watch: {
      message (newVal, oldVal) {
        if (newVal != null) {
          this.$message({
            message: newVal.message,
            type: newVal.type
          })
          newVal = null
        }
      }
    }
  }
</script>

<style scoped>
  .h100{overflow-y: hidden;}
  .el-row {
    height: 100%;
    margin-right: 0 !important;
  }

  .el-col-5 {
    padding-right: 0 !important;
    height: 100%;
    overflow-y: auto;
    margin-bottom: 50px;
    background-color: #324057;
  }

  .el-col-5 .el-menu {
    margin-bottom: 50px;
  }

  .el-col-19 {
    padding-right: 0 !important;
    height: 100%;
    overflow-y: auto;
    margin-top: 1px;
  }

  .content {
    padding-top: 10px;
    padding-right: 10px;
    margin-bottom: 70px;
  }
</style>
