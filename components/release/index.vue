<template>
    <div class="create">
        <Header :title="page_info.title"/>
        <MechanicalType @click="onMechanicsShow" :onSelectd="selectMechanical" ref="mechanics" :default_Mechanical='default_Mechanical'/>
        <PickerArea ref="pickerArea" :onSelectd="selectArea" :default_areaData="default_areaData"/>
        <div class="form" v-if="mode==1">
            <div class="public-style">
              <div class="form_row">
                <div class="notice">机械类型</div>
                <div class="content">
                  <span v-if="!Mechanical.length" @click="onMechanicsShow(true)">请选择机械类型</span>
                  <span v-else @click="onMechanicsShow(true)" class="inner">
                    {{
                      Mechanical.map(item=>item.name).join(',')
                    }}
                  </span>
                </div>
              </div>
              <div class="form_row">
                <div class="notice">工作地点</div>
                <div class="content" @click="onPickerAreaShow(true)">
                  <span v-if="!areaData.city">请选择工作地点</span>
                  <span v-else class="inner">
                    {{
                      areaData.city.name +' '+ areaData.area.name
                    }}
                  </span>
                </div>
              </div>
              <div class="form_row">
                <div class="notice">结算方式</div>
                <div class="content" style="display:flex;align-items:center;">
                  <select name="method" v-model="meth">
                    <option value="1">现款</option>
                    <option value="3">协商付款</option>
                  </select>
                  <!-- <i class="iconfont icon-down" /> -->
                  <img src="../../assets/img/icon/down.png" class="down">
                </div>
              </div>
            </div>
            <div class="public-style">
              <div class="form_row">
                <div class="notice">联&nbsp;系 人</div>
                <div class="content">
                  <input type="text" maxlength="5" placeholder="请输入联系人姓名" value="" v-model="user">
                </div>
              </div>
              <div class="form_row">
                <div class="notice">联系电话</div>
                <div class="content">
                  <input type="text" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" placeholder="请输入联系电话" value="" v-model="phon">
                </div>
              </div>
              <div class="form_row" v-if="phon!==oldPhon || !oldPhon">
                <div class="notice">验证码</div>
                <div class="content captInput clearfix">
                  <input type="text" maxlength="11" placeholder="请输入验证码" value="" v-model="capt">
                  <span class="capt fr" @click="sendCapt">{{get_captcha_msg}}</span>
                </div>
              </div>
              </div>
          <div class="public-style">
              <div class="form_row">
                <div class="notice">标题名称</div>
                <div class="content">
                  <input type="text" maxlength="20" placeholder="请输入标题" v-model="title">
                </div>
              </div>
              <div class="form_row desc textarea">
                <div class="notice">{{page_info.notice_text}}</div>
                <textarea maxlength="500" :placeholder="page_info.desc" v-model="desc">

                </textarea>
                <span class="textarea_msg">
                  {{desc.length +'/500'}}
                </span>

              </div>
            </div>
            <div class="public-style">
              <div class="form_row desc">
                <div class="notice">上传图片(可选)</div>
                <div class="images-on">
                  <div class="img clearfix">
                      <div class="img_box fl" v-for="(item,index) in images" :key="index">
                        <i class="imgclose" @click="imgCloce(index)"/>
                        <img :src="item" alt="" @click="imgView(index)">
                      </div>
                      <div class="fl img__box" v-if="images.length<9">
                        <!-- <div class="wxMask" v-if="iswx" @click="wxUploadImage"></div> -->
                        <van-uploader :after-read="afterRead">
                          <div class="chose-img">
                          </div>
                        </van-uploader>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          <div class="submit" @click="createSubmit">提交保存</div>
        </div>

        <!-- 其他的页面 -->
        <div class="form" v-else>
          <div class="public-style">
            <div class="form_row">
              <div class="notice">标题名称</div>
              <div class="content">
                <input type="text" maxlength="15" placeholder="请输入标题" v-model="title">
              </div>
            </div>
            <div class="form_row">
              <div class="notice">机械类型</div>
              <div class="content">
                <span v-if="!Mechanical.length" @click="onMechanicsShow(true)">请选择机械类型</span>
                <span v-else @click="onMechanicsShow(true)" class="inner">
                  {{
                    Mechanical.map(item=>item.name).join(',')
                  }}
                </span>
              </div>
            </div>
            <div class="form_row">
              <div class="notice">工作地点</div>
              <div class="content" @click="onPickerAreaShow(true)">
                <span v-if="!areaData.city">请选择工作地点</span>
                <span v-else class="inner">
                  {{
                    areaData.city.name +' '+ areaData.area.name
                  }}
                </span>
              </div>
            </div>
            <div class="form_row">
              <div class="notice">联&nbsp;系 人</div>
              <div class="content">
                <input type="text" maxlength="5" placeholder="请输入联系人姓名" value="" v-model="user">
              </div>
            </div>
            <div class="form_row">
              <div class="notice">联系电话</div>
              <div class="content">
                <input type="text" maxlength="11" placeholder="请输入联系电话" value="" v-model="phon">
              </div>
            </div>
            <div class="form_row" v-if="phon!==oldPhon || !oldPhon">
              <div class="notice">验证码</div>
              <div class="content captInput clearfix">
                <input type="text" maxlength="11" placeholder="请输入验证码" value="" v-model="capt">
                <span class="capt fr" @click="sendCapt">{{get_captcha_msg}}</span>
              </div>
            </div>
            <div class="form_row desc textarea">
              <div class="notice">{{page_info.notice_text}}</div>
              <textarea maxlength="500" :placeholder="page_info.desc" v-model="desc">

              </textarea>
              <span class="textarea_msg">
                {{desc.length +'/500'}}
              </span>
            </div>
          </div>

          <div class="public-style" v-if="mode!=4">
            <div class="form_row desc">
              <div class="notice">上传图片(必填)</div>
              <div class="images-on">
                <div class="img clearfix">
                    <div class="img_box fl" v-for="(item,index) in images" :key="index">
                      <i class="imgclose" @click="imgCloce(index)"/>
                      <img :src="item" alt="" @click="imgView(index)">
                    </div>
                   
                    <div class="fl img__box" v-if="images.length<9">
                      <!-- <div class="wxMask" v-if="iswx" @click="wxUploadImage"></div> -->
                      <van-uploader :after-read="afterRead">
                        <div class="chose-img">
                        </div>
                      </van-uploader>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div class="submit" @click="createSubmit">提交保存</div>
        </div>

    </div>
</template>

<script>
import MechanicalType from '../../components/mechanicalType';
import PickerArea from '../../components/pickerArea';
import {CellphoneCheck,IncludeChinese,OnlyChinese} from '../../static/utils/validator.js';
import {Toast,Uploader,ImagePreview,Dialog} from 'vant';
import {uploadPictures,whetherLogin,getRequestQuery,weiXinConfigRequest,isWeixin} from '../../static/utils/utils.js';
export default {
  props:['editorData'],
  components:{
    MechanicalType,
    PickerArea,
    'van-uploader':Uploader
  },
    data(){
      return{
          page_info:{
            title:'发布求租信息',
            notice_text:"求租简介",
            desc:'请简要描述设备型号、工作地点工作时长.结算方式，可大幅提升匹配准确（）'
          },

          Mechanical:[],//机械类型
          default_Mechanical:null,//默认机械类型
          areaData:{},//地区选择数据
          default_areaData:null,//默认地区
          get_captcha_msg: '获取验证码',
          mode:1,
          title:'',//标题-用户输入，长度至少4个字符，且必须包含中文
          //type:'',//机械类型——用户选择 可多选 使用 , 隔开
          //area:'',//省id——用户选择
          //city:'',//市id——用户选择
          meth:'1',//支付方式——用户选择 求租信息使用
          user:'',//联系人姓名-用户输入，长度至少2个字符，且必须包含中文
          phon:'',//联系人电话
          oldPhon:'',//初始电话用于判断
          desc:'',//详情介绍——用户输入，长度至少15个字符，且必须包含中文
          capt:'',//短信验证码——当联系人电话不同于用户电话号码（若修改 则需要既不同于用户电话号码 又不同于 修改之前的电话号码）时 ，必须有此值，验证电话号码
          images:[],//相关图片，无图片则为 null 有图片时其格式为 "image1,image2,image3" 最多九张 (求租 与 求购 信息不使用)字符串逗号隔开
          descLength:0,//详情简介里文字的长度
          iswx:false
      }
    },
    beforeMount() {
      this.mode = this.$route.query.mode;
      this.initPage(this.mode);
      this.isEditor();
      whetherLogin(this,'',()=>{
        this.$router.replace('/login')
      })
      this.iswx = isWeixin();
    },

    methods:{
      //微信上传图片
      wxUploadImage(){
        
        let {images} = this
        weiXinConfigRequest(this,function(res){
          let url = "http://statics.zhaogongdi.com" + res.content.url;
          images.push(res.content.url)
        }).then();
      },
      onMechanicsShow(flag){
        this.$refs.mechanics.onShow(flag)
      },
      //地区显示
      onPickerAreaShow(flag){
        this.$refs.pickerArea.onShow(true)
      },
      //初始化页面
      initPage(mode){
        if(mode == 1) {
          this.page_info = {
            title : "发布求租信息",
            notice_text : "求租简介",
            desc:'请简要描述设备型号、工作地点工作时长.结算方式，可大幅提升匹配准确'
          }
        }else if(mode == 2){
          this.page_info = {
            title : "发布出租信息",
            notice_text : "出租简介",
            desc:'请简要描述出租设备型号和期望交易地区，信息越准越好出租'
          }
        }else if(mode == 3){
          this.page_info = {
            title : "发布转让信息",
            notice_text : "转让简介",
            desc:'请简要描述设备型号和机械年份，我们将为您快速匹配交易方'
          }
        }else if(mode == 4){
          this.page_info = {
            title : "发布求购信息",
            notice_text : "求购简介",
            desc:'请简要描述设备型号和机械年份，我们将为您快速匹配交易方'
          }
        }
        let {tel,name} = this.$nuxt.$store.state.userinfo;
        this.phon = tel;
        this.user = name
        this.oldPhon = tel;
      },
      //机械类型选择
      selectMechanical(data){
        this.$set(this,'Mechanical',[...data])
      },
      //地区选择
      selectArea(data){
        this.$set(this,'areaData',{...data})
      },
      //发送验证码
      sendCapt(){
        const that = this;
        let params = {
          phone:that.phon
        }
        if(CellphoneCheck.pattern.test(params.phone)){
          that.$axios.post('/index/send-message?'+getRequestQuery(params)).then(res=>{
            if (res.code == 200) {
                that.countDown()
            } else {
                Toast(res.msg);
            }
          })
        }else{
          Toast(CellphoneCheck.message)
        }
      },
      countDown(){
        let number = 60;
        this.get_captcha_msg = number + 's后获取';
        let timer = setInterval(()=>{
          number -= 1;
          if(number == -1){
            this.get_captcha_msg = '重新获取'
            clearInterval(timer);
          }else{
            this.get_captcha_msg = number + 's后获取';
          }
        },1000)
      },
      //文件上传
      afterRead(file){
        const { images } = this;
          uploadPictures(this,file.file).then(res=>{
            if(res.code == 200){
              console.log(res.content)
              images.push(res.content.server)
            }else{
              Toast(res.msg)
            }
          })
        
        //浏览器环境
        
          
        return true;
      },
      // 文件大小
      // onOversize(file){
      //   Toast('文件大小不能超过5M')
      // },
      //删除图片
      imgCloce(index){
        let {images} = this;
        images.splice(index,1)
        this.images = [...images];
      },
      //图片预览
      imgView(index){
        let images = [...this.images];
        ImagePreview({
          images:images.map(item=> item),
          startPosition: index,
          closeable: true,
        });
      },
      //请求拦截
      requstIntercept(){
        let {
          Mechanical,//机械类型
          areaData,//地区
          mode,
          title,//标题
          meth,//支付方式
          user,//联系人姓名
          phon,//联系人电话
          oldPhon,
          desc,//详情介绍
          capt,//短信验证码
          images,//图片
        } = this;
        const that = this;
        let params = {};
        let data = {};

        if ((!IncludeChinese(title) || title.length < 4)) {
          Toast('请输入4-15字中文标题');
          return false;
        }
        if(!Mechanical.length){
          Toast('请选择机械类型');
          return false;
        }
        if (JSON.stringify(areaData)==='{}') {
          Toast('请选择交易地区');
          that.onPickerAreaShow(true)
          return false;
        }
        if (user.length < 2) {
          Toast('请输入正确的联系人且不少于2个字');
          return false;
        }
        if (phon.length < 11 || !CellphoneCheck.pattern.test(phon)) {
          Toast('请输入正确的电话号码');
          return false;
        }
        if (phon != oldPhon) {
          if (!capt || capt < 6) {
            Toast('验证码输入错误');
            return false;
          } else {
            data.capt = capt;//验证码需要判断
          }
        }
        var reg = /[\u4e00-\u9fa5]/;
        if (!reg.test(desc) || desc.length < 15) {
          Toast('详细描述内容不能少于15个字且必须包含汉字');
          return false;
        }
        if (mode != 4) {
          if((mode == 2 || mode == 3) && !images.length){
            Toast('请上传图片');
            return false;
          }
          if (mode != 1 && images.length) data.cover = images[0];
           images.length && (data.images = images.map(item=>item).join(','));
        }
        params.mode = mode;
        data.title = title;
        data.type = Mechanical.map(item=>item.id).join(',');
        data.area = areaData.city.id;
        data.city = areaData.area.id;
        data.meth = meth;
        data.user = user;
        data.phon = phon;
        data.desc = desc;

        return {params,data}
      },
      //创建/编辑提交
      createSubmit(){
        const that = this;
        let newParams = that.requstIntercept();
        if(!newParams){return false};
        let {data,params} = newParams;
        let newData = {...params,data:JSON.stringify(data)}
        if(this.mode !=4){
          if(!data.images){
            Dialog.confirm({
              title: '温馨提示',
              message: '您还未上传图片，确定发布吗？',
            }).then(()=>{
              that.requstCreate(newData)
            })
          }else{
            that.requstCreate(newData)
          }
        }else{
          that.requstCreate(newData)
        }

      },
      requstCreate(params={}){
        const that = this;
        that.$axios.post(!that.editorData?'/user/create':'/user/update',!that.editorData?{...params}:{...params,data_id:that.$route.query.id}).then(res=>{
          if (res.code == 200) {
            function jump(paramsUrl){
              that.$router.replace({path:'/user/release',query:{mode:paramsUrl}})
            }

            const modeText = [
                {
                  mode:1,text:['求租','需要','急需','找']
                },
                {
                  mode:2,text:['出租','闲置','待租']
                },
                {
                  mode:3,text:['出售','转让','卖']
                },
                {
                  mode:4,text:['买','求购','急购']
                }
            ]
            const rexpText = that.title.match(/(求租|需要|急需|找|出租|闲置|待租|出售|转让|卖|买|求购|急购)/g);

            Dialog.alert({
              title: '温馨提示',
              message: '信息提交成功，工作人员正在审核中',
            }).then(()=>{
              if(rexpText && !that.editorData){
                const fondText = modeText.find(item=>{
                  if(item.text.includes(rexpText[0])){
                    return item
                  }
                })
                jump(fondText.mode)
              }else{
                jump(params.mode)
              }
            })
          }else if(res.code==204){
            console.log(res)
            Dialog.confirm({
              title: '温馨提示',
              message: res.msg,
            }).then(()=>{
              that.$router.replace({path:'/user/release',query:{mode:this.mode}})
            })
          }else if(res.code == 500){
            Dialog.confirm({
              title:'温馨提示',
              message:res.msg
            })
          }
          
        })
      },
      //设置修改数据
      isEditor(){
          if(this.$route.path ==='/common/update' && this.editorData){
              const editorData = {...this.editorData};
              this.title = editorData.title;
              this.$route.query.mode ==1 && (this.meth = editorData.payment_method==2?3:editorData.payment_method);
              this.user = editorData.user_name;
            //   this.phon = editorData.tel;
            //   this.oldPhon = editorData.tel;
              this.desc = editorData.desc;
              editorData.image_arr && editorData.image_arr.length && (this.images = [...editorData.image_arr.map(item=>item.server)]);
              editorData.class_id && editorData.class_id.length && (this.default_Mechanical = [...editorData.class_id]);
              this.default_areaData = {area:editorData.city_id,city:editorData.province_id}
          }
      }
    },
    computed:{

    },
    watch:{
      desc(value){
        this.descLength = value.length
      }
    }
}
</script>

<style lang='scss' scoped>
@import './style.scss'
</style>
