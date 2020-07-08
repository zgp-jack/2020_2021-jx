<template>
    <div>
       <Headers :title="title"/>
       <div class="father">
         <div class="title">余额充值</div>
         <div class="chose_box" >
           请选择充值数额
           <ul class="num_list">
              <li v-for="(item,i) in list" :key="i" :class="[i == liIndex?'cur':'']" @click="choses(i)">
                <p class="colors">{{item.money}}</p>
                <p>{{item.num}}鱼泡币</p>
              </li>
           </ul>
         </div>
         <div class="title">充值明细</div>
         <div class="recharge-details">
            <p v-for="(item,i) in lists" :key="i">
                {{item.title}}
              <span class="colors">{{item.num}}.00元</span>
            </p>
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
      this.$axios.get('/coin/recharge-ready').then(res=>{
        console.log(res)
      })
    },
    data(){
      return{
          title:'鱼泡币充值',
          list:[{money:'29元',num:29},{money:'29元',num:29},{money:'29元',num:29},{money:'29元',num:29},{money:'29元',num:29},{money:'29元',num:29},],
          lists:[{title:'充值金额',num:29.00},{title:'充值金额',num:29.00},{title:'充值金额',num:29.00},{title:'充值金额',num:29.00},{title:'充值金额',num:29.00},],
          liIndex:0
      }
    },
    methods:{
      choses(index){
        this.liIndex = index
      }
    }
}
</script>

<style lang='scss' scoped>
@import './recharge.scss'
</style>
