<!-- 首页 -->
<template>
  <div class="container">
    <chooseArea :onSelect="onSelect" :isSelect_area="isSelect_area" />
	  <div id="head">

      <div class="left_dom">
        <h1 class="fl">
          <img src="http://statics.zhaogongdi.com/common/logo_m.png" alt="">
        </h1>
        <div @click="chooseArea" class="position fl">
          <i class="icon-dingwei iconfont" /><b>{{selectAreaData.name || '成都'}}</b>
          <strong class="iconfont icon-youjiantou"></strong>

        </div>
      </div>
      <div class="right_dom fr">
        <a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.yupao.machine"></a>
      </div>
    </div>
    <div class="banner">
      <Banner :obj="banner_children"></Banner>
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
      <div v-for="(item,index) in title_data" :data-type="item.type" v-if="title_active == index">
        <firstListItem v-if="(item.type == 1 || item.type == 4)" />
        <seccondListItem v-else />
        <p class="more">查看更多机械求租信息</p>
      </div>
    </div>
    <Tarbar />
  </div>
</template>

<script>
import Tarbar from '../../components/tarbar'
import firstListItem from '../../components/firstListItem/index.vue'
import seccondListItem from '../../components/seccondListItem/index.vue'
import { Swipe , SwipeItem } from 'vant';
import Banner from '../../components/banner/banner.vue'
import chooseArea from '../../components/customArea/index.vue'

export default {
  components: {
    Tarbar: Tarbar,
    "van-swipe": Swipe,
    "van-swipe-item" : SwipeItem,
    'firstListItem':firstListItem,
    'seccondListItem':seccondListItem,
    "Banner" :Banner,
    chooseArea
  },
  data(){
    return{
      title_data:[{name:"机械求租",type:1},{name:"机械出租",type:2},{name:"机械转让",type:3},{name:"机械求购",type:4}],
      title_active:1,
      banner_children:{
        "width" : "100%",
        "height" : "height: 2.56rem",
        "vertical":"false",
        "click":()=>{},
        "content":[],
      },
      isSelect_area:false,
      selectAreaData:{}
    }
  },
  mounted(){



  },
  methods:{
    changeTitle(index){
       this.title_active = index;
    },
    // 选择城市
    chooseArea(){
      this.isSelect_area = !this.isSelect_area;
    },
    onSelect(type, flag, cityData) {
      this.isSelect_area = !this.isSelect_area;
        this.$set(this, type, flag);
        //关闭弹框请求接口
        if (cityData) {
          this.selectAreaData = {...cityData}
          //接口请求
        }
      },
      onisclose(type) {
        let flag = this.isSelect_area ? false : true;
        this.onSelect(type, flag);
      }

  },
  created(){
    //banner数据

  }

}
</script>

<style lang='scss' scoped>
@import "./style.scss"

</style>
