<template>
    <div>
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
        <div class="mark">提交反馈</div>
        <div class="msg">
            <p>
              <span>*</span>
               我们一直都在努力做的更好，只为能够给您提供更好的服务。为用户提供良好的线上机械租赁环境是我们奋斗目标！若是我们有什么做的不好的，请一定赐教。为提高沟通效率，建议您添加 客服微信 或者 拨打客服电话。 客服微信号：
               <span class="main_textc">13060002541</span>
               客服电话
               <span class="main_textc">15608008605</span>
            </p>
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
  data(){
    return{
        title:'意见反馈',
        test:''
    }
  }
}
</script>

<style lang='scss' scoped>
@import './face-book.scss'
</style>
