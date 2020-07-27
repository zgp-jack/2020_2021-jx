<!-- 自定义地区选择 -->
<template>
    <div :class="{'model_mask':true,'selectd_box':!isSelect_area}" @click.stop.prevent="onSelect('isSelect_area',false)" v-if="city.length">
        <div :class="{'inner':true,'clearfix':true,'selectd':!isSelect_area}">
            <div class="city fl">
                <div @click="provinceChosed(0)" :class="{'item':provinceChosedIndex==0,'selectItem':provinceChosedIndex==0}">{{city[0].name}}</div>
                <div v-for="(item,index) in city" :key="index" v-if="index>0" @click.stop.prevent="provinceChosed(index,item)" :class="{'item':provinceChosedIndex==index,'selectItem':provinceChosedIndex==index}">{{item[0].name}}</div>
            </div>
            <div class="area item fl" v-if="!onlyFather">
              <div v-if="provinceChosedIndex">
                <div v-for="(item,index) in city[provinceChosedIndex]" :key="index" >
                    <div :class="{'selectItem':cityChosedIndex==index}" @click.stop.prevent="cityChosed(index,item)">
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
  props: ["isSelect_area", "onSelect","whearthStorage","onlyFather","default_data"],
  data() {
    return {
      provinceChosedIndex: null,
      cityChosedIndex: null,
      intData: {},
      province:{},
      whearth_storage:false,
    };
  },
  mounted() {
    if(this.$props.whearthStorage){
      this.whearth_storage = true;
    }
    const that = this;
    let default_addr={}
    let storage_city = window.sessionStorage.getItem('city');
    let storage_province = window.sessionStorage.getItem('province');
    let all_area = window.sessionStorage.getItem('all');
    if(this.whearth_storage){ //是否要从本地存储获取值
      if(all_area){
        //本地存储是否有全国的数据
        this.provinceChosedIndex=0;
        this.intData = {id: 1, name: "全国", pid: "0"};
        return
      }else if(storage_city){
        //本地存储有城市数据的时候
        //省份是否为空  ---- 上来直接选择城市，没有选择省，这时省份就为空
        let province = JSON.parse(storage_province);
        if(province.id){
          // 不为空就赋本地的数据
          default_addr = {
            province,
            city:JSON.parse(storage_city),
          };
        }
      }else{
        default_addr = this.default_data?this.default_data:that.$nuxt.$store.state.default_addr;
      }
    }else{
      default_addr = this.default_data?this.default_data:that.$nuxt.$store.state.default_addr;
    }
    const city = that.$nuxt.$store.state.city;
    const chose_area = default_addr.province.id - 1;
    //只有父选项并且有默认值的情况下
    default_addr.city ? city[chose_area].find((item, index) => {
      if (item.id == default_addr.city.id) {
        that.$set(that, "intData", item);
        this.$set(this, "cityChosedIndex", index);
        return false;
      }
    })
    :
    that.$set(that, "intData", default_addr.province);
    default_addr.province && this.$set(this, "provinceChosedIndex", chose_area);

    this.onSelect(
      "isSelect_area",
      false,
      this.intData
    );
  },

  methods: {
    //大城市选择
    provinceChosed(index,item) {
      if (this.provinceChosedIndex !== index) {
        if (index == 0) {
          //全国
          this.onSelect("isSelect_area", false, this.city[index]);
          this.province = {...item};
          window.sessionStorage.setItem('all',JSON.stringify({id: 1, name: "全国", pid: "0"}))
        }else if(this.onlyFather){
          this.onSelect("isSelect_area", false, this.city[index][0]);
        }
        this.$set(this, "provinceChosedIndex", index);
        this.cityChosed(null);
      }
    },
    //城市选择
    cityChosed(index,item) {

      if(index != null){
        //设置本地存储
        window.sessionStorage.setItem('province',JSON.stringify(this.city[this.provinceChosedIndex][0]));
        window.sessionStorage.setItem('city',JSON.stringify(this.city[this.provinceChosedIndex][index]));
        //把全国的本地储存清空
        window.sessionStorage.setItem('all','');
      }
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
      return this.$nuxt.$store.state.city;
    }
  }
};
</script>
