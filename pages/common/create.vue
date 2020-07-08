<template>
    <div>
        <Headers :title="title"/>
        <div class="form">
            <div class="public-style">
              <div class="form_row">
                <div class="notice">机械类型</div>
                <div class="content">
                  <span>请选择机械类型</span>
                </div>
              </div>
              <div class="form_row">
                <div class="notice">工作地点</div>
                <div class="content">
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
                  <input type="text" maxlength="5" placeholder="请输入联系人姓名" value="Tt">
                </div>
              </div>
              <div class="form_row">
                <div class="notice">联系电话</div>
                <div class="content">
                  <input type="text" maxlength="11" placeholder="请输入联系电话" value="13700942760">
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
                <div class="notice">求租简介</div>
                <textarea maxlength="500" placeholder="请简要描述设备型号、工作地点工作时长.结算方式，可大幅提升匹配准确">

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

    </div>
</template>

<script>
import Headers from '../../components/header'
export default {
  components:{
    Headers
  },
    data(){
      return{
          title:'发布求租信息'
      }
    }
}
</script>

<style lang='scss' scoped>
@import './create.scss'
</style>
