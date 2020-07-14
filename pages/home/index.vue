<!-- 首页 -->
<template>
  <div class="container" @scroll="my_scroll">
    <chooseArea :onSelect="onSelect" :isSelect_area="isSelect_area" />
	  <div id="head" ref="head">
      <div class="left_dom fl">
        <h1 class="fl">
          <img src="http://statics.zhaogongdi.com/common/logo_m.png" alt="">
        </h1>
        <div @click="chooseArea" class="position fl">
          <i class="icon-dingwei iconfont" /><b>{{selectAreaData.name || '成都'}}</b>
          <strong class="iconfont icon-youjiantou" st></strong>

        </div>
      </div>
      <div class="right_dom fr">
        <a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.yupao.machine"></a>
      </div>
    </div>
    <div class="banner" ref="banner">
      <Banner :obj="banner_children"></Banner>
    </div>
    <div class="menus" ref="menus">
      <a href="/dist/list/1">
        <img src="http://statics.zhaogongdi.com/xcx/index_tenant.png" alt="">
        <span>机械求租</span>
      </a>
      <a href="/dist/common/create">
        <img src="http://statics.zhaogongdi.com/xcx/index_create_tenant.png" alt="">
        <span>发布求租</span>
      </a>
      <a href="/dist/list/2">
        <img src="http://statics.zhaogongdi.com/xcx/index_mahcine.png" alt="">
        <span>机械出租</span>
      </a>
      <a href="http://m.yupao.com/zhaogong/quanguo_jixiesiji/">
        <img src="../../assets/img/home-images/Lark20200608-172704.png" alt="">
        <span>招聘机手</span>
      </a>
      <a href="/dist/list/3">
        <img src="http://statics.zhaogongdi.com/xcx/index_ershou.png" alt="">
        <span> 机械转让</span>
      </a>
      <a href="/dist/list/4">
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
    <div class="list_title" :class="{list_title_fixed:whether_fixed}" ref="list_title">
      <div v-for="(itme,index) in title_data" v-on:click="changeTitle(index)" :key="index">
         <span  :class="title_active == index ? 'active' : '' ">{{itme.name}}</span>
      </div>
    </div>
    <div class="list_content" :style="whether_fixed?'margin-top: 1.2rem':''">
      <div v-for="(item,index) in title_data" :data-type="item.type" v-if="title_active == index" :key="index">
        <div v-if="(item.type == 1 || item.type == 4) && list[title_data[title_active].key].length>0">
          <firstListItem @giveParent="getObj" v-for="(item,index) in list[title_data[title_active].key]" :key="index" :data="{item,index}"/>

        </div>
        <div v-if="(item.type == 2 || item.type == 3) && list[title_data[title_active].key].length>0">
          <seccondListItem @giveParent="getObj" v-for="(item,index) in list[title_data[title_active].key]" :key="index" :data="{item,index}"/>
        </div>
         <!-- <EmptyMsg :empty1="iscomplete" :empty2="isempty"/> -->
        <p class="more" v-if="list[title_data[title_active].key].length>0" @click="Jump_page(title_data[title_active].type)">查看更多{{title_data[title_active].name}}信息</p>
      </div>
    </div>
	
    <!-- 底部导航 -->
    <!-- <BottomTop ref="mychild" :showWant="false" :qiandao='true'/> -->
    <!-- 新手大礼包 -->
    <div class="new_gift" v-if="show_gift_alert" @click.stop="close_gift_alert($event,'bg')">
      <van-popup v-model="show_gift">
        <div class="inner">
          <div class="gift-img-text"></div>
          <p class="gift-title">领礼包，上万机械信息免费看</p>
          <div class="main-img"></div>
          <div class="gift-btn" @click="rigthReceove">立即领取</div>
        </div>
        <div class="gift-close iconfont icon-cuo" @click="close_gift_alert($event,'close')"></div>
      </van-popup>
    </div>
    <Tarbar />

  </div>
</template>

<script>
import Tarbar from '../../components/tarbar'
import firstListItem from '../../components/firstListItem/index.vue'
import seccondListItem from '../../components/seccondListItem/index.vue'
import { Swipe , SwipeItem , Popup ,Dialog } from 'vant';
import Banner from '../../components/banner/banner.vue'
import chooseArea from '../../components/customArea/index.vue'
import call_confirm from '../../components/call_confirm/call_confirm'
import BottomTop from '../../components/bottom-topbar/index'

export default {
  components: {
    Tarbar: Tarbar,
    "van-swipe": Swipe,
    "van-swipe-item" : SwipeItem,
    'firstListItem':firstListItem,
    'seccondListItem':seccondListItem,
    "Banner" :Banner,
    chooseArea,
    "call-confirm":call_confirm,
    BottomTop,
    'van-popup':Popup,
    [Dialog.Component.name]: Dialog.Component,
  },
  data(){
    return{
      //首页列表标题数据
      title_data:[{name:"机械求租",type:1,key:'tenant'},{name:"机械出租",type:2,key:'machine'},{name:"机械转让",type:3,key:'ershou'},{name:"机械求购",type:4,key:'want'}],
      title_active:0,
      //轮播图数据
      banner_children:[{
          img:"http://statics.zhaogongdi.com/images/banner/20190624/558TWm1561367968.png",
          href:"/coin/get/",
        },{
          img:"http://statics.zhaogongdi.com/images/banner/20190815/0t7W171565854698.png",
          href:"/user/invitation/",
        }],
      isSelect_area:false,
      selectAreaData:{},
      list:{ //首页列表内容的数据
        tenant:[],
        machine:[],
        ershou:[],
        want:[]
      },
      whether_fixed:false, //标题是否要固定
      scroll_tops:300,  //滚动的位置
      iscomplete:false, //是否加载完成
      isempty:false, //数据是否为空
      show_gift:true, //新手大礼包
      show_gift_alert:false,//新手大礼包
    }
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
          this.listData({area:cityData.id})
        }
      },
      onisclose(type) {
        let flag = this.isSelect_area ? false : true;
        this.onSelect(type, flag);
      },
      //列表页数据
      listData(params={}){
        const that = this;
        that.$axios.get('/index/home',{params}).then(res=>{

            that.$set(that, "list", {...res.content});
            //新手礼包
            that.show_gift_alert = that.list.welfareDialog;
        })
      },
      // 滚动显示隐藏
      my_scroll(e){
        const {scrollTop} = e.currentTarget;
        this.$refs.mychild.handleScroll(scrollTop);
        this.fixed_title(scrollTop);
      },
      //固定标题
      fixed_title(top_position){
         if(top_position >= this.scroll_tops){
            this.whether_fixed = true
         }else{
           this.whether_fixed = false
         }
      },
      //查看更多机械  跳转页面
      Jump_page(type){
        if(type == 1){
          this.$router.replace("/list/1")
        }else if(type == 2){
          this.$router.replace("/list/2")
        }else if(type == 3){
          this.$router.replace("/list/3")
        }else if(type == 4){
          this.$router.replace("/list/4")
        }
      },
      getObj(obj){
        console.log(obj)
        const {list,title_data,title_active} = this;
        // debugger
        list[title_data[title_active].key][obj.index].tel = obj.tel
        this.$set(this,'list',{...list})
      },
      //关闭新手大礼包
      close_gift_alert(e,need){
        e.stopPropagation()
        let classText = e.target.className;
        if(classText.includes('van-fade-leave-active') && need == "bg"){

        }else if(need == "close"){
          this.show_gift_alert = false
        }
      },
      //立即领取
      rigthReceove(){
        let that = this;
        //发送ajax请求
        let params = {welfareId: 1}
        this.$axios.get('/user-welfare/get-welfare',{params}).then(res=>{
          if(res.code == 200){
            that.$router.push('/user/welfare')
          }else if(res.code == 500){
            Dialog.alert({
              title: '温馨提示',
              message: '您已经领取过该福利了',
            })
            that.show_gift_alert = false
          }
        })
      }
  },
  mounted() {
    this.scroll_tops = this.$refs.banner.offsetHeight + this.$refs.menus.offsetHeight;
    console.log(this.list)
  }

}
</script>

<style lang='scss' scoped>
@import "./style.scss"

</style>
