<template>
  <van-swipe class="my-swipe"  indicator-color="white" width="7.5rem" height="1rem" :autoplay="3000" :vertical="true" ref="resize">
    <van-swipe-item >1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>
</template>

<script>
  import { Swipe , SwipeItem } from 'vant';
  export default{

    data(){
      return{

      }
    },
    components:{
      "van-swipe": Swipe,
      "van-swipe-item" : SwipeItem,
    },
  }
</script>

<style>
</style>
