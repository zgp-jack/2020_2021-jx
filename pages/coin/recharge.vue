<template>
    <div>
       <Headers :title="title"/>
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
              <span class="colors">{{item}}.00元</span>
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
         <div class="recharge">确认付款</div>
       </div>
    </div>
</template>

<script>
import Headers from '../../components/header'
export default {
    components:{
      Headers
    },
    created(){
      this.recharge()
    },
    data(){
      return{
          title:'鱼泡币充值',
          math_num_list:[],
          recharge_given:[],
          liIndex:0,
          rehIndex:0
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
           const {math_num_list,recharge_given} = res.content
            this.math_num_list = [...math_num_list]
            this.recharge_given = [...recharge_given]
        })
      }
    },
    filters: {
      capitalize: function (value) {
         return value.toFixed(2)
  }
}
}
</script>

<style lang='scss' scoped>
@import './recharge.scss'
</style>
