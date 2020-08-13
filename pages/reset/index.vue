<template>
  <div>
      <Headers :title="title"/>
      <div class="father">
          <div class="form">
            <div class="form-row">
              <i class="iconfont icon-shouji54"></i>
              <input type="tel"  placeholder="请输入你的手机号" autocomplete="off" v-model="tel" maxlength="11">
            </div>
            <div class="form-row">
              <i class="iconfont icon-yanzheng"></i>
              <input type="text"  placeholder="请输入短信验证码" autocomplete="off" v-model="check_code" maxlength="6" id="yanzheng">
              <div class="get-captcha" @click="getCheck">{{captcha_text}}</div>
            </div>
            <div class="form-row">
              <i class="iconfont icon-mima"></i>
              <input type="password"  placeholder="请输入设置您的密码" autocomplete="off" v-model="password">
            </div>
          </div>
          <div class="submit" @click="sub">提交</div>
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
import Headers from '../../components/header'
import md5 from 'js-md5';
import {formatDate} from '../../static/utils/utils.js';
import {Toast,Dialog} from 'vant';
import {CellphoneCheck,Callcap,nopass} from '../../static/utils/validator';
export default {
  components:{
    Headers
  },
  beforeMount(){
  },
    data(){
        return{
          title:'忘记密码_鱼泡机械',
          users:'',
          password:'',
          userright:false,
          pass:false,
          tel:'',
          check_code:'',
          captcha_text:'获取验证码',
          get_captcha:true,
          phoneChat:true
        }
    },
    methods:{
      sub(){
        if(!CellphoneCheck.pattern.test(this.tel)){
          this.alertFn('请输入正确的电话号码')
          return false;
        }else if(this.check_code < 6 && !Callcap.pattern.test(this.check_code)){
          this.alertFn('验证码格式错误')
          return false;
        }else if(this.password < 6 && !nopass.pattern.test(this.password)){
          this.alertFn('密码格式错误')
          return false;
        }
        let token = this.tokenss()
        let data = {phone:this.tel,user_token:token,user_pass:this.password,captcha:this.check_code}
        let datas = JSON.stringify(data)
        this.$axios.post('/user/app-reset',{data:JSON.stringify(data)}).then(res =>{
          const {code} = res
          if(code == 200){
            Toast('修改成功')
            this.$router.replace('/login')
          }else{
            Toast('修改失败请检查您的手机号和验证码')
          }
        })
      },
      getCheck(){
        if(!this.get_captcha) return false;
          let token = this.tokenss()
          const params = {phone:this.tel,token,mode:1}
          this.$axios.get('/user/get-captcha',{params}).then(res=>{
          if(res.code == 200){
            this.countDown(60)
          }else{
            Toast('您输入的格式有误')
          }
      })
      },
        countDown(index){
        if(index == 0){
          this.get_captcha = true
          this.captcha_text = '重新获取'
        }else{
          if(this.get_captcha) this.get_captcha = false
          this.captcha_text = index+'s后获取'
          setTimeout(()=>{
            this.countDown(index-1)
          },1000)
        }
    },
    alertFn(msg){
        Dialog.alert({
          title:'提示',
          message:msg
        })
      },
      tokenss(){
        let time =formatDate(new Date(),'yyyyMMdd')
        let token = md5('APp_YUpAO_UseR_KeY'+this.tel+time).substring(0, 18)
        return token
      }
    }
}
</script>

<style lang='scss' scoped>
  @import './index.scss'
</style>
