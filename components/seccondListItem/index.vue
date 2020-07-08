<template>
  <div class="list-item">
    <nuxt-link :to="{path:'/view/',query:{info:data.uu,mode:data.mode}}">
      <div class="left-img fl" :style="'background-image:url('+(data.cover && data.cover!=''?data.cover:default_img)+')'">
        <span></span>
      </div>
      <div class="right-inner fl">
        <div class="title">
          <span>{{data.title}}</span>
        </div>
        <div class="basic-info fl">
           <p class="userName fl">{{data.user}}</p>
           <p class="userTel fl">{{data.tel}}</p>
           <p class="tel-icon fr"  @click.prevent="callPhone(data.tel,data.uu,data.mode)" v-show="is_mine"></p>
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
    </nuxt-link>
    <!-- 弹框 -->
   <!-- <van-dialog class="phone_alert" v-model="show" title="温馨提示" @cancel="go_cancel" @confirm="go_call" show-cancel-button confirmButtonText="去拨打">
      <p class="ask">你是否要拨打电话?</p>
      <div class="tips">
        <input type="checkbox" v-model="whether">七天内不再提示
      </div>
    </van-dialog> -->
    <call-confirm v-if="show" :userInfo="item_flag" />
  </div>
</template>

<script>
  import { Dialog } from 'vant';
  import call_confirm from '../call_confirm/call_confirm'
  export default{
    props:['data'],
    components:{
       [Dialog.Component.name]: Dialog.Component,
       "call-confirm":call_confirm
    },
    data(){
      return{
        default_img:'http://statics.zhaogongdi.com/common/default_cover.png',
        is_mine:true, //是否是自己发布的消息
        show:false,  //是否显示弹框
        item_flag:{}
      }
    },
    created(){
      this.default_img= this.$store.state.default_portrait.default_cover
    },
    methods:{
      //打电话弹框显示
      callPhone(phone,id,mode){
        let that = this;
        //判断是否登录
        if(!"login"){
          this.$router.replace("/login")
          return false;
        }
        //判断是否查看了完整的电话号码
        let reg = /\*+/;
        if(!reg.test(phone)){
          window.location.href = "tel:"+phone;
          return false;
        }
        //获取改条信息的id  和 属于类型
        this.item_flag.id=id,
        this.item_flag.mode = mode
        // 获取本地存储判断是否勾选了七天不提示
        let cookies = document.cookie;
        if(!cookies.includes("havaSeven")){
          //弹出选择框
          if(this.show){
             this.show = !(this.show);
          }
          setTimeout(()=>{
              that.show = !(that.show);
          },20)

        }else{
          //调用请求获取完整的电话号码
          console.log('调用请求获取完整的电话号码')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import './style.scss'
</style>
