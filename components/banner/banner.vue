<template>
    <van-swipe class="my-swipe"  indicator-color="white" width="7.5rem" :autoplay="3000" ref="resize">
      <van-swipe-item>1</van-swipe-item>
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
    mounted() {
      // 轮播图重新获取上一级的尺寸
      setTimeout(()=>{
        this.$refs.resize.resize()
      },0)
      console.log(this.$props)
    },
    props:['obj']
  }
</script>

<style lang="scss">

</style>
