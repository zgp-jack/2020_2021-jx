<!-- keep-alive -->
<template>
  <div>
    <div class='layout'>
      <Loading v-if="numberServers!=4" :show='true'/>
      <nuxt keep-alive :keep-alive-props="{ include: includeArr }"/>
    </div>
  </div>
</template>

<script>
import Loading from "../components/loading";
import {StorageType} from '../static/exports/area_type.js';
import {GetUser,isWeixin,WeixinShare,Wx_Read} from '../static/utils/utils.js';
import area from '../static/exports/area_type';

export default {
  layout: 'index',
  data() {
    return {
      numberServers:0,
      includeArr: ['list','home'], // 需要缓存的组件名数组
    };
  },
  components: {
    Loading
  },
  //mounted里操作，不然dom没有渲染出来
  mounted(){
    const {path} = this.$route;
    const that = this;
    if(path.includes('/luck')){
      // 大转盘不需要请求这些接口,其他页面通过路由跳转的都需要，不会重复请求,因为nuxt渲染机制，需要改成异步的
      that.numberServers = 3
    }else{
      that.int()
    }
  },
  watch: {
    $route (to, from) {
      // console.log(to,from)
      const weixin = isWeixin();
      if(weixin){
        setTimeout(()=>{
          this.setshareObj()
        },1000)
      }
    }
  },
  methods:{
    //初始化
    int(){
      const weixin = isWeixin();
      const token = this.$cookies.get('token');
      const id = this.$cookies.get('id');
      const {code,state} = this.$route.query;
      const that = this;
      //分享有code不判断code
      if(weixin && !token && !id && !state){
        setTimeout(()=>{that.authorization()},200)
      }else{

        that.getArea()
        //获取机械类型
        that.getMechanics()
        //获取默认头像、地区
        that.getDefaultData()
        that.getUser()
        if(weixin){
          setTimeout(()=>{
            that.setshareObj()
          },1000)
          // that.setshareObj()
          WeixinShare(this,function(wx){
            Wx_Read(wx)
            that.numberServers+=1
          })
        }else{
          that.numberServers+=1
        }
        
      }
    },
    setshareObj(){
      let url = window.$nuxt.$route.fullPath;
      //http://m.zhaodongdi.com/  http://jxm.kkbbi.com/
      let path = "http://jxm.kkbbi.com/"
      // let path = "http://m.zhaodongdi.com/"
      var shareObj = {
              title:!url.includes('view')?"工程找机械":document.title,
              desc :"每天发布上万条全国工程找机械信息！",
              link :!url.includes("invitation")?path+window.$nuxt.$route.fullPath : path+"qiuzu/",
              imgUrl:"http://statics.zhaogongdi.com/common/jixie_app_logo.png",
          }
          window.shareObj = shareObj;
          
    },
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
      let weixin = isWeixin();
      const that = this;
      that.$axios.get('/index/index',{params:{phone:'',user_token:''}}).then(res=>{
        if(res.code == 200){
          that.numberServers+=1
          const {default_cover,default_header,addr,file_domain,contact,wx_service} = res.content
          const default_portrait = {
            default_cover,default_header
          }
          let contacts = {contact,wx_service};
          that.$nuxt.$store.commit('setPortrait',default_portrait)
          that.$nuxt.$store.commit('setDefaultAddr',addr)
          that.$nuxt.$store.commit('setImgServer',file_domain)
          if(!weixin) {
            that.$nuxt.$store.commit('setContact',{...contacts})
            return
          };
          // 微信端请求微信路径接口
          that.$axios.get('us/wx-account',{params:{phone:'',user_token:''}}).then(res=>{
            if(res.code == 200){
              let wx_service = res.content
              contacts = {contact,wx_service}
              that.$nuxt.$store.commit('setContact',{...contacts})
            }
          })
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

    getArea(){
      const area_type = area.get_area()
      this.$nuxt.$store.commit('setArea',area_type)
    },

    //微信授权
    authorization(){
      let url = encodeURI('http://jxm.kkbbi.com/');
      // let url = encodeURI('http://m.zhaogongdi.com/');
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx97877fe3b35187a7&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=${url}#wechat_redirect`;
    },
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
