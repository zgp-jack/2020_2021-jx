<template>
    <div>
      <Copy :Copys = 'Copys' :show = 'show' @hander = 'hander'/>
      <Headers :title="title"/>
      <div class="father">
        <div class="form">
            <div class="textarea">
              <textarea class="texts" maxlength="120" placeholder="留下您的意见或建议" v-model="test"></textarea>
              <span class="sishu">{{test.length}}/120</span>
            </div>
            <div class="img">
              <div class="upload_control">
                <img src="http://statics.zhaogongdi.com/xcx/camera.png">
                <span>照片</span>
              </div>
            </div>
        </div>
        <div class="mark" @click="submit">提交反馈</div>
        <div class="msg">
            <p>
              <span>*</span>
               我们一直都在努力做的更好，只为能够给您提供更好的服务。为用户提供良好的线上机械租赁环境是我们奋斗目标！若是我们有什么做的不好的，请一定赐教。为提高沟通效率，建议您添加 客服微信 或者 拨打客服电话。 客服微信号：
               <span class="main_textc"  @click="Copy">{{Copys}}</span>
               客服电话
               <span class="main_textc" @click="tel(phone)" >{{phone}}</span>
            </p>
        </div>
      </div>
    </div>
</template>

<script>
import Headers from '../../components/header'
import Copy from '../../components/Copy'
import {callPhoneFn,Copynum} from '../../static/utils/utils'
import {Toast} from 'vant'
export default {
  components:{
    Headers,
    Copy
  },
  data(){
    return{
        title:'意见反馈',
        test:'',
        submits:false,
        phone:15608008605,
        Copys:13060002541,
        show:false
    }
  },
  methods:{
    submit(){
      if(this.submits){
        Toast('您刚刚已经提交过一次了，短时间内不能重复操作')
        return false
      }
      if(this.test.length<15){
        Toast('至少要输入不少于15个字才能进行提交')
        return false
      }
      this.$axios.post('/user/face-book',{msg:this.test}).then(res=>{
        if(res.code == 200){
          Toast('信息提交成功，感谢您提供的宝贵意见，我方会尽快处理的');
          this.submits = true
        }else{
          Toast(res.msg)
        }
        const that = this
        let timeout = setTimeout(function(){
            that.$router.go(-1)
            clearTimeout(timeout)
        },2000)
      })
    },
    // 打电话
    tel(phone){
      callPhoneFn(phone)
    },
    Copy(){
      this.show = true
      Copynum(this,this.Copys)
    },
    hander(hide){
        this.show = hide
    }
  }
}
</script>

<style lang='scss' scoped>
@import './face-book.scss'
</style>
