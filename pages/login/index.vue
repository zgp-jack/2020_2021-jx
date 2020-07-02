<template>
  <div>
      <Headers :title="title"/>
      <div class="father">
          <div class="form">
            <div class="form-row">
              <i class="iconfont"></i>
              <input type="text" id="username" placeholder="手机号码" autocomplete="off" v-model="users" maxlength="11" @input="user_name()">
            </div>
            <div class="form-row">
              <i class="iconfont"></i>
              <input type="password" id="username" placeholder="密码" autocomplete="off" v-model="password" @input="user_pass()">
            </div>
          </div>
          <div class="submit" :class="[userright&&pass?'active':'']" @click="Login()">登录</div>
          <div class="containr-res">
            <router-link to=''>快速注册</router-link>
            <router-link to='' class="con-fr">忘记密码?</router-link>
          </div>
          <div class="div-line">
            <span class="line-s">
                <span>遇到麻烦?</span>
            </span>
          </div>
          <div class="con_call">
            <router-link to=''>
                <i class="icon"></i>
                拨打客服热线：15608008605
            </router-link>
          </div>
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
  },
    data(){
        return{
          title:'登录_鱼泡机械',
          users:'',
          password:'',
          userright:false,
          pass:false
        }
    },
    methods:{
      user_name(){
        let userTest = /^1[34578]\d{9}$/
        let userName = this.users
        if(userName !='' && userTest.test(userName) && userName.length == 11){
          this.userright = true
        }else{
          this.userright = false
        }
      },
      user_pass(){
        let userPass = this.password
        if(userPass.length>=6){
          this.pass = true
        }else{
          this.pass = false
        }
      },
      Login(){
        if(this.userright && this.pass){
          this.$router.push('/user')
        }
      }
    }
}
</script>

<style lang='scss' scoped>
  @import './index.scss'  
</style>