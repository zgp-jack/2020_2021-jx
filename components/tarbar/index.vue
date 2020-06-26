<!-- 底部导航 -->

<template>
    <div class="tarbar">
        <nuxt-link v-for="(item,index) in list" :to="item.path" :key="index">
          <img :src="path==item.path?item.img:item.img_hui">{{item.name}}
        </nuxt-link>
        
    </div>
</template>

<script>

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
  methods: {
    onback() {
      if (this.onskip) {
        this.onskip();
        return false;
      }
      this.$router.go(-1);
    }
  },
};
</script>

<style lang='scss'>
@import "./style.scss";
</style>


