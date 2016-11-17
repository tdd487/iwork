<template>
  <div class="header">
    <el-row :gutter="24">
      <el-col :span="5">
        <div class="logo"><img @click="goHome" src="../assets/img/logo.png" height="40" width="114"/></div>
      </el-col>
      <el-col :span="19">
        <ul class="nav">
          <li>智能称重服务平台</li>
          <li class="r"><el-dropdown trigger="click"  @command="handleselect">
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon-setting"></i>
          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePsw">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      handleselect (command) {
        if (command === 'logout') {
          this.$store.dispatch('logout')
        }
      },
      goHome () {
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  .el-row {
    margin-right: 0 !important;
  }

  .el-col-5 {
    padding-right: 0 !important;
  }

  .el-col-19 {
    padding-right: 0 !important;
  }

  .header {
    position: relative;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.2);
  }

  .logo {
    padding-left: 10px;
    color: #FFFFFF;
    background-color: #324057;
    height: 50px;
    line-height: 50px;
  }
  .logo img{
    cursor: pointer;
    margin-top: 5px;
  }

  ul.nav {
    padding: 0 16px;
    list-style: none;
    margin: 10px 0 0 0;
  }

  ul.nav > li {
    float: left;
  }

  ul.nav > li.r {
    float: right;
  }
</style>
