<template>
  <div>
    <Copy :Copys = 'contact.wx_service' :show = 'show' @hander = 'hander'/>
    <!-- TOP -->
    <div class="notice" @click="hides(true)">
      <div>
          <p>
            加微信号:
            <span class="tel-num">{{contact.wx_service}}</span>
            <span class="button">复制</span>
            <span>拉您进机械微信群</span>
          </p>
          <p>
            客服电话:
            <span class="tel-num">{{contact.contact}}</span>
            <span class="button">呼叫</span>
          </p>
      </div>
    </div>
    <!-- 遮罩 -->
    <div class="father" v-show="bar_show" @click="hides(false)">
        <div class="modal">
          <div class="content">
            <div class="inner">
                <p>
                  添加<span class="msg">{{contact.wx_service}}</span>
                  工友微信号,需要在<span class="msg">添加朋友-搜索框</span>
                  中粘贴已复制微信号添加好友
                </p>
                <p class="button" @click.stop="copy">复制</p>
            </div>
            <div class="inner">
                <p>
                  客服电话: <span class="msg">{{contact.contact}}</span>
                  <span class="timer">上班时间:早上8:00-晚上21:00</span>
                </p>
                <p class="button" @click.stop="cell">呼叫</p>
            </div>
          </div>
        </div>
    </div>
 </div>
</template>

<script>
import Copy from '../../components/Copy'
import {Copynum,callPhoneFn} from '../../static/utils/utils'
export default {
  components:{
    Copy
  },
  data(){
    return{
        bar_show:false,
        show:false,
    }
  },
  methods:{
    hides(right){
        if(right){
          this.bar_show = true
        }else if(!right){
          this.bar_show = false
        }
    },
    copy(){
     this.show = true
     Copynum(this,this.contact.wx_service)
    },
    cell(){
      callPhoneFn(this.contact.contact)
    },
    hander(hide){
      this.show = hide
    }
  },
  computed:{
    contact(){
      return this.$nuxt.$store.state.contact;
    }
  },
}
</script>

<style lang='scss' scoped>
 @import './index.scss'
</style>
