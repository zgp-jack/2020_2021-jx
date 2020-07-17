<!-- 自定义地区选择 -->
<template>
    <div :class="{'model_mask':true,'selectd_box':!isSelect_area}" @click.stop.prevent="onSelect('isSelect_area',false)" v-if="city.length">
        <div :class="{'inner':true,'clearfix':true,'selectd':!isSelect_area}">
            <div class="city fl">
                <div @click="provinceChosed(0)" :class="{'item':provinceChosedIndex==0,'selectItem':provinceChosedIndex==0}">{{city[0].name}}</div>
                <div v-for="(item,index) in city" :key="index" v-if="index>0" @click.stop.prevent="provinceChosed(index)" :class="{'item':provinceChosedIndex==index,'selectItem':provinceChosedIndex==index}">{{item[0].name}}</div>
            </div>
            <div class="area item fl">
              <div v-if="provinceChosedIndex">
                <div v-for="(item,index) in city[provinceChosedIndex]" :key="index" >
                    <div :class="{'selectItem':cityChosedIndex==index}" @click.stop.prevent="cityChosed(index)">
                        {{item.name}}
                    </div>
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
import { mapMutations, mapState, mapGetters } from "vuex";
import Tarbar from "../../components/tarbar";
import { Search } from "vant";
import { constants } from "zlib";
export default {
  props: ["isSelect_area", "onSelect"],
  data() {
    return {
      provinceChosedIndex: null,
      cityChosedIndex: null,
      intData: {}
    };
  },
  created() {
    const that = this;
    let default_addr={}
    const storage_city = window.localStorage.getItem('city');
    if(storage_city.id){
      default_addr = JSON.parse(storage_city);
    }else{
      default_addr = window.$nuxt.$store.state.default_addr;
    }


    const city = window.$nuxt.$store.state.city;
    const chose_area = default_addr.province.id - 1;
    city[chose_area].find((item, index) => {
      if (item.id == default_addr.city.id) {
        that.$set(that, "intData", item);
        this.$set(this, "cityChosedIndex", index);
        return false;
      }
    });
    this.$set(this, "provinceChosedIndex", chose_area);

  },
  mounted() {
    this.onSelect(
      "isSelect_area",
      false,
      this.intData
    );
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
      index !== null &&
        this.onSelect(
          "isSelect_area",
          false,
          this.city[this.provinceChosedIndex][index]
        );
    }
  },
  computed: {
    city() {
      return window.$nuxt.$store.state.city;
    }
  }
};
</script>
