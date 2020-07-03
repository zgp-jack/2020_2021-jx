<template>
  <div class="list-item">
    <div class="title">123456</div>
    <div class="left-img">
      <img :src="default_img" alt="">
    </div>
    <div class="right-inner">
      <div class="basic-info">
         <p class="userName">张大dfadfd发到哪里看的积分卡建安费地方撒大家快来房间大炮</p>
         <p class="userTel">18384374***</p>
         <p class="tel-icon"  @click="callPhone" v-show="is_mine"></p>
      </div>
      <div class="position-time">
        <div class="position fl">
          <i class="icon-dingwei iconfont"></i>
           西藏 布达拉宫
        </div>
        <div class="time fr">
          2020-05-26 10:00:00
        </div>
      </div>
    </div>
    <!-- 弹框 -->
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
      [Dialog.Component.name]: Dialog.Component,
   },
    data(){
      return{
        default_img:'http://statics.zhaogongdi.com/common/default_header.png',
        is_mine:true, //是否是自己发布的消息
        show:false,  //是否显示弹框
        whether:false //是否勾选七天内不打电话
      }
    },
    methods:{
      //打电话弹框显示
        callPhone(){
          // 获取本地存储
          let is_seven = localStorage.getItem('is_seven');

          if(is_seven == "false" || is_seven == null){
            this.show = true
          }else{
            console.log('dadianh')
          }


        },
        //点击去拨打按钮
        go_call(){
          //勾选了选择框
          if(this.whether){
             localStorage.setItem('is_seven',"true")
          }
        }

      }

  }
</script>

<style lang="scss" scoped="scoped">
  @import './style.scss';
</style>
