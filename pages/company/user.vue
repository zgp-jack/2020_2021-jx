<template>
  <div>
    <Header :title='title'/>
      <div class="father">
          <div class="head">
            <img src="http://statics.zhaogongdi.com/xcx/company_background.jpg">
            <div class="company-base">
              <img src="http://statics.zhaogongdi.com/common/default_header.png" class="logo-server">
              <div>
                <p>{{data.company && data.company.cname}}</p>
                <div class="states">
                  <p v-if="company.check == 2">
                    <span class="iconfont icon-gongying"></span>
                    <span class="iconfont icon-VIP-tongguo" v-if="company.authen == 2"></span>
                  </p>
                  <p v-if="company.check==1">
                    企业信息审核中
                  </p>
                  <p v-if="company.check==0">
                    企业信息审核失败
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="fail" v-if="company.check_false || company.authen_false">
            {{company.check_false?'审核':'认证'}}失败原因：{{company.check_false}}
          </div>
          <div class="info-list">
              <div class="list-head">企业简介
                  <span @click="to_modify_company" class="modify-msg" v-if="company.check==0 || company.authen==0">修改企业信息</span>
              </div>
              <div class="describe">{{data.company && data.company.desc}}</div>
          </div>
          <div class="info-list">
            <div class="list-head">联系信息</div>
            <div class="list-body">
              <div>
                  <p>联系人</p>
                  <p class="linkman">{{data.company && data.company.uname}}</p>
              </div>
              <div>
                  <p>联系方式</p>
                  <span>{{data.company && data.company.contact}}</span>
              </div>
              <div>
                  <p>所在地区</p>
                  <p class="linkman">{{data.company && data.company.area_text}}</p>
              </div>
              <div>
                  <p>详细地址</p>
                  <p class="linkman">{{data.company && data.company.addr}}</p>
              </div>
              <div>
                  <p>机械规模</p>
                  <p class="linkman">{{data.company && companyScale[data.company.scale-1]}}</p>
              </div>
            </div>
          </div>
          <div class="info-list">
            <div class="list-head authenticate">
              <p>认证信息</p>
              <p>{{company.authen==0?'(信息审核失败)':'(认证信息审核中)'}}</p>
            </div>
            <div class="image-list">
              <div class="image-item">
                <p>营业执照</p>
                <img @click="showImage(licenses.license.server)" :src="licenses.license && licenses.license.server">
                <p>身份证正面</p>
                <img @click="showImage(licenses.idCard.server)" :src="licenses.idCard && licenses.idCard.server">
                <p>手持身份证</p>
                <img @click="showImage(licenses.handCard.server)" :src="licenses.handCard && licenses.handCard.server">
              </div>
            </div>
          </div>
  </div>
 </div>
</template>

<script>
import Header from '../../components/header';
import { ImagePreview,Dialog  } from 'vant';
import {callPhoneFn} from '../../static/utils/utils.js'
export default {
    beforeMount(){
      //是否是跳转页面带来的数据
      if(this.$route.params.data){
        this.data = {...this.$route.params.data}
        this.company = {...this.$route.params.data.company}
        this.licenses = {...this.$route.params.data.licenses}

      }else{
        this.getmine();
      }
      //是否要弹框打电话
      if(this.$route.params.isCall){
        let tel = this.$route.params.isCall;
        callPhoneFn(tel)
      }
    },
    components:{
      Header,
      [ImagePreview.Component.name]: ImagePreview.Component,
      [Dialog.Component.name]: Dialog.Component,
    },
    data(){
      return{
        title:'我的企业',
        companyScale:['<20', '20~39', '40~59', '60~99', '>=100'],
        data:{},
        company:{},
        licenses:{},
        idCard:'',
        handCard:'',
      }
    },
    methods:{
      //获取数据
      getmine(){
        this.$axios.post('/company/mine').then(res=>{
          if(res.code == 200){
            this.data = {...res.content}
            this.company = {...res.content.company}
            this.licenses = {...res.content.licenses}
          }else if(res.code == 505){
            this.$router.replace("/user/company")
          }

        })
      },
      showImage(src){
        ImagePreview([src])
      },
      //去修改页面
      to_modify_company(){
        this.$router.push('/user/modfiy_company/modfiy_company')
      }
    }
}
</script>

<style lang='scss' scoped>
@import './user.scss'
</style>
