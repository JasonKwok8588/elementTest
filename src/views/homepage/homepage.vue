<template>
  <div class="homepage-wapper">
    <!-- 头部 -->
    <home-head></home-head>
    <!-- 左侧菜单 -->
    <home-left-nav></home-left-nav>
    <!-- 右侧内容 -->
    <home-right-content></home-right-content>
    
  </div>
</template>

<script>
import homeHead from './children/head';
import homeLeftNav from './children/leftnav';
import homeRightContent from './children/rightcontent'
export default {
    components:{
        homeHead,
        homeLeftNav,
        homeRightContent
    }
}
</script>

<style lang='less' scoped>
  .homepage-wapper{
    position: relative;
    height:100%;
  }
</style>