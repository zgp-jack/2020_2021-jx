<!-- 列表页 -->
<template>
  <div class="container">
    <Tarbar />
    <div class="list">
      <div class="head">
        <div class="clearfix head_search">
          <van-search
              class="fl"
              :placeholder="search_placeholder[mode]"
              bind:query.keywords="onSearch"
          />
          <span class="search_text fr" @click="onSearch">搜索</span>
        </div>
        <div class="select_head">
          <div class="select_inner clearfix" @click="onisclose('isSelect_area')"><i class="iconfont icon-down fr" :class="{'rotate':isSelect_area}"/><p class="fr">{{selectAreaData.name || '成都'}}</p></div>
          <div class="select_inner clearfix" @click="onisclose('isSelect_jixie')"><i class="iconfont icon-down fr" :class="{'rotate':isSelect_jixie}"/><p class="fr">{{selectJixieData.name || '所有机械'}}</p></div>
          <div class="select_inner" @click="onisclose('isSelect_sort')">{{selectSortData.name || '最新'}}<img src="../../assets/img/list/sort.png" alt=""></div>
        </div>
      </div>
    </div>

    <!-- 地区选择 -->
    <CustomArea :onSelect="onSelect" :isSelect_area="isSelect_area"/>

    <!-- 机械类型选择 -->
    <CustomMechanicalType :onSelect="onSelect" :isSelect_jixie="isSelect_jixie"/>
    
    <!-- 排序 -->
    <div :class="{'model_mask':true,'selectd_box':!isSelect_sort}" @click.stop.prevent="onisclose('isSelect_sort')">
        <div :class="{'inner':true,'clearfix':true,'selectd':!isSelect_sort}">
            <div class="city select_sort fl">
                <div v-for="(item,index) in sort_text" :key="index" @click.stop.prevent="onSelect('isSelect_sort',false,item)" :class="{'item':sort_index==index,'selectItem':sort_index==index}">{{item.name}}</div>
            </div>
        </div>
    </div>


    <div class="list_data">
        <div v-if="list.length && (mode==1 || mode==4)">

        <van-list
          v-model="loading"
          :finished="iscomplete || isempty"
          @load="listScroll"
        >
          <FirstListItem v-for="(item,index) in list" :key="index" :data="item"/>
        </van-list>

        </div>
        <div v-if="list.length && (mode==2 || mode==3)">
          <van-list
            v-model="loading"
            :finished="iscomplete || isempty"
            @load="listScroll"
          >
          <SeccondListItem v-for="(item,index) in list" :key="index" :data="item"/>
        </van-list>

        </div>

        <EmptyMsg :empty1="iscomplete" :empty2="isempty"/>
    </div>

  </div>
</template>

<script>
import {Toast} from 'vant';
import Tarbar from "../../components/tarbar";
import { Search,Uploader } from "vant";
import CustomArea from "../../components/customArea";
import CustomMechanicalType from "../../components/customMechanicalType";
import vertical_banner from "../../components/vertical_banner/vertical_banner.vue";
import FirstListItem from '../../components/firstListItem';
import SeccondListItem from '../../components/seccondListItem';
import EmptyMsg from '../../components/emptyMsg';
import {List} from 'vant';
export default {
  data() {
    return {
      isSelect_area: false,
      isSelect_jixie: false,
      isSelect_sort: false,
      selectAreaData: {}, //选择的数据
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
      keywords : null,//关键字搜索
      page_size : 20 ,//每页数据量 X条 默认为10条
      page:1,
      pattern : 0,//0最新 1推荐 默认0
      addr:null,//地区 id 省id 或 市id 默认为0
      list:[],

      iscomplete:false,//是否加载完成
      isempty:false,//数据是否为空

      search_placeholder:{
        '1':'找活，找工程',
        '2':'找机械，找车队',
        '3':'二手机械',
        '4':'二手机械'
      },
      loading:false
    };
  },
  components: {
    Tarbar,
    "van-search": Search,
    CustomArea,
    verticalBanner:vertical_banner,
    CustomMechanicalType,
    FirstListItem,
    SeccondListItem,
    EmptyMsg,
    'van-list':List
  },
  created(){
    const mode = this.$route.params.id;
    this.mode = mode;
  },
  methods: {
    //控制赛选框显示隐藏
    onSelect(type, flag, Data) {
      if(flag){
        this.closeAll(type)
      }
      this.$set(this, type, flag);
      //关闭弹框请求接口
      if(Data){
        switch(type){
          case 'isSelect_area' :
          this.selectAreaData = { ...Data };
          //接口请求
          const addr = {addr:Data.id}
          this.addr = Data.id;
          var params = this.getParams(addr);
          this.getList({
            params
          })
          break;

          case 'isSelect_jixie' :
          this.selectJixieData = { ...Data };
          //接口请求
          const types = {type:Data.id}
          var params = this.getParams(types);
          this.getList({
            params
          })
          break;
          
          case 'isSelect_sort' :
          this.selectSortData = { ...Data };
          this.sort_index = Data.id;
          //接口请求
          const pattern = {pattern:Data.id}
          var params = this.getParams(pattern);
          this.getList({
            params
          })
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
    getList(params,reload=true){
      if(!reload){
        this.loading = true;
      }
      if(this.mode==1||this.mode==2||this.mode==3||this.mode==4){
        const that = this;
        this.$axios.get('/index/list',{...params}).then(res=>{
          if(that.loading){
            that.loading = false;
          }
          const list =  reload?[...res.content]:that.list.push(...res.content);

          function emptyStatus(status){
            that.iscomplete!==status.iscomplete && that.$set(that,'iscomplete',status.iscomplete);
            that.isempty!==status.isempty && that.$set(that,'isempty',status.isempty)
          }
          if(reload){
            if(!res.content.length){
              emptyStatus({
                iscomplete:false,
                isempty:true
              })
            }else if(res.content.length< that.page_size){
              emptyStatus({
                iscomplete:true,
                isempty:false
              })
            }else{
              emptyStatus({
                iscomplete:false,
                isempty:false
              })
            }
          }else{
            if(!res.content.length || res.content.length<that.page_size){
              emptyStatus({
                iscomplete:true,
                isempty:false
              })
            }
          }
          that.$set(that,'list',[...list])
        })
      }else{
        Toast('您访问的页面不存在，将自动跳转')
        setTimeout(() => {
          this.$router.push('/list/1')
        }, 1500);
      }
    },
    //获取参数
    getParams(data={}){
      const {mode,page,page_size,addr,type,keywords,pattern} = this;
      const params = {
        mode,page,page_size,addr,type,keywords,pattern,...data
      }
      return {...params}
    },

    //搜索
    onSearch(){
      this.keywords = this.query.keywords;
      const params = this.getParams(this.keywords);
      this.getList({...params})
    },
    listScroll(){
      this.page += 1;
      const params = this.getParams({page:this.page});
      this.getList({params},false)
    }
  },
};
</script>

<style lang='scss' scoped>
@import "../../components/customArea/style.scss";
@import "./style.scss";
</style>
