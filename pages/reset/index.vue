<template>
  <div>
      <Headers :title="title"/>
      <div class="father">
          <div class="form">
            <div class="form-row">
              <i class="iconfont icon-shouji54"></i>
              <input type="number"  placeholder="请输入你的手机号" autocomplete="off" v-model="tel" maxlength="11">
            </div>
            <div class="form-row">
              <i class="iconfont icon-yanzheng"></i>
              <input type="text"  placeholder="请输入短信验证码" autocomplete="off" v-model="check_code" maxlength="6" id="yanzheng">
              <div class="get-captcha" @click="getCheck">{{captcha_text}}</div>
            </div>
            <div class="form-row">
              <i class="iconfont icon-mima"></i>
              <input type="password"  placeholder="请输入设置您的密码" autocomplete="off" v-model="password" maxlength="16">
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
import {Toast} from 'vant';
export default {
  components:{
    Headers
  },
  created(){
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
          get_captcha:true
        }
    },
    methods:{
      sub(){
        let time =formatDate(new Date(),'yyyy-MM-dd')
        let token = md5('APp_YUpAO_UseR_KeY'+this.tel+time).substring(0, 18)
        let data = {phone:this.tel,user_token:'',user_pass:this.password,captcha:this.check_code}
        let datas = JSON.stringify(data)
        console.log(datas)
        this.$axios.post('/user/app-reset',{datas}).then(res =>{
          console.log(res)
        })
      },
      getCheck(){
        console.log(1)
        if(!this.get_captcha) return false;
          const params = {phone:this.tel}
          this.$axios.get('/index/send-message',{params}).then(res=>{
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
    }
    }
}
</script>

<style lang='scss' scoped>
  @import './index.scss'
</style>
