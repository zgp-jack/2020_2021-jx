<template>
  <div>
      <Headers :title="title"/>
      <div class="father">
        <div class="welfare">
            <div class="welfare-content" v-for="(item,i) in list" :key="i" v-if="!item.is_overdue">
                <div class="welfare-one">
                    <img src="../../assets/img/welfare/yellow.png">
                    <div class="welfare-text">
                         <p>
                            赠
                            <span>{{item.welfare.value}}</span>
                         </p>
                        <p>
                            鱼泡币
                        </p>
                    </div>
                </div>
                 <div class="welfare-two">
                     <div class="two-title">
                       {{item.welfare.name}}
                     </div>
                     <div class="two-context">
                         <span>{{item.welfare.content}}</span>
                         <span style="color:#FFA926;margin-left:0.2rem;" @click="goHome">去使用</span>
                     </div>
                     <div class="two-date">
                         有效期至:{{item.out_time}}
                     </div>
                 </div>
            </div>
            <div class="welfare-content" v-for="(item,i) in list" :key="i" v-if='item.is_overdue'>
                <div class="welfare-one">
                    <img src="../../assets/img/welfare/grey.png">
                    <div class="welfare-text">
                         <p>
                            赠
                            <span>{{item.welfare.value}}</span>
                         </p>
                        <p>
                            鱼泡币
                        </p>
                    </div>
                </div>
                 <div class="welfare-two ">
                     <img src="../../assets/img/welfare/guoqi.png" id="guoqi">
                     <div class="two-title twos-color">
                         {{item.welfare.name}}
                     </div>
                     <div class="two-context">
                         <span class="twos-color">{{item.welfare.content}}</span>
                     </div>
                     <div class="two-date">
                         有效期至: {{item.out_time}}
                     </div>
                 </div>
            </div>
            <emptyMsg :empty2='true' v-if = '!list.length'/>
        </div>
      </div>
  </div>
</template>

<script>
import Headers from '../../components/header'
import emptyMsg from '../../components/emptyMsg/index'
export default {
    beforeMount(){
      this.getWelfare()
    },
    components:{
        Headers,
        emptyMsg
    },
    data(){
        return{
            title:'我的福利',
            list:[]
        }
    },
    methods:{
      // 获取数据
       getWelfare(){
          this.$axios.post('/user-welfare/welfare-list').then(res=>{
              this.list = res.content
              console.log(this.list)
          })
       },
       //点击去使用
       goHome(){
         this.$router.push("/home")
       }
    }
}
</script>

<style lang='scss' scoped>
@import './welfare.scss';
</style>
