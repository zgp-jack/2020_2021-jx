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
              <div class="get-captcha">获取验证码</div>
            </div>
            <div class="form-row">
              <i class="iconfont icon-mima"></i>
              <input type="password"  placeholder="请输入设置您的密码" autocomplete="off" v-model="password" maxlength="16">
            </div>
          </div>
          <div class="submit">提交</div>
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
          title:'忘记密码_鱼泡机械',
          users:'',
          password:'',
          userright:false,
          pass:false,
          tel:'',
          check_code:''
        }
    },
    methods:{

    }
}
</script>

<style lang='scss' scoped>
  @import './index.scss'
</style>
