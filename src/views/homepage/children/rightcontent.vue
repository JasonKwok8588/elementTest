<template>
  <div class="right-content" :style="isRetract ? 'left:64px;':'left:250px;'">
      <router-view></router-view>
  </div>
</template>

<script>
import Bus from './bus'
export default {
    created(){
        Bus.$on('retract',res => {
            this.isRetract = res
        })
    },
    data(){
        return {
            isRetract:false,
        }
    }
}
</script>

<style lang='less' scoped>
    .right-content{
        position:absolute;
        top: 70px;
        right: 0;
        bottom: 0;
        background-color: aquamarine
    }
</style>