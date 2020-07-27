<!-- keep-alive -->
<template>
  <div>
    <div class='layout' numberServers="3">
      <nuxt keep-alive :keep-alive-props="{ include: includeArr }"/>
      <Loading v-if="numberServers!=3"/>
    </div>
  </div>
</template>

<script>
import Loading from "../components/loading";
import {StorageType} from '../static/exports/area_type.js';
import {getCookie,GetUser} from '../static/utils/utils.js';

export default {
  layout: 'index',
  data() {
    return {
      isShow: false,
      numberServers:0,
      includeArr: ['list','home'] // 需要缓存的组件名数组
    };
  },
  components: {
    Loading
  },
  mounted() {
    this.getUser()
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
          that.$nuxt.$store.commit('setMechanics',types)
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
          const {default_cover,default_header,addr,file_domain,contact,wx_service} = res.content
          const default_portrait = {
            default_cover,default_header
          }
          const contacts = {contact,wx_service};
          that.$nuxt.$store.commit('setPortrait',default_portrait)
          that.$nuxt.$store.commit('setDefaultAddr',addr)
          that.$nuxt.$store.commit('setImgServer',file_domain)
          that.$nuxt.$store.commit('setContact',{...contacts})
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
  z-index: 70;
}
</style>
