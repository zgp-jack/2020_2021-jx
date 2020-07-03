<template>
  <div class="list-item">
    <div class="left-img fl" :style="'background-image:url('+(data.cover && data.cover!=''?data.cover:default_img)+')'">
      <span></span>
    </div>
    <div class="right-inner fl">
      <div class="title">{{data.title}}</div>
      <div class="basic-info fl">
         <p class="userTel fl">{{data.tel}}</p>
         <p class="tel-icon fr"  @click="callPhone('123456')" v-show="is_mine"></p>
      </div>
      <div class="position-time">
        <div class="position fl">
          <i class="icon-dingwei iconfont"></i>
           {{data.area}}
        </div>
        <div class="time fr">
          {{data.time}}
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
    props:['data'],
    components:{
       [Dialog.Component.name]: Dialog.Component,
    },
    data(){
      return{
        default_img:'http://statics.zhaogongdi.com/common/default_cover.png',
        is_mine:true, //是否是自己发布的消息
        show:false,  //是否显示弹框
        whether:false //是否勾选七天内不打电话
      }
    },
    methods:{
      //打电话弹框显示
      callPhone(str){
        // 获取本地存储
        let is_seven = localStorage.getItem('is_seven');
        let reg = /\*+/; //判断是否查看了完整电话号码
        if( !reg.test(str)){
          console.log(123)
           return false
        };
        if(is_seven == "false" || is_seven == null){
          this.show = true
        }else{
          console.log('dadianh')
        }
        console.log(str)

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

<style lang="scss" scoped>
  @import './style.scss'
</style>
