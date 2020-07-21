<template>
  <div class="home-novice-point">
      <div class="mask">
        <div class="inner">
           <div class="top">
             <p class="inner-text" @click="iLnowFn">我知道了</p>
           </div>
           <div class="middle">
            <p class="inner-text">点击发布按钮，一键发布<span>机械求租、机械出租</span>信息</p>
           </div>
           <div class="line"></div>
           <div class="relase-btn" @click="iLnowFn"></div>
        </div>
      </div>
  </div>
</template>

<script>
  import {getNovicePoint,setNovicePoint} from '../../static/utils/utils.js';
  export default{
    data(){
      return{

      }
    },
    methods:{
      iLnowFn(){
        let guide = getNovicePoint();
        guide.home = false;
        setNovicePoint(guide);
        this.$emit('novicePointHidden',false);
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .mask{
    width: 7.5rem;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0,.5);
    z-index: 50;
    .inner{
      width: 7.5rem;
      position: absolute;
      bottom: 0;
      padding-bottom: 1.2rem;
      .relase-btn{
        width: 7.5rem;
        height:1.2rem;
        background-image:url(../../assets/img/home-images/release_btn.png);
        background-repeat: no-repeat;
        background-size: 3.1rem 1rem;
        background-position: 50% 0;
      }
      .line{
        width: 7.5rem;
        background-image: url(../../assets/img/home-images/point.png);
        background-repeat: no-repeat;
        background-size: 0.66rem 2.06rem;
        background-position: 46% 0;
        height: 2.06rem;
        margin-bottom: 0.5rem;
      }
      .middle{
        margin-bottom: 0.24rem;
        p{
          padding: 0.46rem 0.4rem 0 0.4rem;
          width: 4.1rem;
          height: 1.84rem;
          border-radius: 0.2rem;
          span{
            color:#ffab31
          }
        }
      }
      .top{
        width: 7.5rem;
        p{
          width: 2.1rem;
          height: 0.68rem;
          line-height: 0.68rem;
          border-radius: 0.6rem;
          margin-bottom: 1.3rem !important;
        }
      }
      .inner-text{
        margin: 0 auto !important;
        border: 1px solid #fff;
        color: #fff;
        font-size: 0.28rem;
        text-align: center;
      }
    }
  }
</style>
