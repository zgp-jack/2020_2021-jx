<template>
  <div>
      <Header :title="title"/>
      <div class="father">
          <div class="form">
            <div class="form-row">
              <i class="iconfont icon-shouji54"></i>
              <input type="number" id="username" placeholder="手机号码" autocomplete="off" v-model="users" maxlength="11" @input="user_name()">
            </div>
            <div class="form-row">
              <i class="iconfont icon-mima"></i>
              <input type="password" id="username" placeholder="密码" autocomplete="off" v-model="password" @input="user_pass()">
            </div>
          </div>
          <div class="submit" :class="[userright&&pass?'active':'noReady']" @click="Login()">登录</div>
          <div class="containr-res">
            <router-link to='/register'>快速注册</router-link>
            <router-link to='/reset' class="con-fr">忘记密码?</router-link>
          </div>
          <div class="div-line">
            <span class="line-s">
                <span>遇到麻烦?</span>
            </span>
          </div>
          <div class="con_call" @click="call_costum(15608008605)">
            <router-link to='' >
                <i class="icon"></i>
                拨打客服热线：15608008605
            </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
import {setCookie} from '../../static/utils/utils.js';
import {Toast} from 'vant';
export default {
  created(){
    if(document.cookie.includes("ssoToken")){
      this.$router.push("/home")
    }
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
        let Pass = this.password
        let psd = md5(Pass)
        this.$axios.post('/user/app-login',{phone:this.users,passkey:this.password}).then(res=>{
          if(res.code==200){
            setCookie('ssoToken',res.content.token);
            Toast({message:'登录成功',duration:200,onClose:()=>{
              this.$router.go(-1);
            }})
          }else if(res.code == 500){
            Toast(res.msg)
          }
        })
      },
      call_costum(tel){
        console.log(12)
        window.location.href = "tel:"+tel;
      }
    }
}
</script>

<style lang='scss' scoped>
  @import './index.scss'
</style>
