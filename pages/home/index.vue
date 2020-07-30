<!-- 首页 -->
<template>
  <div class="container" @scroll="my_scroll">
    <!-- 底部导航 -->
    <BottomTop ref="mychild" :showWant="false" :qiandao='true'/>
    <chooseArea :onSelect="onSelect" :isSelect_area="isSelect_area" whearthStorage = 'true' v-if="default_addr.city"/>
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
      <router-link  :to="{path:'/list/1',query:{'keep-alive':false}}" >
        <img src="http://statics.zhaogongdi.com/xcx/index_tenant.png" alt="">
        <span>机械求租</span>
      </router-link>
      <router-link  to="/common/create" >
        <img src="http://statics.zhaogongdi.com/xcx/index_create_tenant.png" alt="">
        <span>发布求租</span>
      </router-link>

      <router-link  :to="{path:'/list/2',query:{'keep-alive':false}}" >
        <img src="http://statics.zhaogongdi.com/xcx/index_mahcine.png" alt="">
        <span>机械出租</span>
      </router-link>

      <a href="http://m.yupao.com/zhaogong/quanguo_jixiesiji/">
        <img src="../../assets/img/home-images/Lark20200608-172704.png" alt="">
        <span>招聘机手</span>
      </a>
      <router-link  :to="{path:'/list/3',query:{'keep-alive':false}}" >
        <img src="http://statics.zhaogongdi.com/xcx/index_ershou.png" alt="">
        <span> 机械转让</span>
      </router-link>
      <router-link  :to="{path:'/list/4',query:{'keep-alive':false}}" >
         <img src="http://statics.zhaogongdi.com/xcx/index_want.png" alt="">
         <span> 机械求购</span>
      </router-link>
      <router-link  to="/user/invitation" >
         <img src="http://statics.zhaogongdi.com/xcx/index_invitation.png" alt="">
         <span> 邀请好友</span>
      </router-link>
      <router-link  to="/company/index" >
         <img src="../../assets/img/home-images/supplier.png" alt="">
         <span> 供应商</span>
      </router-link>
    </div>
    <div class="list_title" :class="{list_title_fixed:whether_fixed}" ref="list_title">
      <div v-for="(itme,index) in title_data" v-on:click="changeTitle(index,itme.key)" :key="index">
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
         <EmptyMsg :empty2="isempty"/>
        <p class="more" v-if="list[title_data[title_active].key].length>0" @click="Jump_page(title_data[title_active].type)">查看更多{{title_data[title_active].name}}信息</p>
      </div>
    </div>
      <Newgift v-if="show_gift_alert" @giftAlertHidden="giftAlertFn"/>

      <!-- 新手指引 -->
      <home-novice-point v-if="novice_point_alert" @novicePointHidden="novicePointHiddenFn" />
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
import Newgift from '../../components/new_gift/index'
import {getNovicePoint,setNovicePoint} from '../../static/utils/utils.js';
import home_novice_point from '../../components/page-novice-point/index.vue';
import EmptyMsg from '../../components/emptyMsg';
export default {
  name:'home',
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
    Newgift,
    "home-novice-point":home_novice_point,
    EmptyMsg
  },
  data(){
    return{
      //首页列表标题数据
      title_data:[{name:"机械求租",type:1,key:'tenant'},{name:"机械出租",type:2,key:'machine'},{name:"机械转让",type:3,key:'ershou'},{name:"机械求购",type:4,key:'want'}],
      title_active:0,
      //轮播图数据
      banner_children:[{
          img:"http://statics.zhaogongdi.com/images/banner/20190624/558TWm1561367968.png",
          href:"",
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
      isempty:false, //数据是否为空
      show_gift:true, //新手大礼包
      show_gift_alert:false,//新手大礼包
      novice_point:'',//新手指引对象
      novice_point_alert:false
    }
  },
  beforeMount(){
    this.novice_point = getNovicePoint();
  },
  mounted() {
    setTimeout(()=>{
      this.scroll_tops = this.$refs.banner.offsetHeight + this.$refs.menus.offsetHeight;
      //监听document上的滚动事件
      document.addEventListener('scroll',this.my_scroll)
    },0)
  },
  methods:{
    //有弹框时不能滚动窗口
    cannotScrollWindow(){
      // debugger
      if(this.show_gift_alert || this.novice_point_alert){
        document.documentElement.style.position = "fixed";
      }else{
        document.documentElement.style.position = "static";
      }
    },
    //关闭指引弹窗
    novicePointHiddenFn(open){
      this.novice_point_alert = open;
      this.cannotScrollWindow();
    },
    //指引弹窗显示
    novicePointFn(){
      if(this.novice_point.home && this.show_gift_alert == false){
        this.novice_point_alert = true;
      }
    },
    //新手礼包状态
    giftAlertFn(open){
      this.show_gift_alert = open;
      this.novicePointFn();
      this.cannotScrollWindow();
    },
    //切换标题
    changeTitle(index,type){
       this.title_active = index;
       this.listDataIsEmpty(type)
    },
    //数据是否为空
    listDataIsEmpty(type){
      if(this.list[type].length == 0){
        this.isempty = true;
      }else{
         this.isempty = false;
      }
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
          this.listData({area:cityData.id},cityData)
        }
      },
      onisclose(type) {
        let flag = this.isSelect_area ? false : true;
        this.onSelect(type, flag);
      },
      //列表页数据
      listData(params={},cityData){
        const that = this;
        that.$axios.get('/index/home',{params}).then(res=>{
            that.$set(that, "list", {...res.content});
            //新手礼包
            that.show_gift_alert = that.list.welfareDialog;
            this.novicePointFn();
            this.cannotScrollWindow();
            //本地储存
            window.localStorage.setItem('city',JSON.stringify(cityData));
            //初始化是否有数据
            that.listDataIsEmpty('tenant')
        })
      },
      // 滚动显示隐藏
      my_scroll(e){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
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
          this.$router.replace({
            path:"/list/1",
            query:{"keep-alive":false}
          })
        }else if(type == 2){
          this.$router.replace({path:"/list/2",query:{"keep-alive":false}})
        }else if(type == 3){
           this.$router.replace({path:"/list/3",query:{"keep-alive":false}})
        }else if(type == 4){
           this.$router.replace({path:"/list/4",query:{"keep-alive":false}})
        }
      },
      getObj(obj){
        const {list,title_data,title_active} = this;
        list[title_data[title_active].key][obj.index].tel = obj.tel
        this.$set(this,'list',{...list})
      },
  },
  computed:{
    default_addr(){
      return this.$nuxt.$store.state.default_addr
    }
  }

}
</script>

<style lang='scss' scoped>
@import "./style.scss"

</style>
