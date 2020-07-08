<template>
  <div>
    <Headers :title="title"/>
      <div class="father">
          <div class="title">
            选择举报原因
          </div>
          <div class="reason">
              <div class="main_reason" @click="chekout(false)">
                <span>求租方已找到设备</span>
                <i class="iconfont icon-gouxuan" :class="[orther == false?'icondanxuan':'iconno']"></i>
              </div>
              <div class="main_reason" @click="chekout(true)">
                <span>信息虚假</span>
                <i class="iconfont icon-gouxuan" :class="[orther?'icondanxuan':'iconno']"></i>
              </div>
              <div :class="[orther?'orther_reason':'nones']">
                  <div v-for="(item,i) in list" :key="i" @click="change(i)" :class="{'cur':item.show}">{{item.title}}</div>
              </div>
          </div>
          <div class="title">联系方式</div>
          <div class="tel_inner">
              <div>手机号</div>
              <input type="number" maxlength="12" value="3123154">
          </div>
          <div class="title">备注说明<span>恶意投诉将会封号，请谨慎投诉</span></div>
          <div class="describe">
            <textarea maxlength="500" placeholder="合理说明投诉理由，审核人员将为您尽快处理。" v-model="texts"></textarea>
            <span>{{texts.length}}/500</span>
          </div>
          <div class="submit">提交</div>
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
            title:'举报',
            orther:false,
            texts:'',
            list:[{id:0,title:'电话虚假(空号、打不通)',show:false},{id:1,title:'虚假工程',show:false},{id:2,title:'其他',show:false},]
        }
      },
      methods:{
        chekout(right){
            if(right){
              this.orther = true
            }else if(!right){
              this.orther = false
            }
        },
        change(index){
          const lists= this.list
           for(let i = 0;i<lists.length;i++){
              if(lists[i].id == index){
                  lists[i].show = !lists[i].show
              }
           }
        }
      }
}
</script>

<style lang='scss' scoped>
@import './report.scss'
</style>
