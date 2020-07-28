<template>
    <div>
       <Header :title="title"/>
       <div class="father">
         <div class="title">余额充值</div>
         <div class="chose_box" >
           请选择充值数额
           <ul class="num_list">
              <li v-for="(item,i) in math_num_list" :key="i" :class="[i == liIndex?'cur':'']" @click="choses(i)">
                <p class="colors">{{item}}元</p>
                <p>{{item+recharge_given[i]}}鱼泡币</p>
              </li>
           </ul>
         </div>
         <div class="title">充值明细</div>
        <div v-for="(item,i) in math_num_list" :key="i" v-if='i==rehIndex'>
         <div class="recharge-details">
            <p>
               充值金额
              <span class="colors">{{item}}元</span>
            </p>
            <p>
               充值积分
              <span class="colors">{{item+recharge_given[i]}}积分</span>
            </p>
            <p>
               积分单价
              <span class="colors">{{item/(item+recharge_given[i]) | capitalize}}元 /个</span>
            </p>
            <p>
               充值后总积分
              <span class="colors">{{coin_users+item+recharge_given[i]}}积分(可查看个{{(coin_users+item+recharge_given[i])/3 | tel}}电话)</span>
            </p>
         </div>
       </div>
         <div class="pay-type">
           <div class="left">
             <img src="../../assets/img/wx-icon.png">
           </div>
           <div class="center">
             <p>微信支付</p>
             <p>微信安全支付</p>
           </div>
           <div class="right">
             <img src="../../assets/img/wx-right.png">
           </div>
         </div>
         <div class="recharge" @click="submit">确认付款</div>
       </div>
    </div>
</template>

<script>
import {Toast} from 'vant';
export default {
    components:{
    },
    mounted(){
      this.recharge()
    },
    data(){
      return{
          title:'鱼泡币充值',
          math_num_list:[],
          recharge_given:[],
          liIndex:0,
          rehIndex:0,
          coin_users:''
      }
    },
    methods:{
      choses(index){
        this.liIndex = index
        this.rehIndex = index
      },
      // 获取数据
      recharge(){
        this.$axios.post('/coin/recharge-ready').then(res=>{
           const {math_num_list,recharge_given,coin_user} = res.content
            this.math_num_list = [...math_num_list]
            this.recharge_given = [...recharge_given]
            this.coin_users = coin_user
        })
      },
      //发起充值
      submit(){
        const {rehIndex,math_num_list} = this;
        let config = {
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
        };
        this.$axios.post('/coin/recharge?amount='+math_num_list[rehIndex],config).then(res=>{
           if(res.code == 200){
             let {appid,noncestr,orderid,partnerid,prepayid,sign,timestamp} = res.content;
            //暂时做不了后端接口需要写m端的
            window.location.href = `https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=${prepayid}&package=${res.content.package}&redirect_url=http://192.168.1.98:3000/dist/coin/recharge`
            // let wx = {}
            // if (process.client) {
            //   wx = require('weixin-js-sdk')
            //   debugger
            //   wx.config({
            //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //     appId: appid, // 必填，公众号的唯一标识
            //     timestamp, // 必填，生成签名的时间戳
            //     nonceStr:noncestr, // 必填，生成签名的随机串
            //     signature: sign,// 必填，签名
            //     jsApiList: ['chooseWXPay','ready'] // 必填，需要使用的JS接口列表
            //   });
            //   wx.ready(function(){
            //   debugger
            //     wx.chooseWXPay({
            //       timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            //       nonceStr: noncestr, // 支付签名随机串，不长于 32 位
            //       package: res.content.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            //       signType: 'SHA1', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            //       paySign: sign, // 支付签名
            //       success: function (res) {
            //         debugger
            //           //跳转到支付成功页面有这个页面
            //           $this.$router.push({
            //               path: "/success_page",
            //               name:"success_page"
            //           })
            //       },
            //       cancel: function (res) {
            //           Toast('已取消支付');
            //       },
            //       fail: function (res) {
            //           Toast('支付失败，请重试');
            //       }
            //     })
            //   })
            // }
            //  this.$axios.post('/coin/check-order?order='+res.content.orderid,config).then(response=>{
            //   if(response.code == 200){
            //     debugger
            //   }
            // })
          }
        })
      },
    },
    filters: {
      capitalize: function (value) {
          return value.toFixed(2)
      },
      tel:function (value){
        return  parseInt(value)
      }
  }
}
</script>

<style lang='scss' scoped>
@import './recharge.scss'
</style>
