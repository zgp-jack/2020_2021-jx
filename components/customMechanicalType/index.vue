<!-- 自定义机械类型选择 -->
<template>
    <div :class="{'model_mask':true,'selectd_box':!isSelect_jixie}" @click.stop.prevent="onSelect('isSelect_jixie',false)" v-if="clas.length && type.length">
        <div :class="{'inner':true,'clearfix':true,'selectd':!isSelect_jixie}">
            <div class="city fl">
                <div @click="mechanicsChosed(0)" :class="{'item':clasIndex==0,'selectItem':clasIndex==0}">{{type[0].name}}</div>
                <div v-for="(item,index) in type" :key="index" v-if="index>0" @click.stop.prevent="mechanicsChosed(index,item)" :class="{'item':clasIndex==index,'selectItem':clasIndex==index}">{{item.name}}</div>
            </div>
            <div class="area item fl">
                <div v-if="clasIndex">
                    <div v-for="(item,index) in clas[clasIndex]" :key="index">
                        <div :class="{'selectItem':typeIndex==index}" @click.stop.prevent="sonMechanicsChosed(index,item)">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
@import '../customArea/style.scss';
</style>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import Tarbar from "../../components/tarbar";
import { Search } from "vant";
import { constants } from "zlib";
export default {
  props: ["isSelect_jixie", "onSelect"],
  data() {
    return {
      clasIndex: 0,
      typeIndex: null,
      mechanic:{}
    };
  },
  methods: {
    //机械选择
    mechanicsChosed(index,item) {
      debugger
      if (this.clasIndex !== index) {
        if (index == 0) {
          this.onSelect("isSelect_jixie", false, this.type[index]);
           window.sessionStorage.setItem('mechanic_all','{id:0}');
        }
        this.$set(this, "clasIndex", index);
        this.sonMechanicsChosed(null);
      }
      if(item){
        this.mechanic = {...item};
        window.sessionStorage.setItem('flag_mechanic',JSON.stringify(item))
      }
    },
    //子机械选择
    sonMechanicsChosed(index,item) {
      this.$set(this, "typeIndex", index);
      if(index != null){
        //设置本地存储
        window.sessionStorage.setItem('mechanic',JSON.stringify(this.mechanic));
        window.sessionStorage.setItem('mechanic_child',JSON.stringify(item));
        window.sessionStorage.setItem('mechanic_all','');
      }
      index!==null &&
        this.onSelect(
          "isSelect_jixie",
          false,
          this.clas[this.clasIndex][index]
        );
    }
  },
  computed: {
    clas() {
      return window.$nuxt.$store.state.clas;
    },
    type(){
        return window.$nuxt.$store.state.type;
    }
  }
};
</script>
