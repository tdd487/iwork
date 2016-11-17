<template>
  <div id="app">
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style>
  @import "./assets/css/base.css";
  @import "./assets/css/animate.css";

  #app {
    height: 100%;
  }
  .el-card__header {
    padding: 10px 20px !important;
  }
  .el-card.box-card {
    margin-bottom: 10px !important;
  }
  .el-table tr.current-row td{
    background-color: #C0CCDA !important;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #C0CCDA !important;
  }
  .el-pagination{
    margin-top: 20px;
    text-align: right;
  }
</style>
