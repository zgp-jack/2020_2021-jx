<!-- keep-alive -->
<template>
  <div class='layout'>
    <nuxt v-if="isShow && numberServers==3" keep-alive :keep-alive-props="{ include: includeArr }"/>
    <Loading v-else-if="!isShow"/>
  </div>
</template>

<script>
import Loading from "../components/loading";
import {StorageType} from '../static/exports/area_type.js';
import {mapState} from 'vuex';
import {getCookie,GetUser} from '../static/utils/utils.js';

export default {
  data() {
    return {
      isShow: false,
      value1:0,
      numberServers:0,
      includeArr: ['list','home'] // 需要缓存的组件名数组
    };
  },
  components: {
    Loading
  },
  mounted() {
    this.getUser()
    setTimeout(() => {
      this.$set(this, "isShow", true);
    }, 10);
  },
  created(){
    //获取机械类型
    this.getMechanics()
    //获取默认头像、地区
    this.getDefaultData()
  },
  methods:{
    //获取机械类型
    getMechanics(){
      const that = this;
      this.$axios.get('/index/type-class').then(res=>{
        if(res.code == 200){
          let result = StorageType(res.content,'0')
          let types = { 'type': [{id: 0, name: "所有机械", pid: "0"}].concat(result.par), 'clas': [{}].concat(result.son)}
          window.$nuxt.$store.commit('setMechanics',types)
          that.numberServers+=1
        }
      })
    },
    //获取默认头像、地区
    getDefaultData(){
      const that = this;
      that.$axios.get('/index/index',{params:{phone:'',user_token:''}}).then(res=>{
        if(res.code == 200){
          that.numberServers+=1
          const {default_cover,default_header,addr,file_domain} = res.content
          const default_portrait = {
            default_cover,default_header
          }
          window.$nuxt.$store.commit('setPortrait',default_portrait)
          window.$nuxt.$store.commit('setDefaultAddr',addr)
          window.$nuxt.$store.commit('setImgServer',file_domain)
        }
      })
    },

    //获取用户信息
    getUser(){
      const that = this;
      function callback(){
        that.numberServers+=1
      }
      GetUser(that,callback);
    },

    //获取微信号/客服电话
    getcontact(){
      
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
