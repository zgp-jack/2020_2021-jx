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
          <span class="select_inner">成都<i class="iconfont icon-down"/></span>
          <span class="select_inner">所有机械<i class="iconfont icon-down"/></span>
          <span class="select_inner">最新<img src="../../assets/img/list/sort.png" alt=""></span>
        </div>
      </div>
    </div>

    <!-- 地区选择 -->
    <CustomArea />
  </div>
</template>

<script>
import Tarbar from '../../components/tarbar'
import { Search } from 'vant';
import CustomArea from '../../components/customArea';

export default {
  data(){
    return{
      isSelect_area:true,
      isSelect_jixie:false,
      isSelect_sort:false,
    }
  },
  components: {
    Tarbar,
    'van-search':Search,
    CustomArea
  },
  methods:{
    isSelect(){

    }
  },
}
</script>

<style lang='scss'>
    @import './style.scss';
</style>
