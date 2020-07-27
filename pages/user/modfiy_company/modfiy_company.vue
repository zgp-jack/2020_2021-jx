<template>
  <div>
    <company ref="company" v-if="show" :info="info" />
  </div>
</template>
<script>
  import company from '../../../components/company/company.vue'
  import { Dialog  } from 'vant';
  export default{
    components:{
      company,
      [Dialog.Component.name]: Dialog.Component,
    },
    data(){
      return{
         info:'',
         show:false,
      }
    },
    beforeMount() {
      //ajax请求需要修改的数据
        this.$axios.post('/company/mine').then(res=>{
          if(res.code == 200){
            this.show = true;
            this.info = res.content;
          }else{
            Dialog.alert({
              title:'提示',
              message:res.msg
            })
          }
        })
    }
  }
</script>
