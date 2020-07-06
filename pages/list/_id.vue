<!-- 列表页 -->
<template>
  <div class="container">
    <Tarbar />
    <div class="list">
      <div class="head">
        <div class="clearfix head_search">
          <van-search
              class="fl"
              placeholder="搜索地区、机械类型"
              bind:search="onSearch"
          />
          <span class="search_text fr">搜索</span>
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

  </div>
</template>

<script>
import Tarbar from "../../components/tarbar";
import { Search,Uploader } from "vant";
import CustomArea from "../../components/customArea";
import CustomMechanicalType from "../../components/customMechanicalType";
import vertical_banner from "../../components/vertical_banner/vertical_banner.vue";
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
      ]
    };
  },
  components: {
    Tarbar,
    "van-search": Search,
    CustomArea,
    verticalBanner:vertical_banner,
    CustomMechanicalType
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
          
          break;
          case 'isSelect_jixie' :
          this.selectJixieData = { ...Data };
          //接口请求

          break;
          case 'isSelect_sort' :
          this.selectSortData = { ...Data };
          //接口请求

          break;
        }
      }
    },
    onisclose(type) {
      let flag = this[type] ? false : true;
      this.onSelect(type, flag);
    },
    closeAll(type){
      type !=='isSelect_area' && this.$set(this, 'isSelect_area', false);
      type !=='isSelect_jixie' && this.$set(this, 'isSelect_jixie', false);
      type !=='isSelect_sort' && this.$set(this, 'isSelect_sort', false);
    }
  },
};
</script>

<style lang='scss' scoped>
  @import '../../components/customArea/style.scss';
  @import "./style.scss";
</style>
