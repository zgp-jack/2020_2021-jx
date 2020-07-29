<template>
  <div id="detail">
    <Header :title="title" />
    <div class="detail_main">
       <div class="notice">
         <VerticalBanner :go_release="go_release" :go_settop="go_settop" type="1" />
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
            </div>
            <div class="tips">联系我时，请说明是在<b style="color:red">“鱼泡机械”</b>上看到的</div>
          </div>
          <div class="machine-type">
            <p class="title">机械类型</p>
            <div class="type-list">
              <b v-for="(item,index) in detail_info.class" :key="index">{{item.name}}</b>
            </div>
          </div>
          <div class="detail-info" :style="{'margin-bottom': (detail_info.images && detail_info.images.length>0 ? '' : '0.35rem')}">
            <p class="title">详情信息</p>
            <p class="detail-content" :class="{'show_spot':show_wath_all}" ref="detail_content">{{detail_info.desc}}</p>
            <p class="show-all-text" v-if="show_wath_all" @click="watchAll">... <b style="color: #f60;">查看全部</b></p>
          </div>
          <div class="machine-imgs" v-if="detail_info.images && detail_info.images.length>0">
            <div v-for="(item,index) in detail_info.images" @click="showImage(index)" :key="index">
              <img :src="item" alt="">
            </div>

          </div>
          <div class="address">
            <p class="title">所在地址</p>
            <p class="addree-info">{{detail_info.area}}</p>
          </div>
       </div>
       <!-- 防骗警告 -->
       <div class="reminder" v-if="!is_mine" @click="reportFn(detail_info.phone)">
         <div class="inner">
           <span></span>
           <p>防骗警示:  达成交易前,请确认好对方身份,确认合同条款合理无误,在双方确认交易达成之前不要进行任何财务转账,交易双方可拍照保留证据,以免产生经济纠纷。若产生经济纠纷及恶劣影响。请立即报警，鱼泡机械配合调查但概不承担相应损失及责任。如遇诈骗信息请
            <b style="color: #f60;">“立即举报”</b>
           </p>
         </div>
       </div>
       <!-- 底部 -->
       <div class="footer-opeart" v-if="!is_mine">
         <div class="cellcot-share">
           <p class="cellect" @click="cellectFn(detail_info.uu)">
             <span>
               <img :src="[is_collection ? require('../../assets/img/detail/collect_active.png') : require('../../assets/img/detail/collect.png')]" alt="">
             </span>
             <b>{{is_collection ? "已收藏" : "收藏"}}</b>
           </p>
           <p class="share" @click="shareFn">
             <span>
               <img src="../../assets/img/detail/share.png" alt="">
             </span>
             <b>分享</b>
           </p>
           <p class="report" @click="reportFn(detail_info.phone)">
             <span>
               <img src="../../assets/img/detail/report.png" alt="">
             </span>
             <b>举报</b>
           </p>
         </div>
         <p class="show-all-tel" @click="callPhone(detail_info.uu)" v-if="detail_info.status != 2">
           {{call_phone?'拨打电话':'查看完整电话'}}
         </p>
         <p class="alread_complate" v-else>{{"已租到"}}</p>
       </div>
    </div>
    <!-- 举报弹框 -->
    <pageView v-if="novice_point_alert" @novicePointHiddens="novicePointHiddens" :show = 'novice_point_alert' />
  </div>

</template>

<script>
  import VerticalBanner from "../../components/vertical_banner";
  import pageView from "../../components/page-view";
  import { Dialog, ImagePreview,Toast } from 'vant';
  import {showPhoneFn, callPhoneFn, whetherLogin, getNovicePoint, setNovicePoint} from '../../static/utils/utils.js';
  export default{
    data(){
      return{
        mode:1,
        title:"机械出租详情",
        detail_info:{},
        call_phone:false,
        show_complete_tel:false,
        complete:false,
        is_mine:false,
        is_collection:false, //1收藏false  2取消收藏true
        state_text:"已出租",
        go_release:false, //去发布
        go_settop:false,  //去置顶
        show_wath_all:false,
        novice_point_alert:true
      }
    },
    components:{
      VerticalBanner,
      "van-dialog": Dialog.Component,
      [ImagePreview.Component.name]: ImagePreview.Component,
      pageView
    },
    mounted(){
      let guide = getNovicePoint();
      if(!guide.detail) this.novice_point_alert = false
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
             this.$set(this,'detail_info',{...res.content})
             // 状态的显示
             this.allState(res.content);
             //获取详情的高度
             this.detailContnetHeight()
          }else if(res.code == 500){
            Dialog.alert({
              title:"提示",
              message:res.msg,
            }).then(res=>{
              this.$router.go(-1)
            })
          }
        })
      }
    },
    methods:{
      // 关闭弹窗
      novicePointHiddens(page){
        this.novice_point_alert = page
      },
      //显示查看全部按钮
      detailContnetHeight(){
        setTimeout(()=>{
           let detail_content_height = this.$refs.detail_content.offsetHeight,
               maxHeight = parseFloat(document.documentElement.style.fontSize) * 1.2;
           if(detail_content_height>maxHeight){
             this.show_wath_all = true;
           }
        },0)
      },
      // 改变标题
      changeTitle(mode){
        if(mode == 1) this.title = "机械求租详情";
        else if(mode == 2) this.title = "机械出租详情";
        else if(mode == 3) this.title = "机械转让详情";
        else if(mode == 4) this.title = "机械求购详情"
      },
      //状态的显示
      allState(obj){
        //是否是新用户
        if(this.detail_info.roofTag == 1) this.go_release = true;
        else if(this.detail_info.roofTag == 2) this.go_settop = true;
        else if(this.detail_info.roofTag == 0){
          this.go_release = true;
          this.go_settop = true;
        }
        //是否已经收藏
        this.is_collection = obj.collection;
        //该信息是不是自己的
        if(obj.is_author){
           this.is_mine = true;
           return false;
        }
        // 状态是不是已完成
        if(obj.status == 2){
          this.complete = true;
          this.detail_info.phone = this.detail_info.phone.slice(0,7) + "***";
          if(this.$route.query.mode == 1) this.state_text = "已租到";
          else if(this.$route.query.mode == 2) this.state_text = "已出租";
          else this.state_text = "已完成";
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
        //判断是否登录
        whetherLogin(this)
        let params = {
          id,
          mode:this.mode,
        };
        //进行ajax请求完整的电话号码
        showPhoneFn(this,Toast,params,(tel)=>{
          this.show_complete_tel = false;
          this.call_phone = true;
          this.detail_info.phone = tel;
        })
      },
      //拨打电话
      callPhone(id){
        if(this.call_phone) {
          callPhoneFn(this.detail_info.phone)
          return false;
        }else{
          this.showPhone(id);
        }
      },
      //投诉
      reportFn(phone){
        if(whetherLogin(this) == false) return
        // 判断是否已完成
        if(this.detail_info.status == 2){
          Dialog.alert({
            title: '温馨提示',
            message: '不能举报已完成的信息',
          })
          return false;
        }
        let reg = /\*+/g;
        if(reg.test(phone)){
          Dialog.alert({
            title: '温馨提示',
            message: '请先查看完整号码后操作',
          })
        }else{
          //跳转到投诉页面
          this.$router.push({
            path:'/set/report',
            query:this.$route.query
          })
        }
      },
      //查看全部
      watchAll(){
        this.show_wath_all = false;
      },
      //展示图片
      showImage(index){
        let that = this;
        ImagePreview({images:that.detail_info.images,startPosition:index,closeable:true})
      },
      //分享
      shareFn(){
        this.$router.push("/user/invitation")
      },
      //收藏
      cellectFn(id){
        let that = this;
        let data = {
           id,
           mode:this.$route.query.mode,
           type:(this.is_collection ? "2" : "1")
         }
         //发起ajax请求
         this.$axios.post('/index/collection',{data:JSON.stringify(data)}).then(res=>{
           if(res.code == 200){
              Dialog.alert({
                title:"温馨提示",
                message: (data.type==2?"取消收藏":"收藏成功")
              });
              that.is_collection = !that.is_collection;
           }
         })
      }
    }
  }
</script>

<style lang='scss' scoped="scoped">
@import "./index.scss"
</style>
