<template>
  <div>
    <Headers :title="title"/>
      <div class="father">
          <div class="title">
            选择举报原因
          </div>
          <div class="reason">
              <div class="main_reason" @click="chekout(false)">
                <span>{{report_reason.completed}}</span>
                <i class="iconfont icon-gouxuan" :class="[orther == false?'icondanxuan':'iconno']"></i>
              </div>
              <div class="main_reason" @click="chekout(true)">
                <span>信息虚假</span>
                <i class="iconfont icon-gouxuan" :class="[orther?'icondanxuan':'iconno']"></i>
              </div>
              <div :class="[orther?'orther_reason':'nones']">
                  <div v-for="(item,i) in report_reason.reason" :key="i" @click="change(i)" :class="{'cur':item.show}">{{item.title}}</div>
              </div>
          </div>
          <div class="title">联系方式</div>
          <div class="tel_inner">
              <div>手机号</div>
              <p>{{userInfo.tel}}</p>
          </div>
          <div class="title">备注说明<span>恶意投诉将会封号，请谨慎投诉</span></div>
          <div class="describe">
            <textarea maxlength="500" placeholder="合理说明投诉理由，审核人员将为您尽快处理。" v-model="texts"></textarea>
            <span>{{texts.length}}/500</span>
          </div>
          <div class="submit" @click="submitReport">提交</div>
      </div>
  </div>
</template>

<script>
import Headers from '../../components/header'
import { Dialog } from 'vant';
export default {
    components:{
      Headers,
       [Dialog.Component.name]: Dialog.Component,
    },
      data(){
        return{
            title:'举报',
            orther:false,
            texts:'',
            list:[{id:0,title:'电话虚假(空号、打不通)',show:false},{id:1,title:'虚假工程',show:false},{id:2,title:'其他',show:false},],
            report_reason:{},
            userInfo:{}
        }
      },
      created(){
        //获取用户信息
        this.$set(this,"userInfo",window.$nuxt.$store.state.userinfo);
        //请求
        let params = {mode:1};
        let that = this;
        this.$axios.get('/us/report-reson',{params}).then(res=>{
          if(res.code == 200){
            that.report_reason = {...res.content}
            //格式化数据
            let obj = that.report_reason.reason;
            let arr = [];
            let index = 0;
            for(var attr in obj){
                arr.push({
                  id:index,
                  title:obj[attr],
                  show:false,
                  type:attr
                })
                index++;
            }
            that.report_reason.reason = arr;
          }
        })
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
          const lists= this.report_reason.reason
           for(let i = 0;i<lists.length;i++){
              if(lists[i].id == index){
                  lists[i].show = !lists[i].show
              }
           }
        },
        submitReport(){
          let that = this;
          let data = {
              info:this.$route.query.info,
              mode:this.$route.query.mode,
              phone:this.userInfo.tel,
              desc:this.texts ? this.texts : null,
              reason:''
          }
          let keys = Object.keys(this.report_reason)
          if(this.orther){
            let arr = this.report_reason.reason;
            let str = '';
            arr.forEach((item)=>{
              item.show ? str += item.type+',' : '';
            })
            data.reason = str.slice(0,str.length-1);
          }else{
            data.reason = keys[0];
          }
          //请求
          this.$axios.post('/us/report',{data:JSON.stringify(data)}).then(res=>{
            if(res.code == 200){
              Dialog.alert({
                title: '提示',
                message: res.msg,
              }).then(()=>{
                that.$router.go(-1)
              })
            }else if(res.code == 500){
              Dialog.alert({
                title: '提示',
                message: res.msg,
              }).then(()=>{
                that.$router.go(-1)
              })
            }
          })
        }
      }
}
</script>

<style lang='scss' scoped>
@import './report.scss'
</style>
