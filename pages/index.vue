
<template>
  <div></div>
</template>

<script>
import {setCookie,isWeixin,getCookie} from'../static/utils/utils.js'
export default {
  /* 后续再优化 */
  beforeMount(){
    const that = this;
    const {code,state} = this.$route.query;
    if(code && state){
      const weixin = isWeixin();
      const ssoToken = getCookie('ssoToken');
        if (weixin && !ssoToken) {
          that.$axios.get(
          '/user/wechat-auth',
          {
            params:{code},headers:{key:1}
          },
        ).then(res=>{
          if(res.code == 200){
            setCookie('ssoToken',res.content.token,7)
            let url = window.location.origin+'/home';
            window.location.href = url
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
