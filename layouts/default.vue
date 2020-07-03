<template>
  <div class='layout'>
    <nuxt v-if="isShow"/>
    <Loading v-else-if="!isShow || counter!==0"/>
  </div>
</template>

<script>
import Loading from "../components/loading";
import {StorageType} from '../static/exports/area_type.js';
import {mapState} from 'vuex';

export default {
  data() {
    return {
      isShow: false,
      value1:0
    };
  },
  components: {
    Loading
  },
  mounted() {
    setTimeout(() => {
      this.$set(this, "isShow", true);
    }, 10);
  },
  created(){
    //获取机械类型
    this.getMechanics()
  },
  methods:{
    //获取机械类型
    getMechanics(){
      const that = this;
      this.$axios.get('/index/type-class').then(res=>{///index/type-class
        let result = StorageType(res.content,'0')
        let types = { 'type': [{id: 0, name: "所有机械", pid: "0"}].concat(result.par), 'clas': [[]].concat(result.son)}
        window.$nuxt.$store.commit('setMechanics',types)
      })
    },
  },
  computed: {
  },
};
</script>


<style scoped>
.model_mask {
  width: 100%;
  left: 0;
}
</style>
