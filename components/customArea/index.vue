<!-- 自定义地区选择 -->
<template>
    <div :class="{'model_mask':true,'selectd_box':!isSelect_area}" @click.stop.prevent="onSelect('isSelect_area',false)">
        <div :class="{'inner':true,'clearfix':true,'selectd':!isSelect_area}">
            <div class="city fl">
                <div @click="provinceChosed(0)" :class="{'item':provinceChosedIndex==0,'selectItem':provinceChosedIndex==0}">{{city[0].name}}</div>
                <div v-for="(item,index) in city" :key="index" v-if="index>0" @click.stop.prevent="provinceChosed(index)" :class="{'item':provinceChosedIndex==index,'selectItem':provinceChosedIndex==index}">{{item[0].name}}</div>
            </div>
            <div class="area item fl">
                <div v-for="(item,index) in city" :key="index" v-if="index>0 && provinceChosedIndex===index">
                    <div v-for="(item,index) in item" :key="index" :class="{'selectItem':cityChosedIndex==index}" @click.stop.prevent="cityChosed(index)">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
@import "./style.scss";
</style>

<script>
import { mapMutations, mapState,mapGetters } from "vuex";
import Tarbar from "../../components/tarbar";
import { Search } from "vant";
import { constants } from "zlib";
export default {
  props: ["isSelect_area", "onSelect"],
  data() {
    return {
      provinceChosedIndex: null,
      cityChosedIndex: null
    }
  },
  methods: {
    //大城市选择
    provinceChosed(index) {
      if (this.provinceChosedIndex !== index) {
        if (index == 0) {
          this.onSelect("isSelect_area", false, this.city[index]);
        }
        this.$set(this, "provinceChosedIndex", index);
        this.cityChosed(null);
      }
    },
    //城市选择
    cityChosed(index) {
      this.$set(this, "cityChosedIndex", index);
      index && this.onSelect(
        "isSelect_area",
        false,
        this.city[this.provinceChosedIndex][index]
      )
    },
  },
  computed:{
    city(){
      return window.$nuxt.$store.state.city
    }
  },
};
</script>

