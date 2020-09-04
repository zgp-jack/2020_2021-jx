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
        <div v-for="(item,i) in math_num_list" :key="i" v-if='i==liIndex'>
         <div class="recharge-details">
            <p>
               充值金额：
              <span class="colors">{{item}}元</span>
            </p>
            <p>
               充值鱼泡币：
              <span class="colors">{{item+recharge_given[i]}}鱼泡币</span>
            </p>
            <p>
               鱼泡币单价：
              <span class="colors">{{item/(item+recharge_given[i]) | capitalize}}元 /个</span>
            </p>
            <p>
               充值后总鱼泡币：
              <span class="colors">{{coin_users+item+recharge_given[i]}}鱼泡币(可查看个{{(coin_users+item+recharge_given[i])/3 | tel}}电话)</span>
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
import {Toast,Dialog} from 'vant';
import { isWeixin } from '../../static/utils/utils';
export default {
    components:{
    },
    mounted(){
      let {ok = 0}  = this.$route.query
      if(ok){
        // 获取本地订单号
        let orderNo = localStorage.getItem('orderNo') || '';
        this.$nuxt.$store.commit('setOrderNo',orderNo)
        //console.log(orderNo)
        this.$router.replace('/coin/recharge')
      }
      console.log(ok)
      console.log(this.$route)
      this.recharge()
      this.check_order_status()
    },
    data(){
      return{
          title:'鱼泡币充值',
          math_num_list:[],
          recharge_given:[],
          liIndex:0,
          rehIndex:0,
          coin_users:'',
          timer: null
      }
    },
    beforeMount(){
      const ordernum = this.$cookies.get('ordernum');
      this.ordernum = ordernum;
      if(ordernum){
        Dialog.confirm({
          title: '温馨提示',
          message: '您是否支付成功？',
        }).then(()=>{
          this.check_order_status()
        })
        this.$cookies.remove('ordernum')
      }
    },
    methods:{
      choses(index){
        this.liIndex = index
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
        const that = this;
        const {liIndex,math_num_list} = this;
        // let config = {
        //     headers:{'Content-Type':'application/x-www-form-urlencoded'},
        // };
        let isweixins = isWeixin()?'wx':'M';

        that.$axios.post('/coin/create-recharge?type=new&amount='+math_num_list[liIndex]+'&source='+ isweixins).then(res=>{
          
           if(res.code == 200){
             const {type,url,no} = res.content;
<<<<<<< HEAD
             // 将订单号存入本地 方便回调之后使用
             window.localStorage.setItem("orderNo", no)
             
            //  Dialog.confirm({
            //     title: '温馨提示',
            //     message: '您是否支付成功？',
            //   }).then(()=>{
            //     that.check_order_status()
            //   })
=======
             console.log(res.content)
             console.log(type,url,no)

             this.$cookies.set('ordernum',no);
>>>>>>> 3d00793ac3578982e591076b71833be3b7141994
              
            location.href = url
             //window.open(url);
           }else {
            Toast({
              message:res.msg
            })
           }
        })
        
      },
      check_order_status(){
        //console.log(this.$data)
        let that = this
        let orderNo = this.$nuxt.$store.state.orderNo
        console.log(orderNo)
        if(this.timer){
          try{
            clearInterval(this.timer)
          }catch(err){
            console.log(err)
          }
        }
<<<<<<< HEAD
        if(!orderNo) return false;
        this.timer = setInterval(()=>{
          this.$axios.post(`/coin/check-order?order=${orderNo}`,{
            globalLoading: false
          }).then(res => {
=======
        if(!this.ordernum) return false;
        this.$data.timer = setInterval(()=>{
          this.$axios.post('/coin/check-order',{order:this.ordernum}).then(res => {
>>>>>>> 3d00793ac3578982e591076b71833be3b7141994
            console.log(res)
            if(res.code ==200 || res.code == 500){
              
              if(res.content.status == 1){
                clearInterval(that.timer)
                that.$nuxt.$store.commit('setOrderNo','')
                if(res.code == 200){
                Dialog.confirm({
                  title: '温馨提示',
                  message: '支付成功，您是否还需要继续充值？',
                  cancelButtonText: '继续充值',
                  confirmButtonText: '会员中心'
                }).then(()=>{
                  that.$router.replace('/user')
                })
                }
              }
            }
          })
        },3000)
      }
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
