<template>
    <div>
        <Header :title='title'/>
        <div class="father">
            <div class="from-row msg">
              注: 用户认证供应商时，需要消耗499鱼泡币才能提交认证！
            </div>
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
                      <van-uploader :after-read="afterRead" v-model="filelist" multiple :max-count="1">
                        <span class="file_mk">上传图片</span>
                      </van-uploader>
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
                         <input type="text" class="textInput" ref="company_tel" v-model="company_tel" maxlength="10" placeholder="企业联系电话">
                    </div>

                </div>
            </div>
            <div class="union-title">企业认证(上传企业认证资质获得鱼泡专属认证)</div>
            <div class="from-row">
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>营业执照</div>
                    <div class="row-right">
                        <router-link to='' class="file_mk">上传图片</router-link>
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left">机构代码</div>
                    <div class="row-right">
                        <router-link to='' class="file_mk">上传图片</router-link>
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left">税务登记证</div>
                    <div class="row-right">
                        <router-link to='' class="file_mk">上传图片</router-link>
                    </div>
                </div>
            </div>
             <div class="union-title">上传身份证照片(上传企业法人身份证)</div>
             <div class="from-row">
                 <div class="id_card">
                    <div class="one">
                        <div></div>
                        <p>身份证正面照</p>
                    </div>
                    <div class="two">
                        <div></div>
                        <p>手持身份证照</p>
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
import { Uploader,Area,Dialog  } from 'vant';
import {uploadPictures} from '../../static/utils/utils.js'
export default {
    components:{
        Header,
        'van-uploader':Uploader,
        'van-area':Area,
        [Dialog.Component.name]: Dialog.Component,
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
            company_tel:''

        }
    },
    created() {
      // window.$nuxt.$store.state
    },
    methods:{
      afterRead(file) {
        uploadPictures(this,file.file).then(res=>{
        })
      // 此时可以自行将文件上传至服务器
      console.log(file,this.filelist);
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
          if(this.company_name.length < 5 || this.company_name.length > 20){
             this.alert('请输入5~20字企业名称');
             this.$refs.company_name.focus();
            return false;
          }else if(!publicCheck(this.company_name) || onlyLetter.test(this.company_name) || !chinese.test(this.company_name)){
            this.alert('请输入中文企业名称')
            return false;
          }

          if(this.detail_addr<5){
            this.alert('请完整填写地址信息')
            return false;
          }else if( !publicCheck(this.detail_addr)){
            this.alert('地址信息格式错误')
            return false;
          }

          if(this.detail_company < 10){
            this.alert('请详细介绍贵司业务情况不少于10字');
            return false
          }else if(onlyLetter.test(this.detail_company) || !chinese.test(this.detail_company)){
            this.alert('企业介绍必须为中文');
            return false
          }

          if(!publicCheck(this.company_username) || !(this.company_username.length >= 2 && this.company_username.length <= 10)){
            alert('请正确输入联系姓名');
            return false;
          }

        console.log(this.number)
      },
      alert(msg){
        Dialog.alert({
          title:'提示',
          message:msg
        })
      }
    }
}
</script>

<style lang='scss' scoped>
@import './company.scss'
</style>
