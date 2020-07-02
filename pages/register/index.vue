<template>
  <div>
      <Headers :title="title"/>
      <div class="father">
          <div class="form">
            <div class="form-row">
              <i class="iconfont"></i>
              <input type="text"  placeholder="请输入你的姓名" autocomplete="off" v-model="users" maxlength="10" >
            </div>
            <div class="form-row">
              <i class="iconfont"></i>
              <input type="text"  placeholder="请输入你的手机号" autocomplete="off" v-model="password" maxlength="11">
            </div>
            <div class="form-row">
              <i class="iconfont"></i>
              <input type="text"  placeholder="请输入短信验证码" autocomplete="off" v-model="password" maxlength="6" id="yanzheng">
              <div class="get-captcha">获取验证码</div>
            </div>
            <div class="form-row">
              <i class="iconfont"></i>
              <input type="password"  placeholder="请输入设置您的密码" autocomplete="off" v-model="password" maxlength="16">
            </div>
          </div>
          <div class="submit">注册</div>
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
export default {
  components:{
    Headers
  },
  created(){
  },
    data(){
        return{
          title:'用户注册_鱼泡机械',
          users:'',
          password:'',
          userright:false,
          pass:false
        }
    },
    methods:{
            
    }
}
</script>

<style lang='scss' scoped>
  @import './index.scss'  
</style>