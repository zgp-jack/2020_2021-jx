<!-- 首页 -->
<template>
  <div class="container">
	  <div id="head">
      <div class="left_dom">
        <h1 class="fl">
          <img src="http://statics.zhaogongdi.com/common/logo_m.png" alt="">
        </h1>
        <div @click="chooseArea" class="position fl">
          <i class="icon-dingwei iconfont" /><b>成都</b>
          <strong class="iconfont icon-youjiantou"></strong>
        </div>
      </div>
      <div class="right_dom fr">
        <a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.yupao.machine"></a>
      </div>
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" indicator-color="white" width="7.5rem" :autoplay="3000" ref="resize">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div class="menus">
      <a href="">
        <img src="http://statics.zhaogongdi.com/xcx/index_tenant.png" alt="">
        <span>机械求租</span>
      </a>
      <a href="">
        <img src="http://statics.zhaogongdi.com/xcx/index_create_tenant.png" alt="">
        <span>发布求租</span>
      </a>
      <a href="">
        <img src="http://statics.zhaogongdi.com/xcx/index_mahcine.png" alt="">
        <span>机械出租</span>
      </a>
      <a href="">
        <img src="../../assets/img/home-images/Lark20200608-172704.png" alt="">
        <span>招聘机手</span>
      </a>
      <a href="">
        <img src="http://statics.zhaogongdi.com/xcx/index_ershou.png" alt="">
        <span> 机械转让</span>
      </a>
      <a href="">
        <img src="http://statics.zhaogongdi.com/xcx/index_want.png" alt="">
        <span> 机械求购</span>
      </a>
      <a href="">
        <img src="http://statics.zhaogongdi.com/xcx/index_invitation.png" alt="">
        <span> 邀请好友</span>
      </a>
      <a href="">
        <img src="../../assets/img/home-images/supplier.png" alt="">
        <span> 供应商</span>
      </a>
    </div>
    <div class="list_title">
      <div v-for="(itme,index) in title_data" v-on:click="changeTitle(index)">
         <span  :class="title_active == index ? 'active' : '' ">{{itme.name}}</span>
      </div>
    </div>
    <div class="list_content">
      <div v-for="(item,index) in title_data" v-if="title_active == index">
        <firstListItem />
      </div>
    </div>
    <Tarbar />
  </div>
</template>

<script>
import Tarbar from '../../components/tarbar'
import firstListItem from '../../components/firstListItem/index.vue'
import { Swipe , SwipeItem } from 'vant';

export default {
  data(){
    return{
      title_data:[{name:"机械求租"},{name:"机械出租"},{name:"机械转让"},{name:"机械求购"}],
      title_active:1
    }
  },
  components: {
    Tarbar: Tarbar,
    "van-swipe": Swipe,
    "van-swipe-item" : SwipeItem,
    'firstListItem':firstListItem
  },
  mounted(){
    // 轮播图重新获取上一级的尺寸
    setTimeout(()=>{
      this.$refs.resize.resize()
    },0)

  },
  methods:{
    changeTitle(index){
       this.title_active = index;
    },
    // 选择城市
    chooseArea(){

    }
  },
  created(){
    //banner数据

  }
}
</script>

<style lang='scss'>
@import "./style.scss"

</style>
