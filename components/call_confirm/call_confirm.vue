<template>
    <div>
      <van-dialog class="phone_alert" v-model="show" title="温馨提示" @confirm="go_call" show-cancel-button confirmButtonText="去拨打">
        <p class="ask">你是否要拨打电话?</p>
        <div class="tips">
          <input type="checkbox" v-model="whether">七天内不再提示
        </div>
      </van-dialog>
    </div>
</template>

<script>
  import { Dialog } from 'vant';
  export default{
    components:{
       "van-dialog": Dialog.Component,
    },
    props:['is_show','item_flag'],
    data(){
      return{
        show:true,
        whether:false
      }
    },
    methods:{
      go_call(){
        console.log(123)
      }
    },
    created(){
    
    },

    watch:{

    }

  }
</script>

<style lang='scss' scoped>
  .phone_alert{
    width: 5.09rem;
    height: 3.49rem;
    .ask{
      padding-top: 0.42rem;
      text-align: center;
      color: #585963;
      font-size: 0.27rem;
      padding-bottom: 0.1rem;
    }
    .tips{
      margin-bottom: 0.3rem;
      text-align: center;
      font-size: 0.2rem;
      color: #868686;
      input{
        vertical-align: -10%;
      }
    }
  }
</style>
