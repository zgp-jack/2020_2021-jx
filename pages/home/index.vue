<!-- 首页 -->
<template>
  <div class="container" @scroll="my_scroll">
    <!-- 底部导航 -->
    <BottomTop ref="mychild" :showWant="false" :qiandao='true' qiuzu="true"/>
    <chooseArea :onSelect="onSelect" :isSelect_area="isSelect_area" whearthStorage = 'true' v-if="default_addr.city"/>
	  <div id="head" ref="head">
      <div class="left_dom fl">
        <h1 class="fl">
          <img src="http://statics.zhaogongdi.com/common/logo_m.png" alt="">
        </h1>
        <div @click="chooseArea" class="position fl">
          <i class="" /><b data-id="322">{{selectAreaData.name || '成都'}}</b>
          <strong class=""></strong>
        </div>
      </div>
      <div class="right_dom fr">
        <a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.yupao.machine"></a>
      </div>
    </div>
    <div class="banner" ref="banner">
      <Banner v-if="banner_children.length" :obj="banner_children"></Banner>
    </div>
    <div class="menus" ref="menus">
      <router-link  :to="{path:'/qiuzu',query:{'keep-alive':false}}" >
        <img src="http://statics.zhaogongdi.com/xcx/index_tenant.png" alt="">
        <span>机械求租</span>
      </router-link>
      <router-link  to="/common/create" >
        <img src="http://statics.zhaogongdi.com/xcx/index_create_tenant.png" alt="">
        <span>发布求租</span>
      </router-link>

      <router-link  :to="{path:'/chuzu',query:{'keep-alive':false}}" >
        <img src="http://statics.zhaogongdi.com/xcx/index_mahcine.png" alt="">
        <span>机械出租</span>
      </router-link>

      <a href="http://m.yupao.com/zhaogong/quanguo_jixiesiji/">
        <img src="../../assets/img/home-images/Lark20200608-172704.png" alt="">
        <span>招聘机手</span>
      </a>
      <router-link  :to="{path:'/ershou',query:{'keep-alive':false}}" >
        <img src="http://statics.zhaogongdi.com/xcx/index_ershou.png" alt="">
        <span> 机械转让</span>
      </router-link>
      <router-link  :to="{path:'/qiugou',query:{'keep-alive':false}}" >
         <img src="http://statics.zhaogongdi.com/xcx/index_want.png" alt="">
         <span> 机械求购</span>
      </router-link>
      <router-link  to="/user/invitation" >
         <img src="http://statics.zhaogongdi.com/xcx/index_invitation.png" alt="">
         <span> 邀请好友</span>
      </router-link>
      <router-link  to="/gongyingshang" >
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
        <div style="font-size:0.3rem ;text-align: center;color: #666;" v-if="list[title_data[title_active].key].length<=0">加载中...</div>
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
      <!-- <Newgift v-if="show_gift_alert" @giftAlertHidden="giftAlertFn"/> -->

      <!-- 新手指引 -->
      <home-novice-point v-if="novice_point_alert" @novicePointHidden="novicePointHiddenFn" />
    <Tarbar />
  </div>
</template>

<script>
import Tarbar from '../../components/tarbar'
import firstListItem from '../../components/firstListItem/index.vue'
import seccondListItem from '../../components/seccondListItem/index.vue'
import { Swipe , SwipeItem , Popup ,Dialog ,Toast} from 'vant';
import Banner from '../../components/banner/banner.vue'
import chooseArea from '../../components/customArea/index.vue'
import call_confirm from '../../components/call_confirm/call_confirm'
import BottomTop from '../../components/bottom-topbar/index'
import Newgift from '../../components/new_gift/index'
import {getNovicePoint,setNovicePoint,getRequestQuery} from '../../static/utils/utils.js';
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
      title_data:[],//切换数据
      title_active:0,
      //轮播图数据
      banner_children:[],
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
      novice_point_alert:false,
      defualt_id : "322",
      first_request:true,
    }
  },
  created(){
    this.titleData()
    setTimeout(()=>{
      this.getBanner()

    },1500)
  },
  beforeMount(){
    this.novice_point = getNovicePoint();
    let str = window.sessionStorage.getItem("city");
    if(!str){
      // window.sessionStorage.setItem("city");
    }
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
      if(this.novice_point_alert || this.isSelect_area){
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
      this.novice_point = getNovicePoint();
      if(this.novice_point.home){
        this.novice_point_alert = true;
        this.cannotScrollWindow();
      }
    },
    //新手礼包状态
    giftAlertFn(open){
      this.show_gift_alert = open;
      this.novicePointFn();
      // this.cannotScrollWindow();
    },
    //切换标题
    changeTitle(index,type){
       this.title_active = index;
       const {title_active,title_data,selectAreaData} = this;
       if(!title_data[title_active].render){
         this.listData(false)
       }
    },

    //title_data
    titleData(){
      this.title_data = [
        {name:"机械求租",type:1,key:'tenant',render:false},
        {name:"机械出租",type:2,key:'machine',render:false},
        {name:"机械转让",type:3,key:'ershou',render:false},
        {name:"机械求购",type:4,key:'want',render:false}
      ]
      this.list={ //首页列表内容的数据
          tenant:[],
          machine:[],
          ershou:[],
          want:[]
        }
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
      this.cannotScrollWindow()
      
    },
    onSelect(type, flag, cityData) {
      this.isSelect_area = false
      this.cannotScrollWindow()
      this.isSelect_area = !this.isSelect_area;
        this.$set(this, type, flag);
        //关闭弹框请求接口
        if (cityData) {
            this.selectAreaData = {...cityData}
            //接口请求
            this.listData()
            this.titleData()
        }
      },
      onisclose(type) {
        let flag = this.isSelect_area ? false : true;
        this.onSelect(type, flag);
      },
      //列表页数据
      listData(bool){
        const that = this;
        let {title_data,mode,selectAreaData,title_active} = this;
        that.$axios.post('/index/home-data?'+getRequestQuery({area:selectAreaData.id,mode:title_data[title_active].type})).then(res=>{
          if(res.code){
            // that.$set(that, "list", {...res.content});
            that.title_data[title_active].render = true ;
            that.list[that.title_data[title_active].key] = res.content.data;

            //判断数据是否为空
            that.listDataIsEmpty(that.title_data[title_active].key)

            //新手礼包
            // that.show_gift_alert = that.list.welfareDialog;

            this.novicePointFn();
            // this.cannotScrollWindow();
            //本地储存
            window.localStorage.setItem('city',JSON.stringify(selectAreaData));
          }
        })
      },

      //banner图
      getBanner(){
        const that = this;
        that.$axios.get('/index/new-home').then(res=>{
          if(res.code==200){
            this.formDataBannerData(res)
          }
        })
      },

      //格式化banner数据
      formDataBannerData(res){
        let bannerData = [...res.content.banner]
        bannerData[1].url = "https://a.app.qq.com/o/simple.jsp?pkgname=com.yupao.machine"
        this.banner_children = [...bannerData];
      },
      // 滚动显示隐藏
      my_scroll(e){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.$refs.mychild.handleScroll(scrollTop);
        this.fixed_title(scrollTop);
      },
      //固定标题
      fixed_title(top_position){
         if(top_position >= this.scroll_tops) this.whether_fixed = true;
         else this.whether_fixed = false
      },
      //查看更多机械  跳转页面
      Jump_page(type){
        if(type == 1) this.$router.replace({path:"/qiuzu",query:{"keep-alive":false}})
        else if(type == 2) this.$router.replace({path:"/chuzu",query:{"keep-alive":false}})
        else if(type == 3) this.$router.replace({path:"/ershou",query:{"keep-alive":false}})
        else if(type == 4)  this.$router.replace({path:"/qiugou",query:{"keep-alive":false}})
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
