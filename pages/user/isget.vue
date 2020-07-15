<template>
  <div>
      <Header :title="title"/>
      <div class="father">
          <div class="consume-title">
              <div class="consume-one border-btn">
                  <p @click="showPopup">
                    {{value | moment}}
                    <img src="../../assets/img/consume/tou-bottom.png">
                  </p>
                  <p @click="showPopups">{{classification}}
                      <img src="../../assets/img/consume/tou-bottom.png" alt="">
                  </p>
              </div>

          </div>
          <van-list
          v-if="list.length"
          v-model="listLoading"
          :finished="iscomplete"
          @load="getrec">
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
           <emptyMsg  :empty2='true' v-if='Moreimg'/>
          <van-popup v-model="show" position="bottom" :style="{height:'30%'}">
              <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                 @cancel='cancel()' @confirm='(e)=>{confirm(e)}'/>
          </van-popup>
          <van-popup position="bottom" :style="{height:'30%'}" v-model="shows">
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
import { Popup,DatetimePicker,Picker,List, Toast} from 'vant';
import {formatDate} from '../../static/utils/utils'
import emptyMsg from '../../components/emptyMsg/index'
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Picker)
export default {
    created(){
      this.mode = this.$route.query.mode
      if(this.mode == 1){
        this.fenleiindex = ''
      }
      this.getcoin()
    },
    components:{
        Header,
        emptyMsg,
        'van-list':List,
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
            mode:0
        }
    },
    methods:{
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
             this.$axios.get('/coin/record-conf',{params:{type:this.mode}}).then(res=>{
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
          this.$axios.get('/coin/record',{params}).then(res=>{
              console.log(res)
              this.listLoading = false
              this.list = !this.list.length?[...res.content.list]:[...this.list,...res.content.list]
              res.content.list.length>=10?(this.iscomplete = false,this.page++):(this.iscomplete = true,this.More = true)
              res.content.list.length<=0?(this.Moreimg = true,this.More=false):(this.Moreimg = false)
          })
        },
        // 点击获取数据
        getcoll(){
         this.page = 1;
         this.list = []
         this.getrec()
      },
      // 跳转
      go(item){
        // if(this.mode == 0){
        //   this.$router.push({
        //     path:'/view',
        //     query:{
        //       info:id,
        //       mode:1
        //     }
        // })
        // }else{
        //   return false
        // }
        const {is_deleted} = item
        if(is_deleted == 0){
            console.log(1)
        }else if(is_deleted == 1){
          Toast('此条信息已删除!')
        }
      }
    },
}
</script>

<style lang='scss' scoped>
@import './isget.scss'
</style>
