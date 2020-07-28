<template>
  <div>
      <Headers :title="title"/>
      <div class="father">
          <div class="form">
            <div class="form-row">
              <i class="iconfont icon-touxiang"></i>
              <input type="text"  placeholder="请输入你的姓名" autocomplete="off" v-model="register_data.user_name"  maxlength="10" >
            </div>
            <div class="form-row">
              <i class="iconfont icon-shouji54"></i>
              <input type="number"  placeholder="请输入你的手机号" autocomplete="off" v-model="register_data.phone"  maxlength="11">
            </div>
            <div class="form-row">
              <i class="iconfont icon-yanzheng"></i>
              <input type="text"  placeholder="请输入短信验证码" v-model="register_data.captcha" autocomplete="off" maxlength="6" id="yanzheng">
              <div class="get-captcha" @click="getCaptcha">{{isCaptcha?'获取验证码':countDown+'s'}}</div>
            </div>
            <div class="form-row">
              <i class="iconfont icon-mima"></i>
              <input type="password"  placeholder="请输入设置您的密码" v-model="register_data.user_pass" autocomplete="off" maxlength="16">
            </div>
          </div>
          <div class="submit" @click="registerFn">注册</div>
          <div class="div-line">
            <span class="line-s">
                <span>遇到问题?</span>
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
import Headers from '../../components/header';
import {Dialog} from 'vant'
export default {
  components:{
    Headers
  },
  beforeMount(){
  },
    data(){
        return{
          title:'用户注册_鱼泡机械',
          userright:false,
          isCaptcha:true,
          register_data:{
            user_name:'',
            phone:'',
            captcha:'',
            user_pass:''
          },
          countDown:60,
          reg: /^[1][3,4,5,7,8,9][0-9]{9}$/
        }
    },
    methods:{
      //点击获取验证码
      getCaptcha(){
        if(this.isCaptcha==false) return false;
        let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        let timer = null;
        if(!reg.test(this.register_data.phone)){
          Dialog.alert({
            title:'提示',
            message:"请输入正确的电话号码",
          })
          return false;
        }
        //发送ajax请求

        this.isCaptcha = false;
        timer = setInterval(()=>{
          this.countDown--;
          if(this.countDown == 0){
            this.isCaptcha = true;
            clearInterval(timer)
          }
        },1000)
      },
      //点击注册
      registerFn(){
        //判断用户名
        if(this.register_data.user_name.length < 2 ) {
          this.alertFn('您输入的姓名格式不正确')
          return false
        }else if(!this.reg.test(this.register_data.phone)){
          this.alertFn('请输入正确的电话号码')
          return false;
        }else if(this.register_data.captcha < 6){
          this.alertFn('验证码不能少于6位数字')
          return false;
        }else if(this.register_data.user_pass < 6){
          this.alertFn('密码不能少于6位数字')
          return false;
        }
        //生成user_token
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        console.log(year,month,day)
        let {data} = {...this.register_data}

      },
      alertFn(msg){
        Dialog.alert({
          title:'提示',
          message:msg
        })
      }
    }
}
</script>

<style lang='scss' scoped>
  @import './index.scss'
</style>
