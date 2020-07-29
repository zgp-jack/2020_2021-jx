<!-- 底部导航 -->

<template>
    <div class="tarbar">
        <div v-for="(item,index) in list" :to="item.path" :key="index" :class="path==item.path?'nuxt-link-active':''" @click="onskip(item.path)">
          <img :src="path==item.path?item.img:item.img_hui">{{item.name}}
        </div>
    </div>
</template>

<script>
import { whetherLogin } from "../../static/utils/utils.js";
export default {
  data() {
    return {
      list: [
        {
          name:'首页',
          path:'/home',
          img:require("../../assets/img/home.png"),
          img_hui:require("../../assets/img/home_hui.png"),
        },
        {
          name:'机械求租',
          path:'/list/1',
          img:require("../../assets/img/information.png"),
          img_hui:require("../../assets/img/information_hui.png"),
        },
        {
          name:'机械出租',
          path:'/list/2',
          img:require("../../assets/img/lease.png"),
          img_hui:require("../../assets/img/lease_hui.png"),
        },
        {
          name:'个人中心',
          path:'/user',
          img:require("../../assets/img/personal.png"),
          img_hui:require("../../assets/img/personal_hui.png"),
        },
      ],
      path: this.$route.path
    };
  },
  methods:{
    onskip(path){
      // const {base} = this.$router.history;
      // let url = base?window.location.origin + base + path:window.location.origin+path
      // if(url !==window.location.href){
      //   if(path == '/user'){
      //   whetherLogin(this,path)
      //   return false
      // }
      //   window.location.href = url
      // }
      if(path=='/user'){
        this.$router.push(path)
      }else{
        this.$router.push({
          path,
          query:{'keep-alive':false}
        })
      }
      
    }
  }
};
</script>

<style lang='scss'>
@import "./style.scss";
</style>


