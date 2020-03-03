<template>
  <div style=" width:120px; margin:0 auto;">
    <el-button @click="jumpToLogin" class="index-btn" >
      跳转登录页
    </el-button>
  </div>
</template>

<script>
export default {
     methods:{
    jumpToLogin(){
      this.$router.push('/login')
    }
  },
}
</script>

<style>

</style>