<!-- 列表页 -->
<template>
  <div class="container">
    <div class="list">
      <div class="head">
        <div class="clearfix head_search">
          <van-search
              :left-icon='carouselData.url'
              class="fl"
              :placeholder="search_placeholder[mode]"
              v-model="query.keywords"
              maxlength="16"
          />
          <!-- <img src="../../assets/img/fangdajing.png"> -->
          <span class="search_text fr" @click="onSearch">搜索</span>
        </div>
        <div class="select_head">
          <div class="select_inner clearfix" @click="onisclose('isSelect_area')"><i class="iconfont  fr" :class="{'rotate':isSelect_area}"/><p class="fr">{{selectAreaData.name || '成都'}}</p></div>
          <div class="select_inner clearfix" @click="onisclose('isSelect_jixie')"><i class="iconfont  fr" :class="{'rotate':isSelect_jixie}"/><p class="fr">{{selectJixieData.name || '所有机械'}}</p></div>
          <div class="select_inner" @click="onisclose('isSelect_sort')">{{selectSortData.name || '最新'}}<img src="../../assets/img/list/sort.png" alt=""></div>
        </div>
      </div>
    </div>

    <!-- 地区选择 -->
    <CustomArea whearthStorage="true" :onSelect="onSelect" :isSelect_area="isSelect_area" v-if="default_addr.city"/>

    <!-- 机械类型选择 -->
    <CustomMechanicalType whearthStorage="true" :onSelect="onSelect" :isSelect_jixie="isSelect_jixie"/>

    <!-- 排序 -->
    <div :class="{'model_mask':true,'selectd_box':!isSelect_sort}" @click.stop.prevent="onisclose('isSelect_sort')">
        <div :class="{'inner':true,'clearfix':true,'selectd':!isSelect_sort}">
            <div class="city select_sort fl">
                <div v-for="(item,index) in sort_text" :key="index" @click.stop.prevent="onSelect('isSelect_sort',false,item)" :class="{'item':sort_index==index,'selectItem':sort_index==index}">{{item.name}}</div>
            </div>
        </div>
    </div>
    <div class="list_data" @scroll="my_scroll">
      <Topbar/>
       <!-- 呼出 -->
       <BottomTop :showWant="true" :qiandao="false" ref="mychild" :mode='mode'/>
        <div v-if="(mode==1 || mode==4)">
          <van-pull-refresh v-model="loading_top"  @refresh="onrefresh" :style="{'padding-bottom':iscomplete && !isempty && list.length?0:0.8+'rem'}">
            <van-list
              v-model="loading"
              :finished="iscomplete || isempty"
              @load="listScroll"
              v-if="list.length"
            >
              <FirstListItem @giveParent="getObj" v-for="(item,index) in list" :key="index" :data="{item,index}"/>
            </van-list>
             <EmptyMsg :empty1="iscomplete && !isempty" :empty2="isempty"/>
          </van-pull-refresh>
        </div>

        <div v-if="(mode==2 || mode==3)">
            <van-pull-refresh v-model="loading_top"  @refresh="onrefresh" :style="{'padding-bottom':iscomplete && !isempty && list.length?0:0.8+'rem'}">
              <van-list
                v-model="loading"
                :finished="iscomplete || isempty"
                @load="listScroll"
               v-if="list.length"
              >
                <SeccondListItem @giveParent="getObj" v-for="(item,index) in list" :key="index" :data="{item,index}"/>
              </van-list>
              <EmptyMsg :empty1="iscomplete && !isempty" :empty2="isempty"/>
            </van-pull-refresh>
        </div>
    <Tarbar />
    </div>
  </div>
</template>

<script>
import Tarbar from "../../components/tarbar";
import { Search,Uploader,Toast,List,PullRefresh} from "vant";
import CustomArea from "../../components/customArea";
import CustomMechanicalType from "../../components/customMechanicalType";
import Topbar from "../../components/Topbar";
import FirstListItem from '../../components/firstListItem';
import SeccondListItem from '../../components/seccondListItem';
import EmptyMsg from '../../components/emptyMsg';
import BottomTop from '../../components/bottom-topbar/index';
import Newgift from '../../components/new_gift/index';
import {getRequestQuery} from '../../static/utils/utils.js';
import { MechanicalNum_link, SEO_LIST_KEYWORDS, SEO_LIST_DESCRIPTION, SEO_LIST_TITLE } from '../../static/utils/link';
export default {
  name:'list',
  data() {
    return {
      lost:false,
      isSelect_area: false,
      isSelect_jixie: false,
      isSelect_sort: false,
      selectAreaData: {
        name:''
      }, //选择的数据
      selectJixieData: {},
      selectSortData: {},
      sort_index:0,
      sort_text:[
        {name:'最新',id:0},
        {name:'推荐',id:1},
      ],

      query:{keywords:''},

      mode : 1,
      type : 0,//机械类型
      keywords : '',//关键字搜索
      page_size : 20 ,//每页数据量 X条 默认为10条
      page:1,
      pattern : 0,//0最新 1推荐 默认0
      addr:null,//地区 id 省id 或 市id 默认为0
      list:[],

      iscomplete:false,//是否加载完成
      isempty:true,//数据是否为空/避免重复请求

      search_placeholder:{
        '1':'找活，找工程',
        '2':'找机械，找车队',
        '3':'二手机械',
        '4':'二手机械'
      },
      loading:false,
      loading_top:false,
      carouselData:{url:require('../../assets/img/fangdajing.png')}
    };
  },
  head(){
    return {
      title: SEO_LIST_TITLE(this.selectAreaData.name,Number(this.mode)),
      meta: [
        { hid: 'description', name: 'description', content:SEO_LIST_DESCRIPTION[this.mode] },
        { name: "keywords", content: SEO_LIST_KEYWORDS(this.selectAreaData.name, Number(this.mode))},
      ]
    }
  },
  components: {
    Tarbar,
    "van-search": Search,
    CustomArea,
    CustomMechanicalType,
    Topbar,
    FirstListItem,
    SeccondListItem,
    EmptyMsg,
    'van-list':List,
    'van-pull-refresh':PullRefresh,
    BottomTop,
    Newgift
  },
  activated(){
    const that = this;
    if(that.$route.query['keep-alive'] === false){
      //初始化值
      that.keywords = '';
      that.query.keywords = '';
      that.int()
    }
  },
  beforeMount(){
    let isLoad = window.localStorage.getItem('isLoad');
    if(isLoad){
      window.localStorage.setItem('isLoad','')
      this.$router.go(-1)
    }
  },
  mounted() {
    if(this.$route.query['keep-alive'] !== false){
      this.int()
    }
    window.addEventListener('scroll',this.my_scroll);
    
  },
  methods: {
    initPage(){
      if(document.getElementsByClassName("van-search__content")[0]){
        document.getElementsByClassName("van-search__content")[0].style.backgroundColor="#fff"
      }
    },
    // 滚动
    my_scroll(e){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.$refs.mychild.handleScroll(scrollTop);
    },
    //控制赛选框显示隐藏
    onSelect(type, flag, Data) {
      if(flag){
        this.closeAll(type)
        document.getElementsByClassName("list_data")[0].style.position="fixed"
      }else{
        if(document.getElementsByClassName("list_data")[0]){
          document.getElementsByClassName("list_data")[0].style.position="static"
        }
      }
      this.$set(this, type, flag);
      //关闭弹框请求接口
      if(Data){
        this.onreset();
        this.loading = true;
        switch(type){
          case 'isSelect_area' :
            this.selectAreaData = { ...Data };
            //接口请求
            this.addr = Data.id;
            //本地存储
            this.getList()
          break;
          //机械
          case 'isSelect_jixie' :
            this.selectJixieData = { ...Data };
            this.type = Data.id;
            //接口请求
            this.getList()
          break;
          case 'isSelect_sort' :
            this.selectSortData = { ...Data };
            this.sort_index = Data.id;
            this.pattern =  Data.id;
            //接口请求
            this.getList()
          break;
        }
      }
    },
    onisclose(type) {
      let flag = this[type] ? false : true;
      this.onSelect(type, flag);
    },
    closeAll(type){
      type !=='isSelect_area' && this.isSelect_area && this.$set(this, 'isSelect_area', false);
      type !=='isSelect_jixie' && this.isSelect_jixie && this.$set(this, 'isSelect_jixie', false);
      type !=='isSelect_sort' && this.isSelect_sort && this.$set(this, 'isSelect_sort', false);
    },
    //获取列表页数据
    /*
      reload  true重新加载
    */
    getList(){
      this.loading= true
      this.loading_top = true;
      if(this.mode==1||this.mode==2||this.mode==3||this.mode==4){
        const that = this;
        const {mode,page,page_size,addr,type,keywords,pattern} = that;
        let params = {mode,page,page_size,addr,type,keywords,pattern}
        this.$axios.post('/index/list?'+getRequestQuery(params),{globalLoading:false}).then(res=>{
          that.initPage();
          if(res.code){
             that.loading_top = false;
             that.loading = false;
            if(that.page == 1){
              if(res.content.length && res.content.length<that.page_size){
                that.iscomplete = true;
                that.isempty = false;
              }else if(!res.content.length){
                that.isempty = true;
              }else{
                that.iscomplete = false;
                that.isempty = false;
              }
            }else{
              if(res.content.length<that.page_size){
                that.iscomplete = true;
                that.isempty = false;
              }else{
                that.iscomplete = false;
                that.isempty = false;
              }
            }
            that.list.push(...res.content);
            // that.head()
          }
        })
      }else{
        Toast('您访问的页面不存在，将自动跳转')
        setTimeout(() => {
          this.$router.push('/qiuzu')
        }, 1500);
      }
    },

    onrefresh(){
      // this.loading = true;
      this.loading_top = true
      this.loading = false
      this.onreset()
      this.getList()
    },

    //重置page
    onreset(){
      this.page = 1;
      //重置滚动位置
      this.list = [];
      this.iscomplete = false;
      this.isempty = false;
    },

    //搜索
    onSearch(){
      this.onreset()
      if(Object.keys(this.$nuxt.$store.state.userinfo).length  == 0){
        this.$router.push('/login')
        return false
      }
      let query = {...this.query};
      this.keywords = query.keywords.replace(/\s+/g,"");
      let chinese_test = /.*[\u4e00-\u9fa5]+.*$/;
      if(!chinese_test.test(this.keywords) && this.keywords != ''){
        Toast('搜索关键词必须包含中文才能进行搜索!')
        return false
      }

      this.list = []
      this.getList()
    },
    listScroll(){
      this.page += 1;
      this.loading = true;
      this.getList()
    },
    //得到电话号码并显示
    getObj(obj,yue){
      let list = this.list;
      if(obj.tel){
          list[obj.index].tel = obj.tel
          this.$set(this,'list',[...list])
      }
      this.lost = yue
    },
    int(){
      const mode = MechanicalNum_link[this.$route.path];
      this.mode = mode;
      //获取本地存储机械类型
      let all = window.sessionStorage.getItem('mechanic_all');
      let mechanic_child = window.sessionStorage.getItem('mechanic_child');
      if(all){
        this.type = JSON.parse(all).id;
      }else if(mechanic_child){
        this.type = JSON.parse(mechanic_child).id;
        this.selectJixieData = JSON.parse(mechanic_child);
      }
    }
  },
  computed:{
    default_addr(){
      return this.$nuxt.$store.state.default_addr
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../components/customArea/style.scss";
@import "./style.scss";
</style>
