<template>
  <div class="list-item">
    <nuxt-link :to="{path:'/view/',query:{info:data.uu,mode:data.mode}}">
      <div class="title">
        <b class="seting-top" v-if="data.top"></b>
        <span>{{data.title}}</span>
        <b class="complate-state"></b>
      </div>
      <div class="left-img">
        <img :src="data.cover && data.cover!='' ? data.cover : default_img.default_header" alt="">
      </div>
      <div class="right-inner">
        <div class="basic-info">
           <p class="userName">{{data.user}}</p>
           <p class="userTel">{{data.tel}}</p>
           <p class="tel-icon"  @click.prevent ="callPhone(data.tel,data.uu,data.mode)" v-show="is_mine"></p>
        </div>
        <div class="type-class">
          <a href="javascript:;"  v-for="(itemSon,i) in data.class" :key="i">{{itemSon.name}}</a>
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
    <call-confirm :userInfo="item_flag" v-if="show" />
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
        default_img:{},
        is_mine:true, //是否是自己发布的消息
        show:false,  //是否显示弹框
        item_flag:{},
        
      }
    },
    created(){
      this.default_img={...this.$store.state.default_portrait};
    },
    methods:{
      // //打电话弹框显示
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

<style lang="scss" scoped="scoped">
  @import './style.scss';
</style>
