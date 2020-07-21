<template>
    <div>
      <van-dialog class="phone_alert" v-model="show" title="提示"   show-cancel-button confirmButtonText="领礼包" cancelButtonText="去充值"
      confirmButtonColor = #FFA926 width = 240px closeOnClickOverlay>
        <p class="ask">鱼泡币不足?领取礼包,可免费查看电话</p>
      </van-dialog>
    </div>
</template>

<script>
  import { Dialog } from 'vant';
  import Vue from 'vue';
  import { Toast } from 'vant';
  import {callPhoneFn,showPhoneFn} from '../../static/utils/utils.js';
  export default{
    components:{
       "van-dialog": Dialog.Component,
    },
    props:['userInfo'],
    data(){
      return{
        show:true,
        whether:false,
      }
    },
    methods:{

    }

  }
</script>

<style lang='scss' scoped>
  .phone_alert{
    width: 5.09rem;
    height: auto;
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
        vertical-align: -13%;
      }
    }
  }
</style>
