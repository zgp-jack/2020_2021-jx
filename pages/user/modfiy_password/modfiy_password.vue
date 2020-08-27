<template>
  <div class="modfiy-password">
    <Header :title="'修改密码'"/>
    <div class="inner">
      <label for="">
        <span>验证码</span>
        <input type="password" style="display: none;">
        <input type="tel"  maxlength="6" v-model="catcap"  autocomplete="off" placeholder="请输入验证码" name="txtPassword">
        <p class="catcap" @click="capcome">{{btntext}}</p>
      </label>
      <label for="">
        <span>新的密码</span>
        <input type="password" style="display: none;">
        <input type="password"  maxlength="32" placeholder="请输入6-32位字符" v-model="news_pass" autocomplete='new-password' name="txtPassword">
      </label>
      <!-- <label for="">
        <span>确认密码</span>
        <input type="password" maxlength="32" placeholder="请再一次输入新密码" v-model="sure_pass">
      </label> -->
    </div>
    <p class="submit" @click="submit">确认</p>
  </div>
</template>  

<script>
import {Toast,Dialog} from 'vant';
import {formatDate,getRequestQuery} from '../../../static/utils/utils.js';
import {Callcap,nopass} from '../../../static/utils/validator';
import md5 from 'js-md5';
  export default{
    data(){
      return{
        catcap:'',
        news_pass:'',
        getcap:true,
        btntext:'获取验证码',
        number:60,
        phone:''
      }
    },
    mounted(){
      this.catcap = ''
      this.news_pass = ''
    },
    methods:{
      // 获取验证码
      capcome(){
        let that = this
        that.phone = that.$store.state.userinfo.tel
        if(!that.phone) return Toast('数据初始化中')
        let params = {phone:that.phone}
        if(!that.getcap) return false
        that.$axios.post('/index/send-message?'+getRequestQuery(params)).then(res=>{
            if (res.code == 200) {
                that.countDown()
            } else {
                Toast(res.msg);
            }
          })
      },
      countDown(){
          let that = this
          let timer = setInterval(()=>{
          if(that.number == 0){
            that.getcap = true
            that.btntext = '重新获取'
            that.number = 60
            clearInterval(timer)
          }else{
            if(that.getcap) that.getcap = false
            that.number -=1
            that.btntext = that.number+'s后获取'
          }            
          },1000)
      },
      // 提交
      submit(){
        let that = this
        // if(!that.catcap.length) return Toast('验证码不能为空')
        // if(!that.news_pass.length) return Toast('新密码不能为空')
        // if(!Callcap.pattern.test(that.catcap)) return Toast(Callcap.message)
        // if(!that.isOk) return Toast('新密码格式不正确')
        let time =formatDate(new Date(),'yyyyMMdd')
        let token = md5('APp_YUpAO_UseR_KeY'+that.phone+time).substring(0, 18)
        let data = {phone:that.phone,user_token:token,user_pass:that.news_pass,captcha:that.catcap}
        console.log(data);
        that.$axios.post('/user/app-reset',{data:JSON.stringify(data)}).then(res=>{
          console.log(res)
          if(res.code == 200) {
            Toast('修改成功')
            that.$router.go(-1)
          }else if(res.code == 3000){
            Toast('请获取验证码')
          }else if(res.code == 10902){
            Toast(res.msg)
          }
        })
      }
    },
    computed:{
      isOk(){
        if(nopass.pattern.test(this.news_pass)){
          return true
        }else{
          return false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .inner{
    padding-top: 1.01rem;
    // width: 7.5rem;
    height: auto;
    background-color: #fff;
    label{
      line-height: 1rem;
      display: block;
      font-size: 0.3rem;
      border-bottom: 1px solid #ccc;
      padding-left: 0.2rem;
      span{
        display: inline-block;
        width: 1.6rem;
      }
      input{
        width:3.3rem;
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
    background-color:#FFAA26;
    color: #fff;
    border: 0;
  }
  .catcap{
                display: inline-block;
                line-height:0.3rem;
                color: #fff;
                padding: 0.1rem;
                border-radius:0.08rem;
                font-size:0.28rem;
                background-color:rgb(255, 170, 38);
                text-align: center;
  }
</style>
