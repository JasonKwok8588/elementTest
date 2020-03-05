<template>
  <section class="home-head">
    <h3>叩丁狼客户管理系统</h3>
    <i @click='changeBar' class="el-icon-menu"></i>
    <el-dropdown @command='handleCommand' trigger='click' class="head-right">
      <span class="el-dropdown-link">
        admin
        <i  class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu  slot="dropdown">
        <el-dropdown-item command='logout'>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>

<script>
// 使用BUS完成兄弟主键通信
import Bus from './bus';

export default {
    data(){
        return{
            isRetract:false,
        }
    },
    methods:{
        changeBar(){
            // 发送自定义事件
            this.isRetract = ! this.isRetract;
            Bus.$emit('retract',this.isRetract)
        },
        handleCommand(val){
            console.log(val)
        }
    },

};
</script>

<style lang='less' scoped>
.home-head {
  height: 70px;
  background-color: #409eff;
  line-height: 70px;
  color: #fff;
  h3 {
    color: #fff;
    font-size: 24px;
    display: inline-block;
    padding: 0 10px;
  }
  .el-icon-menu {
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
  .head-right{
      color: #fff;
      float:right;
      margin-right: 20px;
      cursor: pointer;
  }
}
</style>