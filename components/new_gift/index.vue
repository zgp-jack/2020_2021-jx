<template>
  <div>
      <div class="new_gift" v-if="show_gift_alert" @click.stop="close_gift_alert($event,'bg')">
      <van-popup v-model="show_gift">
        <div class="inner">
          <div class="gift-img-text"></div>
          <p class="gift-title">领礼包，上万机械信息免费看</p>
          <div class="main-img"></div>
          <div class="gift-btn" @click="rigthReceove">立即领取</div>
        </div>
        <div class="gift-close iconfont icon-cuo" @click="close_gift_alert($event,'close')"></div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import {Popup,Dialog} from 'vant';
export default {
  beforeMount(){
    // this.listData()
  },
  props:['home','lost'],
  components:{
    'van-popup':Popup,
  },
  data(){
    return{
      show_gift:true, //新手大礼包
      show_gift_alert:true,//新手大礼包
      welfareDialog:false
    }
  },
  methods:{
    listData(parmas={}){
        if(window.localStorage.getItem('welfare') == null && !this.home){
            const that = this;
            that.$axios.get('/index/home',{params}).then(res=>{
            that.welfareDialog = res.content.welfareDialog
            if(!that.welfareDialog) that.show_gift_alert = false
            window.localStorage.setItem('welfare',that.welfareDialog)
        })
        }else if(!this.home && window.localStorage.getItem('welfare') !=null){
            return false;
        }
      },
    //关闭新手大礼包
      close_gift_alert(e,need){

        e.stopPropagation()
        let classText = e.target.className;
        if(classText.includes('van-fade-leave-active') && need == "bg"){
          this.$emit("giftAlertHidden",false);
        }else if(need == "close"){
          this.show_gift_alert = false
          this.$emit("giftAlertHidden",false);
        }
      },
       //立即领取
      rigthReceove(){
        let that = this;
        //发送ajax请求
        let params = {welfareId: 1}
        this.$axios.get('/user-welfare/get-welfare',{params}).then(res=>{
          if(res.code == 200){
            that.$router.push('/user/welfare')
          }else if(res.code == 500){
            Dialog.alert({
              title: '温馨提示',
              message: '您已经领取过该福利了',
            })
            this.$emit("giftAlertHidden",false);
            that.show_gift_alert = false
          }
        })
      }

  },
  watch:{
    show_gift(value){
      console.log(value)
    }
  }
}
</script>

<style lang='scss' scoped>
  .new_gift{
    position: fixed;
    top: 0;
    width: 7.5rem;
    height: 100vh;
    z-index: 100;
    .van-popup{
      overflow-y:visible;
    }
    .van-popup--center{
      top: 40%;
       border-radius: 0.23rem;
      .inner{
        width: 4.43rem;
        height: 5.74rem;
        background-color: #fff;
        box-sizing: border-box;
        padding-top: 0.4rem;
        border-radius: 0.23rem;
        .gift-img-text{
          height: 0.47rem;
          margin: 0 auto;
          background-image: url(../../assets/img/other/gift_text.png);
          width: 2.5rem;
          background-size: 2.5rem 0.47rem;
          margin-bottom: 0.24rem;
        }
        .gift-title{
          font-size: 0.3rem;
          color: #839092;
          text-align:center
        }
        .main-img{
          width: 100%;
          height: 2.98rem;
          background-image: url(../../assets/img/other/gift_img.png);
          background-size: 100% 100%;
          margin-bottom: 0.27rem;
        }
        .gift-btn{
          width: 3.47rem;
          height: 0.75rem;
          background-image: url(../../assets/img/other/gift_btn.png);
          background-size: 100% 100%;
          font-size: 0.26rem;
          text-align: center;
          margin: 0 auto;
          line-height: 0.75rem;
          color: #fff;
        }
      }
      .gift-close{
        position: absolute;
        font-size: 0.6rem;
        color: #fff;
        left: calc(50% - 0.3rem);
        top: 7rem;
      }
    }
  }
</style>
