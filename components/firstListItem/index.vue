<template>
  <div class="list-item">
    <!-- {{MechanicalType_link[data.item.mode]}} -->
    <nuxt-link :to="{path:`/${(data.item.mode==1?'qiuzu/':'qiugou/')+data.item.uu}.html`}">
      <div class="title">
        <b class="seting-top" v-if="data.item.top"></b>
        <h1>{{data.item.title}}</h1>
        <b class="complate-state" :style="{'background-image': 'url('+require('../../assets/img/other/rented.png')}" v-if="(data.item.mode == 1 && data.item.status == 2)"></b>
        <b class="complate-state" :style="{'background-image': 'url('+require('../../assets/img/other/finished.png')}" v-if="(data.item.mode == 4 && data.item.status==2)"></b>
      </div>
      <div class="left-img">
        <img :src="data.item.cover && data.item.cover!='' ? data.item.cover : default_img" alt="">
      </div>
      <div class="right-inner">
        <div class="basic-info">
           <p class="userName">{{data.item.user}}</p>
           <p class="userTel">{{data.item.status == 2 ? data.item.tel.slice(0,7) + "****" : data.item.tel}}</p>
           <p class="tel-icon"  @click.prevent ="callPhone(data.item.tel,data.item.uu,data.item.mode,data.index)" v-show="!(data.item.is_mine || data.item.status == 2)">
             <span></span>
           </p>
        </div>
        <div class="type-class">
          <a href="javascript:;"  v-for="(itemSon,i) in data.item.class" :key="i">{{itemSon.name}}</a>
        </div>
        <div class="position-time">
          <div class="position fl">
            <i class=""></i>
             {{data.item.area}}
          </div>
          <div class="time fr">
            {{data.item.time}}
          </div>
        </div>
      </div>
    </nuxt-link>
    <!-- 弹框 -->
    <call-confirm @phoneNunber="getPhone" :data="item_flag" v-if="show" />
  </div>
</template>

<script>
  import { Dialog,Toast } from 'vant';
  import call_confirm from '../call_confirm/call_confirm';
  import {callPhoneFn,showPhoneFn,whetherLogin} from '../../static/utils/utils.js';
  import {MechanicalType_link} from '../../static/utils/link.js'
  export default{
   props:['data'],
   components:{
      [Dialog.Component.name]: Dialog.Component,
     "call-confirm":call_confirm,
   },
    data(){
      return{
        default_img:'http://statics.zhaogongdi.com/common/default_header.png',
        is_mine:true, //是否是自己发布的消息
        show:false,  //是否显示弹框
        shows:false, //去充值弹窗
        item_flag:{},
        state_img:"url(../../assets/img/other/rented.png)",
        complatePhone:'',
      }
    },
    beforeMount(){
      // let aa = MechanicalType_link
      // debugger
      this.stateImage();
    },
    computed: {
      // default_img(){
      //   return this.$store.state.default_portrait;
      // }
    },
    methods:{
        //打电话弹框显示
        callPhone(phone,id,mode,index){
          let that = this;
          //判断是否登录
          if(whetherLogin(this) == false) return false;
          //判断是否查看了完整的电话号码
          let reg = /\*+/;
          if(!reg.test(phone)){
            //打电话
            callPhoneFn(phone)
            return false;
          }
          //获取改条信息的id  和 属于类型
          this.item_flag.id=id,
          this.item_flag.mode = mode
          this.item_flag.index = index;
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
            let data = {
              id,
              mode
            };
            showPhoneFn(that,Toast,data)
          }
        },
        //勾选了七天不提示弹框后调用的函数
        giveParentPhone(obj){
          this.getPhone(obj)
        },
        //状态显示的图片
        stateImage(){

        },
        //得到子组件传的电话号码
        getPhone(obj,yue){
          this.yue = yue
          this.$emit("giveParent",obj,yue)
        }
      }

  }
</script>

<style lang="scss" scoped="scoped">
  @import './style.scss';
</style>
