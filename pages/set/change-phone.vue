<template>
  <div>
    <Headers :title="title"/>
      <div class="father">
          <div class="input_line">
            <span>手机号</span>
            <div>
                <input type="tel" maxlength="11" placeholder="请输入手机号" v-model="phone" @input="PhoneInput">
            </div>
          </div>
          <div class="input_line">
            <span>验证码</span>
            <div class="captcha">
                <input type="text" maxlength="6" placeholder="请输入验证码" v-model="captcha">
                <p class="main_backc" @click="GetCaptcha">{{captcha_text}}</p>
            </div>
          </div>
          <div class="save" @click="SavePhone">确认新手机号</div>
      </div>
  </div>
</template>

<script>
import Headers from '../../components/header'
import {CellphoneCheck,Callcap,nopass} from '../../static/utils/validator';
import {getRequestQuery} from '../../static/utils/utils.js';
import {Toast} from 'vant';
export default {
  components:{
    Headers
  },
  data(){
    return{
      title:'修改手机号码',
      phone:'',
      captcha_pass:true,
      get_captcha:true,
      captcha:'',
      captcha_text:'获取验证码',
    }
  },
  methods:{
    PhoneInput(){
      if(CellphoneCheck.pattern.test(this.phone)){
        const params = {phone:this.phone}
        this.$axios.get('/user/check-phone',{params}).then(res=>{
            if(res.code == 10409){
              Toast(res.msg)
              this.captcha_pass = false
            }else{
              this.captcha_pass = true
            }
        })
      }
    },
    GetCaptcha(){
      if(!this.get_captcha) return false;
      if(!CellphoneCheck.pattern.test(this.phone)){
        Toast(CellphoneCheck.message)
        return false;
      }
      if(this.phone == this.$nuxt.$store.state.userinfo.tel){
        Toast('不能输入您正在使用的电话号码')
        return false;
      }
      if(!this.captcha_pass){
        Toast('该号码已注册')
        return false;
      }
      const params = {phone:this.phone}
      this.$axios.post('/index/send-message?'+getRequestQuery(params)).then(res=>{
          if(res.code == 200){
            this.countDown(60)
          }else{
            Toast(res.msg)
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
    SavePhone(){
      let phone = this.phone
      let captcha = this.captcha
      let user_phone = this.$nuxt.$store.state.userinfo.tel
          if(phone == user_phone){
            Toast('不能输入您正在使用的电话号码')
            return false;
          }
          if(!CellphoneCheck.pattern.test(phone)){
            Toast('请输入正确的电话号码')
            return false;
          }
          if(captcha.length<6 && !Callcap.pattern.test(captcha)){
            Toast(Callcap.message)
            return false;
          }
          this.$axios.post('/user/change-phone',{phone,captcha}).then(res=>{
            if(res.code == 200){
              Toast(res.msg)
              let Timeout = setTimeout(()=>{
                clearTimeout(Timeout)
                this.$router.go(-1)
              })
            }else{
              Toast(res.msg)
            }
          })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/css/style.scss';
.father{
  @include box_inner($bottom:0rem,$padding-bottom:0.5rem,$top:1.1rem);
  font-size:0.3rem;
    .input_line{
      height: 1rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 0.3rem;
          span{
            color: #555;
          }
          div{
            width:5rem;
              input{
                height:0.9rem;
                line-height:0.9rem;
                width: 100%;
              }
          }
          .captcha{
            display: flex;
            align-items: center;
            justify-content: space-between;
              input{
                width:2.6rem;
              }
              .main_backc{
                color: #fff;
                padding: 0.1rem;
                border-radius:0.08rem;
                font-size:0.32rem;
                background-color:$color;
                text-align: center;
              }
          }
    }
    .input_line:first-child{
      border-bottom: 1px solid #ddd;
    }
    .save{
      margin: 0.39rem auto auto;
      width: 6rem;
      text-align: center;
      border-radius: 0.16rem;
      line-height: 0.9rem;
      background-color: $color;
      color: #fff;
    }
}
</style>
