<template>
    <div>
       <!-- 遮罩 -->
    <van-overlay :show="show" @click="show =false" z-index="70">
        <div class="wrapper" @click.stop='hander'>
            <div class="item">
                <div class="title">温馨提示</div>
                <div class="detail">微信号:{{Copys}}已复制到粘贴板,去微信-添加朋友-搜索框粘贴!</div>
                <div class="right">确定</div>
            </div>
        </div>
    </van-overlay>
    </div>
</template>

<script>
import {Overlay} from 'vant'
export default {
  props:['Copys','show'],
  components:{
    'van-overlay':Overlay
  },
    data(){
      return{

      }
    },
    methods:{
        hander(){
          this.$emit('hander',false);

          document.addEventListener(
              "WeixinJSBridgeReady",
              function() {
                 WeixinJSBridge.call("closeWindow");
              },
             false
           );
        }
    }
}
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
