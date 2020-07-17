<template>
    <div class="create">
        <Header :title="page_info.title"/>
        <MechanicalType @click="onMechanicsShow" :onSelectd="selectMechanical" ref="mechanics"/>
        <PickerArea ref="pickerArea" :onSelectd="selectArea"/>
        <div class="form" v-if="mode==1">
          <Uploader />
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
                <div class="content">
                  <select name="method" v-model="meth">
                    <option value="1">现款</option>
                    <option value="3">协商付款</option>
                  </select>
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
                  <input type="text" maxlength="11" placeholder="请输入联系电话" value="" v-model="phon">
                </div>
              </div>
              </div>
          <div class="public-style">
              <div class="form_row">
                <div class="notice">标题名称</div>
                <div class="content">
                  <input type="text" maxlength="20" placeholder="机械类型+工作地点" v-model="title">
                </div>
              </div>
              <div class="form_row desc">
                <div class="notice">{{page_info.notice_text}}</div>
                <textarea maxlength="500" :placeholder="page_info.desc" v-model="desc">

                </textarea>
              </div>
            </div>
            <div class="public-style">
              <div class="form_row desc">
                <div class="notice">上传图片(可选)</div>
                <div class="images-on">
                    <div class="chose-img">
                      <input type="file">
                    </div>
                </div>
              </div>
            </div>
          <div class="submit">提交保存</div>
        </div>

        <!-- 其他的页面 -->
        <div class="form" v-else>
          <div class="public-style">
            <div class="form_row">
              <div class="notice">标题名称</div>
              <div class="content">
                <input type="text" maxlength="20" placeholder="请输入标题">
              </div>
            </div>
            <div class="form_row" @click="onMechanicsShow(true)">
              <div class="notice">机械类型</div>
              <div class="content">
                <span>请选择机械类型</span>
              </div>
            </div>
            <div class="form_row">
              <div class="notice">工作地点</div>
              <div class="content" @click="onPickerAreaShow(true)">
                <span>请选择工作地点</span>
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
                <input type="text" maxlength="11" placeholder="请输入联系电话" value="">
              </div>
            </div>
            <div class="form_row desc">
              <div class="notice">{{page_info.notice_text}}</div>
              <textarea maxlength="500" :placeholder="page_info.desc">

              </textarea>
            </div>
          </div>
          <div class="public-style" v-if="mode!=4">
            <div class="form_row desc">
              <div class="notice">上传图片(必传)</div>
              <div class="images-on">
                  <div class="chose-img">
                    <input type="file">
                  </div>
              </div>
            </div>
          </div>
          <div class="submit">提交保存</div>
        </div>

    </div>
</template>

<script>
import MechanicalType from '../../components/mechanicalType';
import PickerArea from '../../components/pickerArea';
export default {
  components:{
    MechanicalType,
    PickerArea,
  },
    data(){
      return{
          page_info:{
            title:'发布求租信息',
            notice_text:"求租简介",
            desc:'请简要描述设备型号、工作地点工作时长.结算方式，可大幅提升匹配准确（）'
          },

          Mechanical:[],//机械类型
          areaData:{},//地区选择数据

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
          images:'',//相关图片，无图片则为 null 有图片时其格式为 "image1,image2,image3" 最多九张 (求租 与 求购 信息不使用)

      }
    },
    created() {
      this.mode = this.$route.query.mode;
      this.initPage(this.mode);
    },
    methods:{
      onMechanicsShow(flag){
        this.$refs.mechanics.onShow(flag)
      },
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
        let {tel} = window.$nuxt.$store.state.userinfo;
        this.phon = tel;
        this.oldPhon = tel;
      },
      //机械类型选择
      selectMechanical(data){
        this.$set(this,'Mechanical',[...data])
      },
      //地区选择
      selectArea(data){
        this.$set(this,'areaData',{...data})
      }
    }
}
</script>

<style lang='scss' scoped>
@import './create.scss'
</style>
