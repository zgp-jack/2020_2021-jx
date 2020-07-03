<template>
    <van-swipe class="my-swipe"  indicator-color="white" width="7.5rem" :vertical="true" :autoplay="3000" ref="resize">
      <van-swipe-item v-for="(item,index) in banner_data ">{{item}}</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
</template>

<script>
  import { Swipe , SwipeItem } from 'vant'

  export default{
    data(){
      return{
        banner_data:null,
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
      this.banner_data = this.$props.obj.content

    },
    created(){
    
    },
    props:['obj']
  }
</script>

<style lang="scss" scoped="scoped">
  .my-swipe .van-swipe-item,.my-swipe .van-swipe__track {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
      width: 7.5rem !important;
    }
</style>
