
<template>
  <div>
  </div>
</template>

<script>
import {isWeixin} from'../static/utils/utils.js';
export default {
  /* 后续再优化 */
  beforeMount(){
    const that = this;
    const {code,state} = this.$route.query;
    if(code && state){
      const weixin = isWeixin();
      const ssoToken = that.$cookie.get('ssoToken');
        if (weixin && !ssoToken) {
          that.$axios.get(
          '/user/wechat-auth',
          {
            params:{code},headers:{key:1}
          },
        ).then(res=>{
          if(res.code == 200){
            that.$cookie.set('ssoToken',res.content.token)
            window.location.replace('/home')
          }
        })
      }else{
        that.$router.push('/home')
      }
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
