<template>
  <div>
    <company ref="company" />
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
         info:''
      }
    },
    created() {
      //ajax请求需要修改的数据
        this.$axios.post('/company/mine').then(res=>{
          if(res.code == 200){
            this.info = res.content;
            //ajax请求成功以后调用子组件的方法，把获取到的数据给子组件
            this.$refs.company.getParentData(res.content)
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
