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
                      <van-uploader :after-read="uploadLogo"  multiple :max-count="1">
                        <span class="file_mk">{{!upload_logo.length?"上传图片":"重新上传"}}</span>
                      </van-uploader>
                      <div class="uploaded_img" v-show="upload_logo.length">
                        <span class="iconfont icon-cuo" @click="deleteImg('upload_logo')"></span>
                        <img :src="[upload_logo.length ? upload_logo[0].src:'']" @click="previewImg(upload_logo[0].src)" alt="图片加载失败" >
                      </div>
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>所在地区</div>
                    <div class="row-right" @click="showArea">
                        <span class="textInput">{{area_text?area_text:'请选择企业所在地'}}</span>
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
                            <option selected value="1"> &lt; 20台 </option>
                            <option value="2">20~39台</option>
                            <option value="3">40~59台</option>
                            <option value="4">60~99台</option>
                            <option value="5">>=100台</option>
                        </select>
                    </div>
                </div>
                <div class=" desc-row">
                    <div class="row-left"><span class="f-red">*</span>企业介绍</div>
                    <textarea class="desc" ref="detail_company" maxlength="500" v-model="detail_company" placeholder="请介绍一下贵公司业务情况"></textarea>
                    <div class="text_length" style="text-align: right;">{{detail_company.length}}/500</div>
                </div>
            </div>
            <div class="union-title">联系方式</div>
            <div class="from-row">
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>联系人</div>
                    <div class="row-right">
                         <input type="text" ref="company_username" class="textInput" v-model="company_username" maxlength="10" placeholder="请输入联系人姓名">
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>联系电话</div>
                    <div class="row-right">
                         <input type="number" class="textInput" ref="company_tel" v-model="company_tel" maxlength="11" placeholder="请输入联系电话">
                    </div>

                </div>
            </div>
            <div class="union-title">企业认证(上传企业认证资质获得鱼泡专属认证)</div>
            <div class="from-row">
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>营业执照</div>
                    <div class="row-right">
                     <van-uploader :after-read="uploadLicense" multiple :max-count="1">
                       <span class="file_mk">{{!upload_license.length?'上传图片':'重新上传'}}</span>
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
                      <van-uploader :after-read="uploadMechanism" multiple :max-count="1">
                        <span class="file_mk">{{!upload_mechanism.length?'上传图片':'重新上传'}}</span>
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
                      <van-uploader :after-read="uploadRevenue" multiple :max-count="1">
                        <span class="file_mk">{{!upload_revenue.length?'上传图片':'重新上传'}}</span>
                      </van-uploader>
                      <div class="uploaded_img" v-show="upload_revenue.length">
                        <span class="iconfont icon-cuo" @click="deleteImg('upload_revenue')"></span>
                        <img :src="[upload_revenue.length ? upload_revenue[0].src:'']" @click="previewImg(upload_revenue[0].src)" alt="" >
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
        <div class="update">
          <PickerArea ref="area" :onSelectd="selectArea" :default_areaData="area_id.city && area_id" />
        </div>
    </div>
</template>

<script>
import Header from '../../components/header'
import { Uploader,Area,Dialog,ImagePreview  } from 'vant';
import {uploadPictures} from '../../static/utils/utils.js';
import {CellphoneCheck} from '../../static/utils/validator.js';
import PickerArea from '../pickerArea/index.vue'
export default {
    components:{
        Header,
        'van-uploader':Uploader,
        'van-area':Area,
        [Dialog.Component.name]: Dialog.Component,
        [ImagePreview.Component.name]: ImagePreview.Component,
        PickerArea:PickerArea,
    },
    data(){
        return{
            title:'供应商申请',
            filelist:[],
            company_name:'', //公司名称
            detail_addr:"",  //详细地址
            number:'1',  //机械规模
            detail_company:'', //企业简介
            company_username:'',  //联系人姓名
            company_tel:'',    //联系人电话
            upload_logo:[],  //logo图片
            upload_license:[], //营业执照
            upload_mechanism:[], //机构代码
            upload_revenue:[],  //税务登记证
            upload_id_card:[],  //身份证正面
            upload_hand_card:[], //身份证反面
            area_text:'',
            area_id:{},
            modify_data:{}, //修改页面的初始数据
        }
    },
    props:['info'],
    beforeMount() {
      if(this.info) this.getParentData(this.info);
    },
    methods:{
      //上传logo
      uploadLogo(file) {
        this.uploadAllImages(file,'upload_logo')
      },
      //上传营业执照
      uploadLicense(file){
        this.uploadAllImages(file,'upload_license')
      },
      //上传机构代码
      uploadMechanism(file){
        this.uploadAllImages(file,'upload_mechanism')
      },
      //上传税务登记
      uploadRevenue(file){
        this.uploadAllImages(file,'upload_revenue')
      },
      //上传身份证正面
      uploadIdCard(file){
        this.uploadAllImages(file,'upload_id_card')
      },
      //上传身份证反面
      uploadHandCard(file){
        this.uploadAllImages(file,'upload_hand_card')
      },
      //上传封装
      uploadAllImages(file,target){
        uploadPictures(this,file.file).then(res=>{
          this[target].push({
             src:res.content.server,
             img:res.content.value
           })
        })
      },
      //预览图片
      previewImg(src){
         ImagePreview([
           src
         ])
      },
      //删除图片
      deleteImg(witch){
        this[witch]=[];
      },
      submit(){
        /* 包含中文 */
          const chinese = /[\u4e00-\u9fa5]+/;
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
          /* 不支持全数字、空格、特殊符号 */
          const publicCheck=(str)=>{
          if(!numberCheck.test(str) && !onlyLetter.test(str) && publicText.test(str)){
              return true
            }else{
              return false
            }
          }

          let count = 0;
          for(let i = 0; i < this.company_name.length; i++){
            if(chinese.test(this.company_name[i])){
              count ++;
            }
          }
          if(this.company_name.length > 20 || count < 5){
             this.alert('请输入5~20字企业名称','company_name');
            return false;
          }else if(!publicCheck(this.company_name)){
            this.alert('请输入中文企业名称','company_name')
            return false;
          }
          if(!this.area_id.area){
            this.alert('请选择企业所在地',()=>{this.$refs.area.onShow(true)});
            return false;
          }

          let addr_num_count = 0;
          for(let i = 0; i < this.detail_addr.length; i++){
            if(chinese.test(this.detail_addr[i])){
              addr_num_count ++;
            }
          }
          if(addr_num_count < 5){
            this.alert('请完整填写地址信息','detail_addr');
            return false;
          }else if( onlyLetter.test(this.detail_addr) || !chinese.test(this.detail_addr)){
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
            this.alert('请正确输入联系姓名','company_username');
            return false;
          }
          if(!CellphoneCheck.pattern.test(this.company_tel)){
            this.alert('请输入正确的联系电话','company_tel');
            return false;
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
          let arr_license = new Array('','','');
          arr_license[0] = this.upload_license[0].img
          if(this.upload_revenue[0]){
            arr_license[1] = this.upload_revenue[0].img
          }
          if(this.upload_mechanism[0]){
            arr_license[2] = this.upload_mechanism[0].img
          }
          let data = {
            cname:this.company_name,
            logo:this.upload_logo[0]?this.upload_logo[0].img:null,
            area:this.area_id.city,
            city:this.area_id.area,
            addr:this.detail_addr,
            scale:this.number,
            desc:this.detail_company,
            uname:this.company_username,
            contact:this.company_tel,
            license:arr_license.join(),
            id_card:this.upload_id_card[0].img,
            hand_card:this.upload_hand_card[0].img
          }
          this.$axios.post('/company/save',{data:JSON.stringify(data)}).then(res=>{
            if(res.code == 200){
              //跳转页面
            Dialog.confirm({
              title:"提交成功",
              message:'您提交的申请，需要核实人员核实之后才能通过，工作人员将在一个工作日之内联系您，请保持电话畅通，客服电话：15608008605',
              cancelButtonText:"稍后再去",
              confirmButtonText:"联系客服"
            }) .then(() => {
              this.$router.push({name:'company-user',params:{isCall:15608008605}})
            }).catch(() => {
              this.$router.push('/company/user')
            });
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
          if(typeof flag == "string") this.$refs[flag].focus();
          else if(typeof flag == "function") flag();
        })
      },
      //地区选择显示隐藏
      showArea(){
        this.$refs.area.onShow(true)
      },
      //接收子组件传的参数
      selectArea(area){
        this.area_id={
          area:area.area.id,
          city:area.city.id,
        }
        this.area_text = area.city.name+' '+area.area.name;
      },
      //被父组件调用的方法--获取父组件的异步数据
      getParentData(data){
        let company = data.company;
        let licenses = data.licenses;
        // 初始化修改页面的数据
        this.company_name = company.cname;
        this.detail_addr = company.addr;
        this.area_text = company.area_text;
        this.number = company.scale;
        this.detail_company = company.desc;
        this.company_username = company.uname;
        this.company_tel = company.contact;
        //logo
        if(company.logo.server){
          this.upload_logo = [{
            src:company.logo.server,
            img:company.logo.value
           }];
        }
        //营业执照
        this.upload_license=[{
          src:licenses.license.server,
          img:licenses.license.value
        }]
        //代码机构
        if(licenses.agency){
          this.upload_mechanism=[{
            src:licenses.agency.server,
            img:licenses.agency.value
          }]
        }
        //税务登记
        if(licenses.tax){
          this.upload_revenue=[{
            src:licenses.tax.server,
            img:licenses.tax.value
          }]
        }
        //身份证
        this.upload_id_card = [{
          src:licenses.idCard.server,
          img:licenses.idCard.value
        }]
        this.upload_hand_card = [{
          src:licenses.handCard.server,
          img:licenses.handCard.value
        }]
        //城市id
        this.area_id={
          area:company.city,
          city:company.area,
        }
      }
    },
}
</script>

<style lang='scss' scoped>
@import './company.scss'
</style>
