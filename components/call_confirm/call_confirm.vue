<template>
    <div>
      <van-dialog class="phone_alert" v-model="show" title="温馨提示"  @confirm="go_call" show-cancel-button confirmButtonText="去拨打" confirm-button-color='#FFAA26'>
        <p class="ask">你是否要拨打电话?</p>
        <div class="tips">
          <input type="checkbox" v-model="whether">七天内不再提示
        </div>
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
    props:['data'],
    data(){
      return{
        show:true,
        whether:false,
      }
    },
    methods:{
      giveParentPhone(obj,yue){
        this.$emit('phoneNunber',obj,yue)
      },
      go_call(){
        let that = this;
        //是否勾选了七天不再提示
        if(this.whether){
           var future = new Date().getTime() + 604800000;
           document.cookie = "havaSeven" + "=" + future + ";expires=" + new Date(future)+";path=/";
        }
        let data = {
          id:this.$props.data.id,
          mode:this.$props.data.mode
        }
        //进行ajax请求,获取完整的电话号码  ---- 进行打电话
        showPhoneFn(that,Toast,data)
      },
    }

  }
</script>

<style lang='scss' scoped>
  .phone_alert{
    width: 6.09rem;
    font-size: 0.4rem;
    height: auto;
    .ask{
      padding-top: 0.42rem;
      text-align: center;
      color: #585963;
      font-size: 0.3rem;
      padding-bottom: 0.2rem;
    }
    .van-dialog{
     
    }
    .van-dialog__header{
      font-size: 0.3rem;
    }
    .tips{
      margin-bottom: 0.3rem;
      text-align: center;
      font-size: 0.28rem;
      color: #868686;
      input{
        vertical-align: -13%;
      }
    }
  }
</style>
