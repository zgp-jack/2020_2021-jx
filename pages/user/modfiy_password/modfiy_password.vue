<template>
  <div class="modfiy-password">
    <Header :title="'修改密码'"/>
    <div class="inner">
      <label for="">
        <span>原密码</span>
        <input type="password" maxlength="32" placeholder="请输入当前正在使用密码" v-model="origin_pass">
      </label>
      <label for="">
        <span>新的密码</span>
        <input type="password" maxlength="32" placeholder="请输入6-32位字符" v-model="news_pass">
      </label>
      <label for="">
        <span>确认密码</span>
        <input type="password" maxlength="32" placeholder="请再一次输入新密码" v-model="sure_pass">
      </label>
    </div>
    <p class="submit" @click="submit" :style="{'backgroundColor':isOk?'#FFAA26':'','color':isOk?'#fff':'#888'}">确认</p>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        origin_pass:'',
        news_pass:'',
        sure_pass:''
      }
    },
    methods:{
      submit(){
        if(!this.isOk) return false;
        console.log(this.origin_pass,this.news_pass,this.sure_pass)
      }
    },
    computed:{
      isOk(){
        if(this.origin_pass.length > 6 && this.news_pass.length > 6 && this.sure_pass.length > 6){
          return true
        }else {
          return false;
        }

      }
    }
  }
</script>

<style lang="scss">
  .inner{
    padding-top: 1.01rem;
    width: 7.5rem;
    height: auto;
    background-color: #fff;
    label{
      height: 0.8rem;
      line-height: 0.8rem;
      display: block;
      font-size: 0.3rem;
      border-bottom: 1px solid #ccc;
      padding-left: 0.2rem;
      span{
        display: inline-block;
        width: 1.6rem;
      }
      &:nth-of-type(3){
        border: none;
      }
    }
  }
  .submit{
    width: 6rem;
    height: 0.8rem;
    border-radius: 0.8rem;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #888;
    margin: 0.5rem auto;
  }
</style>
