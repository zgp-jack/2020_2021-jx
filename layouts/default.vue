<!-- keep-alive -->
<template>
  <div class='layout'>
    <nuxt v-if="isShow && numberServers==3"/>
    <Loading v-else-if="!isShow"/>
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
      value1:0,
      numberServers:0,
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
    //获取默认头像、地区
    this.getDefaultData()
    this.getUser()
  },
  methods:{
    //获取机械类型
    getMechanics(){
      const that = this;
      this.$axios.get('/index/type-class').then(res=>{
        let result = StorageType(res.content,'0')
        let types = { 'type': [{id: 0, name: "所有机械", pid: "0"}].concat(result.par), 'clas': [{}].concat(result.son)}
        window.$nuxt.$store.commit('setMechanics',types)
        that.numberServers+=1
      })
    },
    //获取默认头像、地区
    getDefaultData(){
      const that = this;
      that.$axios.get('/').then(res=>{
        that.numberServers+=1
        const {default_cover,default_header,addr} = res.content
        const default_portrait = {
          default_cover,default_header
        }
        window.$nuxt.$store.commit('setPortrait',default_portrait)
        window.$nuxt.$store.commit('setDefaultAddr',addr)
      })
    },

    getUser(){
      const that = this;
      that.$axios.get('/user/get-userinfo').then(res=>{
        if(res.code==200){
          window.$nuxt.$store.commit('setUserinfo',res.content)
        }
        that.numberServers+=1
      })
    }
  },
  computed: {
  },
};
</script>


<style scoped>
.layout{
  width: 7.5rem;
  margin:0 auto;
}
.model_mask {
  width: 100%;
  left: 0;
}
</style>
