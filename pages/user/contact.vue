<template>
    <div>
      <Headers :title="title"/>
        <div class="content">
          <h1 class="contact-title">联系我们</h1>
          <div class="contact-container">
              <div>电话:<span>{{contat.tel}}</span></div>
              <div>邮箱:<span>{{contat.email}}</span></div>
              <div>地址:<span>{{contat.addr}}</span></div>
          </div>
        </div>
     </div>
</template>

<script>
import Headers from '../../components/header'
export default {
  components:{
    Headers
  },
    data(){
      return{
        contat:{},
        title:'联系我们'
      }
    },
    asyncData(page){
      return page.app.$axios.get('/index/get-yupao').then(res=>{
        return {
          contat : {...res.content}
        }
      })
    },
    beforeMount(){
    }
}
</script>

<style lang='scss' scoped>
  @import './contact.scss';
</style>
