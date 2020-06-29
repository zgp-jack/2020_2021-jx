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
              <div class="consume-two">
                  <p>消耗鱼泡币:<span>365</span></p>
                  <p>获取鱼泡币:<span>365</span></p>
              </div>
          </div>
          <div class="consume-content">
              <div class="consume-content-one">
                  <div class="consume-content-img"></div>
                  <div class="consume-center border-btn">
                      <div class="consume-content-text">
                      <p>查看求租</p>
                      <p>查看求租信息,消耗-3个鱼泡币
                      </p>
                      <span>2020-05-26 10:25</span>
                  </div>
                  <div class="consume-content-right">
                      <p>-3</p>
                        <img src="../../assets/img/consume/tou-right.png">
                  </div>
                  </div>
              </div>
              <div class="consume-content-one">
                  <div class="consume-content-img" style="background-color:#F0D01D;"></div>
                  <div class="consume-center border-btn">
                      <div class="consume-content-text">
                      <p>置顶出租消息 全国*1天</p>
                      <p>置顶出租消息,消耗-600鱼泡币
                      </p>
                      <span>2020-05-26 10:25</span>
                  </div>
                  <div class="consume-content-right">
                      <p>-600</p>
                        <img src="../../assets/img/consume/tou-right.png">
                  </div>
                  </div>
              </div>
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
          <van-popup position="bottom" :style="{height:'30%'}" v-model="shows">
              <van-picker
                show-toolbar
                :columns="columns"
                @confirm="(e)=>onConfirm(e)"
                @cancel="onCancel"
                :default-index="2"
                />
          </van-popup>
      </div>
  </div>
</template>

<script>
import Header from '../../components/header'
import Vue from 'vue'
import { Popup,DatetimePicker,Picker} from 'vant';
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Picker)
export default {
    created(){
        
    },
    components:{
        Header
    },
    data(){
        return{
            title:'鱼泡币消耗记录',
            show:false,
            shows:false,
            minDate: new Date(2000,1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            value:new Date(),
            columns:['查看求租','查看出租','全部分类','置顶求租','置顶出租'],
            classification:'消耗分类'
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
        },
        onCancel(){
            this.shows = false
        },
        onConfirm(value){
            this.shows = false
            this.classification = value
        }    
    },
}
</script>

<style lang='scss' scoped>
@import './isget.scss'
</style>
<style>
.van-picker__confirm{
        color:#FFAA26;
    }
</style>