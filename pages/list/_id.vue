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

      <!-- <van-area :area-list="aa" :columns-num="2" /> -->

      <!-- <div class="mask" v-show="isSelect_area">
        <div class="modle">

        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import store from '../../store/area.js';
import { mapMutations,mapState } from 'vuex';
import Tarbar from '../../components/tarbar'
import { Search,Area } from 'vant';

export default {
  data(){
    return{
      isSelect_area:true,
      isSelect_jixie:false,
      isSelect_sort:false,
      aa:{
  province_list: {
    110000: '北京市',
    120000: '天津市'
  },
  // city_list: {
  //   110100: '北京市',
  //   110200: '县',
  //   120100: '天津市',
  //   120200: '县'
  // },
  city_list: {
    110101: '东城区',
    110102: '西城区',
    110105: '朝阳区',
    110106: '丰台区',
    120101: '和平区',
    120102: '河东区',
    120103: '河西区',
    120104: '南开区',
    120105: '河北区',
  }
}
    }
  },
  store,
  components: {
    Tarbar,
    'van-search':Search,
    'van-area': Area
  },
  methods:{
    isSelect(){

    }
  },
  computed:{
    ...mapState(['city','area'])
  }
}
</script>

<style lang='scss'>
    @import './style.scss';
</style>
