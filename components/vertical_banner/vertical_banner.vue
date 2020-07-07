<template>
      <van-swipe class="my-swipe" :vertical="true" :autoplay="3000" :show-indicators="false" ref="resize">
        <van-swipe-item>
          <p>大家发了份的发的发达</p>
        </van-swipe-item>
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

    },
    created(){
      console.log(this.$props.type)
    },
    props:['type']
  }
</script>

<style lang="scss" scoped="scoped">
 .van-swipe-item{
    font-size: 0.3rem;
    background: #fff;
    line-height: 0.77rem;
  }
</style>
