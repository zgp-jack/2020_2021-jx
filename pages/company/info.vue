<template>
  <div>
      <Header :title='title'/>
      <div class="father">
          <div class="head">
            <img src="http://statics.zhaogongdi.com/xcx/company_background.jpg">
            <div class="company-base">
              <img :src="[(list.logo && list.logo.server)?list.logo.server:'http://statics.zhaogongdi.com/common/default_header.png']" class="logo-server">
              <div>
                <p>{{list.cname}}</p>
                <p>
                  <img src="http://statics.zhaogongdi.com/xcx/icon_issue.png">
                  <img src="http://statics.zhaogongdi.com/xcx/icon_issue_v.png" v-if="list.authen == 2">
                </p>
              </div>
            </div>
          </div>
          <div class="info-list">
              <div class="list-head">企业简介</div>
              <div class="describe">{{list.desc}}</div>
          </div>
          <div class="info-list">
            <div class="list-head">联系信息</div>
            <div class="list-body">
              <div>
                  <p>联系人</p>
                  <p class="linkman">{{list.uname}}</p>
              </div>
              <div>
                  <p>联系方式</p>
                  <p class="contact" v-if="!showphone">{{list.contact}}</p>
                  <p class="contact" v-else @click="tel">{{phone}}</p>
                  <button class="contact_chakan" @click="showNumber(list.uu_id)" v-if="!showphone">查看完整号码</button>
              </div>
              <div>
                  <p>所在地区</p>
                  <p class="linkman">{{list.area_text}}</p>
              </div>
              <div>
                  <p>详细地址</p>
                  <p class="linkman">{{list.addr}}</p>
              </div>
              <div>
                  <p>机械规模</p>
                  <p class="linkman">{{companyScale[list.scale-1]}}</p>
              </div>
            </div>
          </div>
         <div class="product-list">
           <div class="headess">
             <div :class="[barshow?'cur':'']" @click="machinery">出租机械</div>
             <div :class="[!barshow?'cur':'']" @click="second_hand">二手机械</div>
           </div>
           <div class="list">
             <div class="machine" v-if="barshow">
               <div class="list-machine" v-for="(item,i) in first" :key="i" @click="MachineInfo(2,item.uu)">
                 <div class="item_content">
                   <div class="images">
                      <img :src="item.cover" v-if="item.cover != '' ">
                      <img src="http://statics.zhaogongdi.com/common/default_header.png" v-else>
                   </div>
                   <div class="info">
                     <div class="title-view">{{item.title}}</div>
                     <div class="area_status">
                       地区: {{item.area}}
                       <span v-if="item.status==1">待租中</span>
                       <span v-else>已出租</span>
                     </div>
                     <div>时间：{{item.time}}</div>
                   </div>
                 </div>
               </div>
               <emptyMsg  :empty1='true' v-if='More'/>
               <emptyMsg  :empty2='true' v-if='Moreimg'/>
             </div>
             <div class="machine" v-else>
               <div class="list-machine" v-for="(item,i) in second" :key="i" @click="MachineInfo(3,item.uu)">
                 <div class="item_content">
                   <div class="images">
                      <img :src="item.cover" v-if="item.cover != '' ">
                      <img src="http://statics.zhaogongdi.com/common/default_header.png" v-else>
                   </div>
                   <div class="info">
                     <div class="title-view">{{item.title}}</div>
                     <div class="area_status">
                       地区: {{item.area}}
                       <span v-if="item.status==1">待交易</span>
                       <span v-else>已完成</span>
                     </div>
                     <div>时间：{{item.time}}</div>
                   </div>
                 </div>
               </div>
               <emptyMsg  :empty1='true' v-if='Moretwo'/>
               <emptyMsg  :empty2='true' v-if='Moreimgtwo'/>
             </div>
           </div>
         </div>
      </div>
  </div>
</template>

<script>
import Header from '../../components/header'
import emptyMsg from '../../components/emptyMsg/index'
import {callPhoneFn} from '../../static/utils/utils';
import {Toast} from 'vant';
export default {
  beforeMount(){
    this.uu_id = this.$route.query.id
    this.getnew()
    this.machineryfile()
    this.second_handfile()
  },

  components:{
    Header,
    emptyMsg
  },
  data(){
    return{
      title:'供应商详情',
      More:false,
      Moreimg:false,
      Moretwo:false,
      Moreimgtwo:false,
      barshow:true,
      uu_id:'',
      list:{},
      companyScale:['<20', '20~39', '40~59', '60~99', '>=100'],
      phone:'',
      showphone:false,
      page:1,
      page_size:10,
      first:[],
      second:[]
    }
  },
  methods:{
    tel(){
      callPhoneFn(this.phone)
    },
    machinery(){
      this.barshow = true
    },
    second_hand(){
      this.barshow = false
    },
    // 获取数据
    getnew(){
      let params = {info:this.uu_id}
      this.$axios.get('/company/new-view',{params}).then(res=>{
        if(res)this.list = {...res.content}
      })
    },
    // 查看电话
    showNumber(id){
        this.$axios.post('/company/get-contact',{companyId:id}).then(res=>{
            console.log(res)
            if(res.code == 200){
              this.phone = res.content
              this.showphone = true
            }else if(res.code == 303){
                Toast(res.msg)
                this.$router.push('/user/get')
            }
        })
    },
    // 列表框
    machineryfile(){
      let params = {mode:2,company:this.uu_id,page:this.page,page_size:this.page_size}
      this.file(params,'first',2)
    },
    second_handfile(){
      let params = {mode:3,company:this.uu_id,page:this.page,page_size:this.page_size}
      let Moretwo = this.Moretwo
      let Moreimgtwo = this.Moreimgtwo
      this.file(params,'second',3)
    },
     file(params,list,mode){
        this.$axios.get('/company/release-list',{params}).then(res=>{
        this[list] = [...res.content]
        console.log(this.first,this.second)
        if(mode == 2){
             if(this[list].length == 0) this.Moreimg = true
             if(res.content.length < this.page_size && this[list].length>0)this.More = true
        }
        if(mode == 3){
             if(this[list].length == 0) this.Moreimgtwo = true,this.Moretwo = false
             if(res.content.length < this.page_size && this[list].length>0)this.Moretwo = true
        }
      })
     },
    // 跳转
    MachineInfo(mode,id){
        this.$router.push({
          path:'/view',query:{info:id,mode:mode}
        })
    }
  }
}
</script>

<style lang='scss' scoped>
@import './info.scss'
</style>
