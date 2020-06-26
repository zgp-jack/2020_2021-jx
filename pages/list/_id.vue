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
          <span class="select_inner" @click="onisclose('isSelect_area')">成都<i class="iconfont icon-down" :class="{'rotate':isSelect_area}"/></span>
          <span class="select_inner">所有机械<i class="iconfont icon-down" :class="{'rotate':isSelect_jixie}"/></span>
          <span class="select_inner">最新<img src="../../assets/img/list/sort.png" alt="" :class="{'rotate':isSelect_sort}"></span>
        </div>
      </div>
    </div>

    <!-- 地区选择 -->
    <CustomArea :onSelect="onSelect" :isSelect_area="isSelect_area"/>
  </div>
</template>

<script>
import Tarbar from "../../components/tarbar";
import { Search } from "vant";
import CustomArea from "../../components/customArea";

export default {
  data() {
    return {
      isSelect_area: false,
      isSelect_jixie: false,
      isSelect_sort: false
    };
  },
  components: {
    Tarbar,
    "van-search": Search,
    CustomArea
  },
  methods: {
    //控制赛选框显示隐藏
    onSelect(type, flag, cityData) {
      this.$set(this, type, flag);
      //关闭弹框请求接口
      if (cityData) {
        //接口请求
      }
    },
    onisclose(type) {
      let flag = this.isSelect_area ? false : true;
      this.onSelect(type, flag);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
