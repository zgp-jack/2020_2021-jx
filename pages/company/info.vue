<template>
  <div>
      <Header :title='title'/>
      <div class="father">
          <div class="head">
            <img src="http://statics.zhaogongdi.com/xcx/company_background.jpg">
            <div class="company-base">
              <img src="http://statics.zhaogongdi.com/common/default_header.png" class="logo-server">
              <div>
                <p>接电话东南</p>
                <p>
                  <img src="http://statics.zhaogongdi.com/xcx/icon_issue.png">
                  <img src="http://statics.zhaogongdi.com/xcx/icon_issue_v.png">
                </p>
              </div>
            </div>
          </div>
          <div class="info-list">
              <div class="list-head">企业简介</div>
              <div class="describe">啊飒飒大师大师sad</div>
          </div>
          <div class="info-list">
            <div class="list-head">联系信息</div>
            <div class="list-body">
              <div>
                  <p>联系人</p>
                  <p class="linkman">达瓦达瓦大</p>
              </div>
              <div>
                  <p>联系方式</p>
                  <p class="contact">1656858****</p>
                  <button class="contact_chakan">查看完整号码</button>
              </div>
              <div>
                  <p>所在地区</p>
                  <p class="linkman">安徽帮打</p>
              </div>
              <div>
                  <p>详细地址</p>
                  <p class="linkman">达瓦达瓦大大的</p>
              </div>
              <div>
                  <p>机械规模</p>
                  <p class="linkman">< 20</p>
              </div>
            </div>
          </div>
         <div class="product-list">
           <div class="headess">
             <div :class="[barshow?'cur':'']" @click="machinery">出租机械</div>
             <div :class="[!barshow?'cur':'']" @click="second_hand">二手机械</div>
           </div>
           <div class="list">
             <emptyMsg  :empty2='true' v-if='More'/>
           </div>
         </div>
      </div>
  </div>
</template>

<script>
import Header from '../../components/header'
import emptyMsg from '../../components/emptyMsg/index'
export default {
  components:{
    Header,
    emptyMsg
  },
  data(){
    return{
      title:'供应商详情',
      More:true,
      barshow:true
    }
  },
  methods:{
    machinery(){
      this.barshow = true
    },
    second_hand(){
      this.barshow = false
    }
  }
}
</script>

<style lang='scss' scoped>
@import './info.scss'
</style>
