
<template>
  
</template>

<script>

export default {
  /* 后续再优化 */
  beforeCreate(){
    debugger
    if(this.$route.path == '/' || !this.$route.path){
      this.$router.push('/home')
    }
  }
}
</script>
<style>
</style>
