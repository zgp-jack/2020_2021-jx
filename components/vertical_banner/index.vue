<template>
      <van-swipe class="my-swipe" :vertical="true" :autoplay="3000" :show-indicators="false" ref="resize">
        <van-swipe-item>
          <p>置顶发布消息，提升曝光率，让别主动联系你 <span>去置顶</span></p>
        </van-swipe-item>
        <van-swipe-item>
          <p>点此发布机械出租、求租、转让、求购 <span>一键发布</span></p>
        </van-swipe-item>
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

    },
    created(){
      console.log(this.$props.type)
    },
    props:['type']
  }
</script>

<style lang="scss" scoped="scoped">
  .my-swipe{
    height: 100%;
    p{
      font-size:0.25rem;
      color: #ffa926;
    }
  }
 .van-swipe-item{
    font-size: 0.3rem;
    background: #fff;
    line-height: 0.77rem;
  }
</style>
