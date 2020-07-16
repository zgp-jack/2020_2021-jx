<template>
    <div>
        <Header :title='title'/>
        <div class="father">
            <div class="union-title">企业信息</div>
            <div class="from-row">
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>企业全称</div>
                    <div class="row-right">
                        <input type="text" ref="company_name" class="textInput" maxlength="30" placeholder="请输入企业全称" v-model="company_name">
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left">企业logo</div>
                    <div class="row-right">
                      <van-uploader :after-read="uploadLogo"  multiple :max-count="1" v-show="!upload_logo.length">
                        <span class="file_mk">上传图片</span>
                      </van-uploader>
                      <div class="uploaded_img" v-show="upload_logo.length">
                        <span class="iconfont icon-cuo" @click="deleteImg('upload_logo')"></span>
                        <img :src="[upload_logo[0] ? upload_logo[0].src:'']" @click="previewImg(upload_logo[0].src)" alt="" >
                      </div>
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>所在地区</div>
                    <div class="row-right">
                        <span class="textInput">请选择企业所在地</span>
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>详细地址</div>
                    <div class="row-right">
                        <input type="text" ref="detail_addr" class="textInput" v-model="detail_addr" placeholder="区镇\街道\门牌号">
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>机械规模</div>
                    <div class="row-right">
                        <select name="scale" class="textInput" v-model="number">
                            <option selected value="1"> < 20台 </option>
                            <option value="2">20~39台</option>
                            <option value="3">40~59台</option>
                            <option value="4">60~99台</option>
                            <option value="5">>=100台</option>
                        </select>
                    </div>
                </div>
                <div class=" desc-row">
                    <div class="row-left"><span class="f-red">*</span>企业介绍</div>
                    <textarea class="desc" ref="detail_company" maxlength="120" v-model="detail_company" placeholder="请介绍一下贵公司业务情况"></textarea>
                </div>
            </div>
            <div class="union-title">联系方式</div>
            <div class="from-row">
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>联系人</div>
                    <div class="row-right">
                         <input type="text" ref="company_username" class="textInput" v-model="company_username" maxlength="10" placeholder="企业法人姓名">
                    </div>

                </div>
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>联系电话</div>
                    <div class="row-right">
                         <input type="text" class="textInput" ref="company_tel" v-model="company_tel" maxlength="11" placeholder="企业联系电话">
                    </div>

                </div>
            </div>
            <div class="union-title">企业认证(上传企业认证资质获得鱼泡专属认证)</div>
            <div class="from-row">
                <div class="corm-row">

                    <div class="row-left"><span class="f-red">*</span>营业执照</div>
                    <div class="row-right">
                     <van-uploader :after-read="uploadLicense" multiple :max-count="1"  v-show="!upload_license.length">
                       <span class="file_mk">上传图片</span>
                     </van-uploader>
                     <div class="uploaded_img" v-show="upload_license.length">
                       <span class="iconfont icon-cuo" @click="deleteImg('upload_license')"></span>
                       <img :src="[upload_license[0] ? upload_license[0].src:'']" @click="previewImg(upload_license[0].src)" alt="" >
                     </div>
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left">机构代码</div>
                    <div class="row-right">
                      <van-uploader :after-read="uploadMechanism" multiple :max-count="1" v-show="!upload_mechanism.length">
                        <span class="file_mk">上传图片</span>
                      </van-uploader>
                      <div class="uploaded_img" v-show="upload_mechanism.length">
                        <span class="iconfont icon-cuo" @click="deleteImg('upload_mechanism')"></span>
                        <img :src="[upload_mechanism[0] ? upload_mechanism[0].src:'']" @click="previewImg(upload_mechanism[0].src)" alt="" >
                      </div>
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left">税务登记证</div>
                    <div class="row-right">
                      <van-uploader :after-read="uploadRevenue" multiple :max-count="1" v-show="!upload_revenue.length">
                        <span class="file_mk">上传图片</span>
                      </van-uploader>
                      <div class="uploaded_img" v-show="upload_revenue.length">
                        <span class="iconfont icon-cuo" @click="deleteImg('upload_revenue')"></span>
                        <img :src="[upload_revenue[0] ? upload_revenue[0].src:'']" @click="previewImg(upload_revenue[0].src)" alt="" >
                      </div>
                    </div>
                </div>
            </div>
             <div class="union-title">上传身份证照片(上传企业法人身份证)</div>
             <div class="from-row">
                 <div class="id_card">
                    <van-uploader :after-read="uploadIdCard" multiple :max-count="1" v-show="!upload_id_card.length">
                      <div class="one">
                          <div></div>
                          <p>身份证正面照</p>
                      </div>
                    </van-uploader>
                    <div class="uploaded_img" v-show="upload_id_card.length">
                      <span class="iconfont icon-cuo" @click="deleteImg('upload_id_card')"></span>
                      <img :src="[upload_id_card[0] ? upload_id_card[0].src:'']" @click="previewImg(upload_id_card[0].src)" alt="" >
                    </div>
                    <van-uploader :after-read="uploadHandCard" v-show="!upload_hand_card.length" multiple :max-count="1">
                      <div class="two">
                          <div></div>
                          <p>手持身份证照</p>
                      </div>
                    </van-uploader>
                    <div class="uploaded_img" v-show="upload_hand_card.length" >
                      <span class="iconfont icon-cuo" @click="deleteImg('upload_hand_card')"></span>
                      <img :src="[upload_hand_card[0] ? upload_hand_card[0].src:'']" @click="previewImg(upload_hand_card[0].src)" alt="" >
                    </div>
                 </div>
             </div>
             <button class="main_back" @click="submit">
                 提交申请
             </button>
        </div>

    </div>
</template>

<script>
import Header from '../../components/header'
import { Uploader,Area,Dialog,ImagePreview  } from 'vant';
import {uploadPictures} from '../../static/utils/utils.js'
export default {
    components:{
        Header,
        'van-uploader':Uploader,
        'van-area':Area,
        [Dialog.Component.name]: Dialog.Component,
        [ImagePreview.Component.name]: ImagePreview.Component,
    },

    data(){
        return{
            title:'供应商申请',
            filelist:[],
            company_name:'',
            detail_addr:"",
            number:'1',
            detail_company:'',
            company_username:'',
            company_tel:'',
            upload_logo:[],  //logo图片
            upload_license:[], //营业执照
            upload_mechanism:[], //机构代码
            upload_revenue:[],  //税务登记证
            upload_id_card:[],  //身份证正面
            upload_hand_card:[], //身份证反面
        }
    },
    methods:{
      //上传logo
      uploadLogo(file) {
        uploadPictures(this,file.file).then(res=>{
          if(res.code == 200){
            this.upload_logo.push({
              src:res.content.server,
              img:res.content.value
            })
          }
        })
      },
      //上传营业执照
      uploadLicense(file){
        uploadPictures(this,file.file).then(res=>{
          if(res.code == 200){
            this.upload_license.push({
              src:res.content.server,
              img:res.content.value
            })
          }
        })
      },
      //上传机构代码
      uploadMechanism(file){
        uploadPictures(this,file.file).then(res=>{
          if(res.code == 200){
            this.upload_mechanism.push({
              src:res.content.server,
              img:res.content.value
            })
          }
        })
      },
      //上传税务登记
      uploadRevenue(file){
        uploadPictures(this,file.file).then(res=>{
          if(res.code == 200){
            this.upload_revenue.push({
              src:res.content.server,
              img:res.content.value
            })
          }
        })
      },
      //上传身份证正面
      uploadIdCard(file){
        uploadPictures(this,file.file).then(res=>{
           if(res.code == 200){
             this.upload_id_card.push({
               src:res.content.server,
               img:res.content.value
             })
           }
        })
      },
      //上传身份证反面
      uploadHandCard(file){
        uploadPictures(this,file.file).then(res=>{
          if(res.code == 200){
            this.upload_hand_card.push({
              src:res.content.server,
              img:res.content.value
            })
          }
        })
      },
      //预览图片
      previewImg(src){
        console.log(src)
         ImagePreview([
           src
         ])
      },
      //删除图片
      deleteImg(witch){
        this[witch]=[];
      },
      sure_area(value){
        console.log(value)
      },
      submit(){
        /* 包含中文 */
          const chinese = /[\u4e00-\u9fa5]+/;
          /* 手机格式验证 */
          const cellphoneCheck = {
            message: '手机格式不正确',
            pattern: /^(1[3-8][0-9])\d{8}$/
          }
          /* 空格验证 */
          const spaceCheck = /^\S+$/;

          /* 数字字母中文 */
          const publicText = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;

          /* 只能输入数字 */
          const numberCheck = /^[0-9]+$/;

          /* 只能输入字母 */
          const onlyLetter = /^[A-Za-z]+$/;

          /* 全中文或者字母 */
          const only_letter_number=(str)=>{
            if(numberCheck.test(str) || onlyLetter.test(str)){
              return true;
            }else{
              return false
            }
          }
          // 特殊符号
          var special = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");

          /* 不支持全数字、空格、特殊符号 */
          const publicCheck=(str)=>{
          if(!numberCheck.test(str) && !onlyLetter.test(str) && publicText.test(str)){
              return true
            }else{
              return false
            }
          }
          if(this.upload_license.length==0){
            this.alert('请上传营业执照');
            return false;
          }
          if(this.upload_id_card.length==0){
            this.alert('请上传身份证正面照');
            return false;
          }
          if(this.upload_hand_card.length==0){
            this.alert('请上传身份证反面照');
            return false;
          }

          if(this.company_name.length < 5 || this.company_name.length > 20){
             this.alert('请输入5~20字企业名称','company_name');
            return false;
          }else if(!publicCheck(this.company_name) || onlyLetter.test(this.company_name) || !chinese.test(this.company_name)){
            this.alert('请输入中文企业名称','company_name')
            return false;
          }

          if(this.detail_addr<5){
            this.alert('请完整填写地址信息','detail_addr');
            return false;
          }else if( !publicCheck(this.detail_addr)){
            this.alert('地址信息格式错误','detail_addr')
            return false;
          }

          if(this.detail_company < 10){
            this.alert('请详细介绍贵司业务情况不少于10字','detail_company');
            return false
          }else if(onlyLetter.test(this.detail_company) || !chinese.test(this.detail_company)){
            this.alert('企业介绍必须为中文','detail_company');
            return false
          }

          if(!publicCheck(this.company_username) || !(this.company_username.length >= 2 && this.company_username.length <= 10)){
            alert('请正确输入联系姓名','company_username');
            return false;
          }

          if(!cellphoneCheck.pattern.test(this.company_tel)){
            alert('请输入正确的联系电话','company_tel');
            return false;
          }

          let license = this.upload_license[0].img;
          if(this.upload_revenue[0]){
            license += ','+this.upload_revenue[0].img;
          }
          if(this.upload_mechanism[0]){
            license += ','+this.upload_mechanism[0].img;
          }
          let data = {
            cname:this.company_name,
            logo:this.upload_logo[0]?this.upload_logo[0].img:null,
            area:2,
            city:500,
            addr:this.detail_addr,
            scale:this.number,
            desc:this.detail_company,
            uname:this.company_username,
            contact:this.company_tel,
            license:license,
            id_card:this.upload_id_card[0].img,
            hand_card:this.upload_hand_card[0].img
          }
          //ajax
          this.$axios.post('/company/save',{data:JSON.stringify(data)}).then(res=>{
            if(res.code == 200){
              //跳转页面
            }else if(res.code == 500){
               this.alert(res.msg)
            }
          })
      },
      alert(msg,flag=null){
        Dialog.alert({
          title:'提示',
          message:msg
        }).then(()=>{
          if(flag){
            this.$refs[flag].focus();
          }
        })
      }
    }
}
</script>

<style lang='scss' scoped>
@import './company.scss'
</style>
