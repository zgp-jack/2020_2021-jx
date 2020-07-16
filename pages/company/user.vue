<template>
  <div>
    <Header :title='title'/>
      <div class="father">
          <div class="head">
            <img src="http://statics.zhaogongdi.com/xcx/company_background.jpg">
            <div class="company-base">
              <img src="http://statics.zhaogongdi.com/common/default_header.png" class="logo-server">
              <div>
                <p>啥大萨达阿萨德</p>
                <p>
                  11
                </p>
              </div>
            </div>
          </div>
          <div class="info-list">
              <div class="list-head">企业简介</div>
              <div class="describe">啊实打实大师AAS</div>
          </div>
          <div class="info-list">
            <div class="list-head">联系信息</div>
            <div class="list-body">
              <div>
                  <p>联系人</p>
                  <p class="linkman">阿萨大大</p>
              </div>
              <div>
                  <p>联系方式</p>
                  <span>223121</span>
              </div>
              <div>
                  <p>所在地区</p>
                  <p class="linkman">大多数</p>
              </div>
              <div>
                  <p>详细地址</p>
                  <p class="linkman">撒大声地</p>
              </div>
              <div>
                  <p>机械规模</p>
                  <p class="linkman">{{companyScale[0]}}</p>
              </div>
            </div>
          </div>
          <div class="info-list">
            <div class="list-head authenticate">
              <p>认证信息</p>
              <p>(认证信息审核中)</p>
            </div>
            <div class="image-list">
              <div class="image-item">
                <p>营业执照</p>
                <img src="http://statics.zhaogongdi.com/images/wx-xcx/20200716/08XuMT1594893601.jpeg">
              </div>
            </div>
          </div>
  </div>
 </div>
</template>

<script>
import Header from '../../components/header'
export default {
    created(){
      this.getmine()
    },
    components:{
      Header
    },
    data(){
      return{
        title:'我的企业',
        companyScale:['<20', '20~39', '40~59', '60~99', '>=100'],
      }
    },
    methods:{
      // 获取数据
      getmine(){
        this.$axios.post('/company/mine').then(res=>{
          console.log(res)
        })
      }
    }
}
</script>

<style lang='scss' scoped>
@import './user.scss'
</style>
