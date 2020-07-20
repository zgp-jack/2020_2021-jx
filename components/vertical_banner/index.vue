<template>
  <div style="height: 100%;">
    <van-swipe class="my-swipe" :vertical="true" :autoplay="3000" :show-indicators="false" ref="resize">
      <van-swipe-item v-if="go_release">
        <p @click="go_set_top">置顶发布消息，提升曝光率，让别主动联系你 <span>去置顶</span></p>
      </van-swipe-item>
      <van-swipe-item v-if="go_settop">
        <p @click="go_releaseFn">点此发布机械出租、求租、转让、求购 <span>一键发布</span></p>
      </van-swipe-item>
    </van-swipe>
    <!-- 发布弹窗 -->
    <BottomTop  ref="child" :hiddenAll="true" />
  </div>
</template>

<script>
  import { Swipe , SwipeItem } from 'vant'
  import BottomTop from '../../components/bottom-topbar/index';
  export default{
    data(){
      return{
        banner_data:null,
      }
    },
    components:{
      "van-swipe": Swipe,
      "van-swipe-item" : SwipeItem,
      BottomTop
    },
    mounted() {

    },
    created(){
    },
    methods:{
      //一键发布
      go_releaseFn(){
        this.$refs.child.list_show();
      },
      go_set_top(){
        this.$router.push('/user/release/'+this.$route.query.mode)
      }
    },
    props:['type','go_release','go_settop']
  }
</script>

<style lang="scss" scoped="scoped">
  .my-swipe{
    height: 100%;
    p{
      font-size:0.25rem;
      color: #ffa926;
      span{
        padding: 0.05rem 0.1rem;
        background-color: #FFAA26;
        color: #fff;
        border-radius: 0.07rem;
        // float: right;
      }
    }
  }
 .van-swipe-item{
    font-size: 0.3rem;
    background: #fff;
    line-height: 0.77rem;
  }
</style>
