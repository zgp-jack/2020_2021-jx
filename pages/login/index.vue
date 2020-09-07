<template>
  <div>
      <Header :title="title" :go_home_page="go_home_page"/>
      <div class="father">
          <div class="form">
            <div class="form-row">
              <i class="icon-shouji"></i>
              <input type="tel" id="username" oninput="value=value.replace(/[^\d]/g,'')" placeholder="手机号码" autocomplete="off" v-model="users" maxlength="11" @input="user_name()">
            </div>
            <div class="form-row">
              <i class="icon-password"></i>
              <input type="password" id="username" placeholder="密码" autocomplete="off" v-model="password" @input="user_pass()">
            </div>
          </div>
          <div class="submit" :class="[userright&&pass?'active':'noReady']" @click="Login()">登录</div>
          <div class="containr-res">
            <router-link to='/register'>快速注册</router-link>
            <router-link to='/reset' class="con-fr" >忘记密码?</router-link>
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
import {setCookie,GetUser,whetherLogin ,isWeixin} from '../../static/utils/utils.js';
import {Toast} from 'vant';
import {CellphoneCheck,nopass} from '../../static/utils/validator';
export default {
    data(){
        return{
          title:'登录_鱼泡机械',
          users:'',
          password:'',
          userright:false,
          pass:false,
          go_home_page:false,
          go_home:false
        }
    },
    beforeMount() {
      if(document.cookie.includes("token")) this.$router.replace('/user');

    },      
    created() {
      this.go_home_page = this.$route.query.signout;
      this.go_home = this.$route.query.noLogin;
    },
    methods:{
      user_name(){
        let userTest = /^1[34578]\d{9}$/
        let userName = this.users
        if(userName !='' && CellphoneCheck.pattern.test(userName) && userName.length == 11){
          this.userright = true
        }else{
          this.userright = false
        }
      },
      user_pass(){
        let userPass = this.password
        if(nopass.pattern.test(userPass)){
          this.pass = true
        }else{
          this.pass = false
        }
      },
      Login(){
        const that = this;
        let Pass = this.password;
        let psd = md5(Pass)
        this.$axios.post('/user/app-login',{phone:this.users,passkey:this.password}).then(res=>{
          
          if(res.code==200){
            const {token,id} = res.content;
            this.$cookies.set('token',token);
            this.$cookies.set('id',id);
            Toast('登录成功')
            const callback = ()=>{
              if(that.go_home_page){
                that.$router.go(-2);
              }else if(that.go_home){
                 that.$router.go(-1);
              }else{
                that.$router.replace('/user')
              }
            }
            GetUser(that,callback)
          }else{
            Toast(res.msg)
          }
        })
      },
      call_costum(tel){
        window.location.href = "tel:"+tel;
      },
    }
}
</script>

<style lang='scss' scoped>
  @import './index.scss'
</style>
