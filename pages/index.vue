
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
      const token = that.$cookies.get('token');
      const id = that.$cookies.get('id');
        if (weixin && !token && !id) {
          that.$axios.get(
          '/user/wechat-auth',
          {
            params:{code}
          },
        ).then(res=>{
          if(res.code == 200){
            that.$cookies.set('token',res.content.token)
            that.$cookies.set('id',res.content.id)
            window.localStorage.setItem('isLoad','true');
            history.go(-2)
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
