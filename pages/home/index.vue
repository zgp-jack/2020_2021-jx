<!-- 首页 -->
<template>
  <div class="container">
	  <div id="head">
      <div class="left_dom">
        <h1 class="fl">
          <img src="http://statics.zhaogongdi.com/common/logo_m.png" alt="">
        </h1>
        <div class="position fl">
          <i class="icon-dingwei iconfont" /><b>成都</b>
          <strong class="iconfont icon-youjiantou"></strong>
        </div>
      </div>
      <div class="right_dom fr">
        <a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.yupao.machine"></a>
      </div>
    </div>
    <div class="banner">

    </div>
    <div class="menus">
      
    </div>
    <Tarbar />
  </div>
</template>

<script>
import Tarbar from '../../components/tarbar'


export default {
  data(){
    return{

    }
  },
  components: {
    Tarbar: Tarbar
  },
  methods:{

  }
}
</script>

<style lang='scss'>
@import "./style.scss"

</style>
