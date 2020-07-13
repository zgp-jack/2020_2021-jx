<template>
    <div class="create">
        <Header :title="page_info.title"/>
        <MechanicalType :isShow='mechanicsShow' :onShow="onMechanicsShow"/>
        <PickerArea ref="pickerArea"/>

        <div class="form" v-if="mode==1">
            <div class="public-style">
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
                <div class="notice">结算方式</div>
                <div class="content">
                  <select name="method">
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
                  <input type="text" maxlength="5" placeholder="请输入联系人姓名" value="">
                </div>
              </div>
              <div class="form_row">
                <div class="notice">联系电话</div>
                <div class="content">
                  <input type="text" maxlength="11" placeholder="请输入联系电话" value="">
                </div>
              </div>
              </div>
          <div class="public-style">
              <div class="form_row">
                <div class="notice">标题名称</div>
                <div class="content">
                  <input type="text" maxlength="20" placeholder="机械类型+工作地点">
                </div>
              </div>
              <div class="form_row desc">
                <div class="notice">{{page_info.notice_text}}</div>
                <textarea maxlength="500" :placeholder="page_info.desc">

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
                <input type="text" maxlength="5" placeholder="请输入联系人姓名" value="">
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
    PickerArea
  },
    data(){
      return{
          page_info:{
            title:'发布求租信息',
            notice_text:"求租简介",
            desc:'请简要描述设备型号、工作地点工作时长.结算方式，可大幅提升匹配准确'
          },
          mechanicsShow:false,
          mode:1,
      }
    },
    created() {
      this.mode = this.$route.query.mode;
      this.initPage(this.mode);
    },
    methods:{
      onMechanicsShow(flag){
        this.$set(this,'mechanicsShow',flag)
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
      }
    }
}
</script>

<style lang='scss' scoped>
@import './create.scss'
</style>
