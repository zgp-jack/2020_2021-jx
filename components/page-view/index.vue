<template>
  <div>
    <van-overlay :show="show" @click="show = true" z-index="50" lock-scroll:true>
      <div class="wrapper" @click.stop>
        <img src="../../assets/img/my-fabu/gofabu.png">
        <img src="../../assets/img/my-fabu/go-line.png" alt="">
        <div class="i-text">
          点击此处可快速发布机械
          <span style="color:#FFAA27">求租</span>
          和
          <span style="color:#FFAA27">出租</span>
          信息
        </div>
        <div class="i-know" @click="iLnowFn">我知道了</div>
      </div>
</van-overlay>
  </div>
</template>

<script>
import { Overlay } from 'vant';
import {getNovicePoint,setNovicePoint} from '../../static/utils/utils.js';
export default {
  props:['show'],
  components:{
    'van-overlay':Overlay
  },
  data(){
    return{
    }
  },
  methods:{
    iLnowFn(){
        let guide = getNovicePoint();
        guide.detail = false;
        setNovicePoint(guide);
        this.$emit('novicePointHiddens',false)
      },
  }
}
</script>

<style lang='scss'>
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
      >img:first-child{
        position: absolute;
        top: 10%;
        right: 20%;
        width: calc(1.03rem * 1.2);
        height: calc(0.41rem * 1.2);
      }
      >img:nth-child(2){
        position: absolute;
        top: 18%;
        left: 65%;
        transform: translate(-65%, -10%);
        width:0.88rem;
        height:2rem;
      }
      .i-text{
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -33%);
        width: 3.8rem;
        line-height:0.45rem;
        padding:0.25rem;
        box-sizing: border-box;
        background: rgba(255,255,255,0);
        border: 2px solid rgba(255, 255, 255, 1);
        border-radius:0.34rem;
        text-align: center;
        color: #FFFFFF;
        font-size:0.3rem;
        letter-spacing: 1px;
      }
      .i-know{
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -55%);
        width: 2rem;
        line-height:0.67rem;
        background: rgba(255,255,255,0);
        border: 2px solid rgba(255, 255, 255, 1);
        border-radius:0.34rem;
        text-align: center;
        color: #FFFFFF;
        font-size:0.26rem;
      }
  }

</style>
