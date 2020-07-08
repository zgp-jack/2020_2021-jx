<template>
  <div id="detail">
    <Header title="机械出租详情" />
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
                <span class="pay"><b></b>协商付款</span>
              </p>
              <div class="telphone">
                <p class="phone-num">{{detail_info.phone}}</p>
                <div class="opeart">
                  <p class="report">投诉</p>
                  <p class="show-complete-tel">查看完整电话</p>
                  <p class="complete-state">已租到</p>
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
       <div class="reminder">
         <span></span>
         <p>防骗警示:  达成交易前,请确认好对方身份,确认合同条款合理无误,在双方确认交易达成之前不要进行任何财务转账,交易双方可拍照保留证据,以免产生经济纠纷。若产生经济纠纷及恶劣影响。请立即报警，鱼泡机械配合调查但概不承担相应损失及责任。如遇诈骗信息请
          <b style="color: #f60;">“立即举报”</b>
        </p>
       </div>
       <!-- 底部 -->
       <div class="footer-opeart">
         <div class="cellcot-share"></div>
         <p class="show-all-tel"></p>
       </div>
    </div>

  </div>

</template>

<script>
  import VerticalBanner from "../../components/vertical_banner";
  export default{
    data(){
      return{
        detail_info:{}
      }
    },
    components:{
      VerticalBanner
    },
    created(){
      let that = this;
      //参数不完整跳转首页
      if(!(this.$route.query.info && this.$route.query.mode)){
        window.location.replace('/dist/home')
      }else{
       let params = {...this.$route.query}
       //根据参数请求数据
        this.$axios.get('/index/new-view',{params}).then(res=>{
          if(res.code == 200){
             // that.detail_info = {...res.content}
             that.$set(that,'detail_info',{...res.content})
             console.log(res)
          }
        })
      }
    },
    mounted() {
       console.log(this.detail_info);
    }
  }
</script>

<style lang='scss' scoped="scoped">
@import "./index.scss"
</style>
