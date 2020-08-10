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
              <input type="tel"  placeholder="请输入你的手机号" autocomplete="off" v-model="register_data.phone"  maxlength="11">
            </div>
            <div class="form-row">
              <i class="iconfont icon-yanzheng"></i>
              <input type="text"  placeholder="请输入短信验证码" v-model="register_data.captcha" autocomplete="off" maxlength="6" id="yanzheng" >
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
import {Dialog,Toast} from 'vant'
import md5 from 'js-md5';
import {formatDate} from '../../static/utils/utils.js';
import {CellphoneCheck,Callcap,nopass} from '../../static/utils/validator';
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
          reg: /^[1][3,4,5,7,8,9][0-9]{9}$/,
          newdatas:''
        }
    },
    methods:{
      //点击获取验证码
      getCaptcha(){
        if(this.isCaptcha==false) return false;
        let timer = null;
        if(!CellphoneCheck.pattern.test(this.register_data.phone)){
          Dialog.alert({
            title:'提示',
            message:"请输入正确的电话号码",
          })
          return false;
        }
        //发送ajax请求
        // this.isCaptcha = false;
        timer = setInterval(()=>{
          if(this.countDown>0) this.countDown--;
          if(this.countDown == 0){
            this.isCaptcha = true;
            clearInterval(timer)
          }
        },1000)
        let token = this.tokenss()
        const params = {phone:this.register_data.phone,token,mode:0}
        this.$axios.get('/user/get-captcha',{params}).then(res=>{
          if(res.code == 200){
            alert('发送成功')
          }else{
            Toast(res.msg)
          }
      })
      },
      //点击注册
      registerFn(){
        //判断用户名
        if(this.register_data.user_name.length < 2 ) {
          this.alertFn('您输入的姓名格式不正确')
          return false
        }else if(!CellphoneCheck.pattern.test(this.register_data.phone)){
          this.alertFn('请输入正确的电话号码')
          return false;
        }else if(this.register_data.captcha < 6 && !Callcap.pattern.test(this.register_data.captcha)){
          this.alertFn(Callcap.message)
          return false;
        }else if(this.register_data.user_pass < 6 && !nopass.pattern.test(this.register_data.user_pass)){
          this.alertFn(Callcap.message)
          return false;
        }
        //生成user_token
        // let date = new Date();
        // let year = date.getFullYear();
        // let month = date.getMonth()+1;
        // let day = date.getDate();
        // let {data} = {...this.register_data}
        let token = this.tokenss()
        let data = {phone:this.register_data.phone,user_token:token,user_name:this.register_data.user_name,user_pass:this.register_data.user_pass,captcha:this.register_data.captcha}
        let datas = JSON.stringify(data)
        this.$axios.post('/user/app-register',{data:JSON.stringify(data)}).then(res =>{
          const {code} = res
          if(code == 200){
            Toast('注册成功')
            this.$router.replace('/login')
          }else{
            Toast(res.msg)
          }
        })


      },
      alertFn(msg){
        Dialog.alert({
          title:'提示',
          message:msg
        })
      },
      tokenss(){
         let time =formatDate(new Date(),'yyyyMMdd')
         let token = md5('APp_YUpAO_UseR_KeY'+this.register_data.phone+time).substring(0, 18)
         return token
      }
    }
}
</script>

<style lang='scss' scoped>
  @import './index.scss'
</style>
