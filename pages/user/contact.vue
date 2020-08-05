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
import Headers from '../../components/header';
import axios from 'axios';
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
    async asyncData ({$axios}){
        //if(content && content.$axios){
          return await $axios.get('https://cnodejs.org/api/v1/topics').then(res=>{
              // if(res){
                return {
                  title:res.data[0].title
                }
              // }
          })
          //if(data){
          //  return { title:data[0].title }
          //}
        //} 
      },
    // async asyncData (){
    //   console.log(123)
    //   return await axios.get('http://jxapi.kkbbi.com/index/get-yupao?source=M').then(res=>{
    //     if(res.data.code == 200){
    //       return { contat: res.data.content }
    //     }
    //   })
    // },
    // beforeMount(){
    //   this.$axios.get('/index/get-yupao').then(res=>{
    //     this.contat = {...res.content}
    //   })
    // }
}
</script>

<style lang='scss' scoped>
  @import './contact.scss';
</style>
