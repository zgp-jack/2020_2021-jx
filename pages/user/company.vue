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
                        <input type="text" class="textInput" maxlength="30" placeholder="请输入企业全称">
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
                        <input type="text" class="textInput" maxlength="30" placeholder="区镇\街道\门牌号">
                    </div>
                </div>
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>机械规模</div>
                    <div class="row-right">
                        <select name="scale" class="textInput">
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
                    <textarea class="desc" maxlength="120" placeholder="请介绍一下贵公司业务情况"></textarea>
                </div>
            </div>
            <div class="union-title">联系方式</div>
            <div class="from-row">
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>联系人</div>
                    <div class="row-right">企业法人姓名</div>
                </div>
                <div class="corm-row">
                    <div class="row-left"><span class="f-red">*</span>联系电话</div>
                    <div class="row-right">企业联系电话</div>
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
             <button class="main_back">
                 提交申请
             </button>
        </div>
    </div>
</template>

<script>
import Header from '../../components/header'
import { Uploader } from 'vant';
export default {
    components:{
        Header,
        'van-uploader':Uploader
    },
    data(){
        return{
            title:'供应商申请',
            filelist:[]
        }
    },
    methods:{
      afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file,this.filelist);
    }
    }
}
</script>

<style lang='scss' scoped>
@import './company.scss'
</style>
