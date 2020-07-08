<template>
  <div id="detail">
    <Header :title="title" />
    <div class="detail_main">
       <div class="notice">
         <VerticalBanner type="1" />
       </div>
       <div class="content">
          <div class="title-time">
            <p class="title">{{detail_info.title}}</p>
            <p class="time">发布时间：{{detail_info.time}}</p>
          </div>
          <div class="user-info">
            <div class="left-img" :style="{'background-image':'url('+(detail_info.header_img ? detail_info.header_img : 'http://statics.zhaogongdi.com/common/default_header.png')+')'}"></div>
            <div class="right-inner">
              <p class="name-pay">
                <span class="userName">{{detail_info.user}}</span>
                <span class="pay" v-if="mode == 1"><b></b>协商付款</span>
              </p>
              <div class="telphone">
                <p class="phone-num">{{detail_info.phone}}</p>
                <div class="opeart">
                  <p class="report" v-if="call_phone" @click="reportFn">投诉</p>
                  <p class="show-complete-tel" v-if="show_complete_tel" @click="showPhone(detail_info.uu)">查看完整电话</p>
                  <p class="complete-state" v-if="complete">已租到</p>
                  <p class="call-phone" v-if="call_phone" @click="callPhone">拨打电话</p>
                </div>
              </div>
              <div class="tips">联系我时，请说明是在<b style="color:red">“鱼泡机械”</b>上看到的</div>
            </div>
          </div>
          <div class="machine-type">
            <p class="title">机械类型</p>
            <div class="type-list">
              <b v-for="(item,index) in detail_info.class" :key="index">{{item.name}}</b>
            </div>
          </div>
          <div class="detail-info" :style="{'margin-bottom': (detail_info.images && detail_info.images.length>0 ? '' : '0.35rem')}">
            <p class="title">详情信息</p>
            <p class="detail-content">{{detail_info.desc}}</p>
            <p class="show-all-text">... <b style="color: #f60;">查看全部</b></p>
          </div>
          <div class="machine-imgs" v-if="detail_info.images && detail_info.images.length>0">
            <div v-for="(item,index) in detail_info.images">
              <img :src="item" alt="">
            </div>

          </div>
          <div class="address">
            <p class="title">所在地址</p>
            <p class="addree-info">{{detail_info.area}}</p>
          </div>
       </div>
       <!-- 防骗警告 -->
       <div class="reminder" v-if="!is_mine">
         <span></span>
         <p>防骗警示:  达成交易前,请确认好对方身份,确认合同条款合理无误,在双方确认交易达成之前不要进行任何财务转账,交易双方可拍照保留证据,以免产生经济纠纷。若产生经济纠纷及恶劣影响。请立即报警，鱼泡机械配合调查但概不承担相应损失及责任。如遇诈骗信息请
          <b style="color: #f60;">“立即举报”</b>
        </p>
       </div>
       <!-- 底部 -->
       <div class="footer-opeart" v-if="!is_mine">
         <div class="cellcot-share"></div>
         <p class="show-all-tel"></p>
       </div>
    </div>
    <!-- 发布弹窗 -->
    <!-- <BottomTop /> -->
  </div>

</template>

<script>
  import VerticalBanner from "../../components/vertical_banner";
  import BottomTop from '../../components/bottom-topbar/index'
  export default{
    data(){
      return{
        mode:1,
        title:"机械出租详情",
        detail_info:{},
        call_phone:false,
        show_complete_tel:false,
        complete:false,
        is_mine:false
      }
    },
    components:{
      VerticalBanner,
      BottomTop
    },
    created(){
      let that = this;
      //参数不完整跳转首页
      if(!(this.$route.query.info && this.$route.query.mode)){
        window.location.replace('/dist/home')
      }else{
       let params = {...this.$route.query};
       this.mode = this.$route.query.mode;
       // 改变标题
       this.changeTitle(this.mode);
       //根据参数请求数据
        this.$axios.get('/index/new-view',{params}).then(res=>{
          if(res.code == 200){
             that.$set(that,'detail_info',{...res.content})
             console.log(res.content)
             // 状态的显示
             that.allState(res.content);
          }
        })
      }
    },
    mounted() {
       console.log(this.detail_info);
    },
    methods:{
      // 改变标题
      changeTitle(mode){
        if(mode == 1){
          this.title = "机械求租详情"
        }else if(mode == 2){
          this.title = "机械出租详情"
        }else if(mode == 3){
          this.title = "机械转让详情"
        }else if(mode == 4){
          this.title = "机械求购详情"
        }
      },
      //状态的显示
      allState(obj){
        //该信息是不是自己的
        if(obj.is_author){
           this.is_mine = true;
           return false;
        }
        // 状态是不是已完成
        if(obj.status == 2){
          this.complete = true;
          this.detail_info.phone = this.detail_info.phone.slice(0,7) + "***";
          return false;
        }
        //是否查看了完整电话号码
        let reg = /\*+/g;
        if(reg.test(obj.phone)){
          this.show_complete_tel = true;
          return false;
        }else{
          this.call_phone = true;
          return false
        }
      },
      //查看完整电话
      showPhone(id){
        let that = this;
        //判断是否登录
        if(!"login"){
          this.$router.push("/login")
          return false;
        }
        let params = {};
        params.id = id;
        params.mode = this.mode;
        console.log(params)
        //进行ajax请求完整的电话号码
        if("success"){ //成功后
          that.show_complete_tel = false;
          that.call_phone = true;
          that.detail_info.phone = 18384374513;
        }
      },
      //拨打电话
      callPhone(){
        window.location.href = "tel:"+this.detail_info.phone
      },
      //投诉
      reportFn(){
        //跳转到投诉页面
        // this.$router.push('')
      }
    }
  }
</script>

<style lang='scss' scoped="scoped">
@import "./index.scss"
</style>
