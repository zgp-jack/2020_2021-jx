<template>
    <div class="Box" @click="box" :class="[boxshow?'on':'']">
      <div class="signNoticeContent">
          <div class="sign_head">
              <p v-if="boxon">签到成功,获得1个鱼泡币</p>
              <p v-else>您今天已经签到过了</p>
          </div>
          <div class="sign_body">
            <p class="notices">您还可以邀请好友，以获得更多鱼泡币</p>
            <p class="invitation" @click.stop="peoples">去邀请</p>
          </div>
      </div>
      <span class="iconfont icon-cuo signclose"></span>
    </div>
</template>

<script>
export default {
    props:['boxon','boxshow'],
    data(){
      return{

      }
    },
    methods:{
      peoples(){
      },
      box(){
       this.$emit('handle',false)
      }
    },
}
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
