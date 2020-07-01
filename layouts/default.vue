<template>
  <div class='layout'>
    <nuxt v-if="isShow"/>
    <Loading v-else/>
  </div>
</template>

<script>
import Loading from "../components/loading";
import { mapMutations } from "vuex";
import {StorageType} from '../static/exports/area_type.js';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    Loading
  },
  mounted() {
    setTimeout(() => {
      this.$set(this, "isShow", true);
    }, 10);

    //获取机械类型
    this.getMechanics()
  },
  methods:{
    //获取机械类型
    getMechanics(){
      const that = this;
      this.$axios.get('/index/type-class',{params:{}}).then(res=>{///index/type-class
        let result = StorageType(res.content,'0')
        let types = { 'type': [{id: 0, name: "所有机械", pid: "0"}].concat(result.par), 'clas': [[]].concat(result.son)}
        window.$nuxt.$store.commit('setMechanics',types)
      })
    },
    myfun(){
    }
  },
};
</script>


<style scoped>
.model_mask {
  width: 100%;
  left: 0;
}
</style>
