
<template>
  
</template>

<script>

export default {
  /* 后续再优化 */
  beforeCreate(){
    debugger
    
    const that = this;
    const {code,state} = this.$route.query;
    if(code && state){
      that.$axios.get('https://api.weixin.qq.com/sns/oauth2/refresh_token',{params:{appid:'wx97877fe3b35187a7',refresh_token:code,grant_type:code}}).then(res=>{
        if(res && res.openid){
          console.log(res)
        }
      })
    }else{
      if(that.$route.path == '/' || !this.$route.path){
        that.$router.push('/home')
      }
    }
  }
}
</script>
<style>
</style>
