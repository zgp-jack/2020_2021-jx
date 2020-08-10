<template>
  <div >
        <p @click="go_releaseFn" v-if="go_release">点此发布机械出租、求租、转让、求购 <span>一键发布</span></p>
        <p @click="go_set_top" v-if="go_settop">置顶发布消息，提升曝光率，让别主动联系你 <span>去置顶</span></p>


    <!-- 发布弹窗 -->
    <BottomTop  ref="child" :hiddenAll="true" />
  </div>
</template>

<script>
  import { Swipe , SwipeItem } from 'vant'
  import {whetherLogin} from '../../static/utils/utils'
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
    beforeMount(){
    },
    methods:{
      //一键发布
      go_releaseFn(){
        this.$refs.child.list_show();
      },
      go_set_top(){
        if(whetherLogin(this) == false) return false;
        this.$router.push({path:'/user/release/',query:{mode:this.$route.query.mode}})
      }
    },
    props:['type','go_release','go_settop']
  }
</script>

<style lang="scss" scoped="scoped">
    .notice{
      height: auto;
    }
    p{
      font-size:0.25rem;
      color: #ffa926;
      line-height: 0.6rem;
      span{
        padding: 0.05rem 0.1rem;
        background-color: #FFAA26;
        color: #fff;
        border-radius: 0.07rem;
        margin-left:0.2rem;
      }
    }

 .van-swipe-item{
    font-size: 0.3rem;
    background: #fff;
    line-height: 0.77rem;
  }
</style>
