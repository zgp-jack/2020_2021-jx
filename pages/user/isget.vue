<template>
  <div>
      <Header :title="title"/>
      <div class="mother">
          <div class="consume-title">
              <div class="consume-one border-btn">
                  <p @click="showPopup">
                    {{value | moment}}
                    <img :class="[show?'rotate':'']" src="../../assets/img/consume/tou-bottom.png">
                  </p>
                  <p @click="showPopups">{{classification}}
                      <img :class="[shows?'rotate':'']" src="../../assets/img/consume/tou-bottom.png" alt="">
                  </p>
              </div>
          </div>
        <div style="margin-top:1.5rem">
         <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
          v-if="list.length"
          v-model="listLoading"
          :finished="iscomplete"
          @load="getrec"
          :loading-text="text">
          <div class="consume-content" v-for="(item,i) in list" :key="i" @click="go(item)">
              <div class="consume-content-one">
                  <div class="consume-content-img"><img :src="item.icon"></div>
                  <div class="consume-center border-btn">
                      <div class="consume-content-text">
                      <p>{{item.topic}}</p>
                      <p>{{item.desc}}
                      </p>
                      <span>{{item.time}}</span>
                  </div>
                  <div class="consume-content-right">
                      <p v-if="mode==1">+{{item.coin}}</p>
                      <p v-else>-{{item.coin}}</p>
                      <img src="../../assets/img/consume/tou-right.png" v-if="mode==0">
                  </div>
                  </div>
              </div>
          </div>
          </van-list>
           <emptyMsg  :empty1='true' v-if='More'/>
           <emptyMsg  :empty2='true' v-if='Moreimg' test = 'true'/>
           <div class="not-consume" v-if="not_consume">
             <p>暂无鱼泡币消耗记录<br />查看完整电话或置顶消息会生成消耗记录</p>
             <button @click="to_page">查看求租/出租机械</button>
           </div>
           <div class="not-consume" v-if="not_origin">
             <p>暂无鱼泡币来源记录<br />签到、发布消息可免费获得鱼泡币</p>
             <button @click="to_page">免费获取鱼泡币</button>
           </div>
         </van-pull-refresh>
       </div>  
          <van-popup v-model="show" position="bottom" :style="{height:'30%'}">
              <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                 @cancel='cancel()' @confirm='(e)=>{confirm(e)}'/>
          </van-popup>
          <van-popup position="bottom" :style="{height:'30%'}" v-model="shows" visible-item-count=1>
              <van-picker
                show-toolbar
                :columns="columns"
                @confirm="(e)=>onConfirm(e)"
                @cancel="onCancel"
                :default-index="0"
                ref='getindex'
                />
          </van-popup>
      </div>
  </div>
</template>

<script>
import Header from '../../components/header'
import Vue from 'vue'
import { Popup,DatetimePicker,Picker,List, Toast,PullRefresh} from 'vant';
import {formatDate,getRequestQuery} from '../../static/utils/utils'
import emptyMsg from '../../components/emptyMsg/index'
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Picker)
export default {
    beforeMount(){
      this.mode = this.$route.query.mode
      if(this.mode == 1){
        this.fenleiindex = ''
        this.title = '鱼泡币来源记录'
      }
      this.getcoin()
    },
    components:{
        Header,
        emptyMsg,
        'van-list':List,
        'van-pull-refresh':PullRefresh,
    },
    data(){
        return{
            title:'鱼泡币消耗记录',
            show:false,
            shows:false,
            minDate: '',
            maxDate: '',
            currentDate: new Date(),
            value:new Date(),
            columns:['全部分类'],
            classification:'全部分类',
            page:1,
            page_size:10,
            valuetime:'',
            fenleiindex:0,
            More:false,
            Moreimg:false,
            list:[],
            listLoading:false,
            iscomplete:false,
            mode:0,
            isLoading:false,
            text:'加载中...',
            not_consume:false,
            not_origin:false
        }
    },
    methods:{
      // 下拉刷新
      onRefresh(){
         this.page = 1
         this.More = false
         this.list = []
         this.getrec()
         this.isLoading= false;
      },
        showPopup(){
            this.show = true
        },
        showPopups(){
           this.shows = true
        },
        formatter(type,val){
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
                return val;
            },
        cancel(){
            this.show = false
        },
        confirm(value){
            this.show = false
            this.value = value
            let valuetime = formatDate(this.value.toLocaleDateString(),'yyyy-MM')
            this.valuetime = valuetime
            this.getcoll()
        },
        onCancel(){
            this.shows = false
        },
        onConfirm(value){
            this.shows = false
            this.classification = value
            let indexs = this.$refs.getindex.getIndexes()[0]
            if(this.mode == 1) indexs-=1
            this.fenleiindex = indexs
            this.getcoll()
        },
        // 获取配置数据
        getcoin(){
            let params = {type:this.mode}
             this.$axios.post('/coin/record-conf?'+getRequestQuery(params)).then(res=>{
             const {category,searchDate} = res.content
             let timeList = [...searchDate]
             this.minDate = new Date(timeList[0])
             this.maxDate = new Date(timeList[timeList.length-1])
             this.valuetime = formatDate(this.currentDate.toLocaleDateString(),'yyyy-MM')
             !this.columns?this.columns = [...category]:this.columns = [...this.columns,...category]
             this.getrec()
          })
        },
        // 获取输出数据
        getrec(){
          this.listLoading = true
          if(this.classification == '全部分类') this.fenleiindex = ''
          let params = {type:this.mode,page:this.page,page_size:this.page_size,date:this.valuetime,category:this.fenleiindex}
          this.$axios.post('/coin/record?'+getRequestQuery(params)).then(res=>{
            this.not_consume = false;
            this.not_origin = false
          if(res.content.list.length == 0) {
            this.noListData(params.category);
          }
          this.list = this.page == 1?[...res.content.list]:[...this.list,...res.content.list]
          res.content.list.length>=10?(this.iscomplete = false,this.page++):(this.iscomplete = true,this.More = true)
          this.listLoading = false
          this.list.length<=0?(this.Moreimg = true,this.More=false):(this.Moreimg = false)
          })
        },
        // 点击获取数据
        getcoll(){
         this.page = 1;
         this.More = false
         this.getrec()
      },
      // 跳转
      go(item){
        const {is_company,uu_id,type,is_forbidden,is_deleted} = item;
        if(is_deleted == 1){
          Toast("该信息已被删除");
          return false
        }
        if(is_forbidden == 1){
          Toast("该信息被投诉过多，无法进行查看");
          return false;
        }
        if(is_company == 0 && this.mode == 0){
            this.$router.push({
              path:'/view',
              query:{
                info:uu_id,
                mode:type
              }
            })
        }else if(is_company== 1){
          this.$router.push({
              path:'/company/info',
              query:{
                id:uu_id,
              }
            })
        }
      },
      //没有数据
      noListData(category){
        if(this.mode == 0){
          this.not_consume = true;
        }else{
          this.not_consume = false
        }
        if(this.mode == 1){
          this.not_origin = true;
        }else{
          this.not_origin = false
        }
      },
      to_page(){
        if(this.mode == 0) this.$router.push("/home")
        else this.$router.push("/user/get")
      }
    },

}
</script>

<style lang='scss'>
@import './isget.scss'
</style>
