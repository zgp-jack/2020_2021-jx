<template>
  <div id="detail">
    <Header :title="title" />
    <div class="detail_main">
       <div class="notice">
         <VerticalBanner :go_release="go_release" :go_settop="go_settop" type="1" />
       </div>
       <div class="content">
          <div class="title-time">
            <h1 class="title">{{detail_info.title}}</h1>
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
            <h2 class="title">机械类型</h2>
            <div class="type-list">
              <b v-for="(item,index) in detail_info.class" :key="index">{{item.name}}</b>
            </div>
          </div>
          <div class="detail-info" :style="{'margin-bottom': (detail_info.images && detail_info.images.length>0 ? '' : '0.35rem')}">
            <h2 class="title">详情信息</h2>
            <p class="detail-content" :class="{'show_spot':show_wath_all}" ref="detail_content">{{detail_info.desc}}</p>
            <p class="show-all-text" v-if="show_wath_all" @click="watchAll">... <b style="color: #f60;">查看全部</b></p>
          </div>
          <div class="machine-imgs" v-if="detail_info.images && detail_info.images.length>0">
            <div v-for="(item,index) in detail_info.images" @click="showImage(index)" :key="index">
              <img :src="item" alt="">
            </div>

          </div>
          <div class="address">
            <h2 class="title">所在地址</h2>
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
               <img :src="[is_collection ? require('../../../assets/img/detail/collect_active.png') : require('../../../assets/img/detail/collect.png')]" alt="">
             </span>
             <b>{{is_collection ? "已收藏" : "收藏"}}</b>
           </p>
           <p class="share" @click="shareFn">
             <span>
               <img src="../../../assets/img/detail/share.png" alt="">
             </span>
             <b>分享</b>
           </p>
           <p class="report" @click="reportFn(detail_info.phone)">
             <span>
               <img src="../../../assets/img/detail/report.png" alt="">
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
  import VerticalBanner from "../../../components/vertical_banner";
  import pageView from "../../../components/page-view";
  import { Dialog, ImagePreview,Toast } from 'vant';
  import {showPhoneFn, callPhoneFn, whetherLogin, getNovicePoint, setNovicePoint,getRequestQuery} from '../../../static/utils/utils.js';
  import {SEO_VIEW_KEYWORDS,MechanicalNum_link} from '../../../static/utils/link.js';
  export default{
    data(){
      return{
        mode:1,
        title:"机械出租详情",
        detail_info:{
          class:[]
        },
        call_phone:false,
        show_complete_tel:false,
        complete:false,
        is_mine:false,
        is_collection:false, //1收藏false  2取消收藏true
        state_text:"已出租",
        go_release:false, //去发布
        go_settop:false,  //去置顶
        show_wath_all:false,
        novice_point_alert:true,
        info:'',
      }
    },
    head(){
      return {
        title: this.detail_info.title,
        meta: [
          { hid: 'description', name: 'description', content: this.detail_info.desc },
          { name: "keywords", content: SEO_VIEW_KEYWORDS[this.mode] +  this.detail_info.class.map(item=>item.name).join(',')},
        ]
      }
    },
    async asyncData ({$axios,route}) {
      let parmesArr = route.path.split('/');
      let mode = MechanicalNum_link[parmesArr[1]];
      let info = parmesArr[2].split('.')[0];
      return await $axios.post('/index/new-view?source=M&' + getRequestQuery({mode,info})).then(res=>{
        if(res.code == 200){
            return {
              detail_info:{...res.content}
            }
        }
      })
    },
    created(){
      let parmesArr = this.$route.path.split('/');
      this.info = parmesArr[2].split('.')[0];
      this.mode = MechanicalNum_link[parmesArr[1]];

      let list_id = parmesArr[2].split('.')[0]
      this.changeTitle(this.mode);// 改变标题
    },
    components:{
      VerticalBanner,
      "van-dialog": Dialog.Component,
      [ImagePreview.Component.name]: ImagePreview.Component,
      pageView
    },
    mounted(){
      let params = {...this.$route.query};
      let guide = getNovicePoint();
      if(!guide.detail) this.novice_point_alert = false
        // 状态的显示
        this.allState(this.detail_info);
        //获取详情的高度
        this.detailContnetHeight()
      
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
           if(detail_content_height>maxHeight) this.show_wath_all = true;
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
        this.is_collection = obj.collection;//是否已经收藏
        if(obj.is_author){//该信息是不是自己的
           this.is_mine = true;
           return false;
        }
        if(obj.status == 2){ // 状态是不是已完成
          this.complete = true;
          this.detail_info.phone = this.detail_info.phone.slice(0,7) + "***";
          if(this.$route.query.mode == 1) this.state_text = "已租到";
          else if(this.$route.query.mode == 2) this.state_text = "已出租";
          else this.state_text = "已完成";
          return false;
        }
        let reg = /\*+/g;
        if(reg.test(obj.phone)){//是否查看了完整电话号码
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
        if(whetherLogin(this) == false) return false;
        let params = {id, mode:this.mode};
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
        }else this.showPhone(id);
      },
      //投诉
      reportFn(phone){
        if(whetherLogin(this) == false) return;
        // 判断是否已完成
        if(this.detail_info.status == 2){
          // alert({title:'温馨提示',content:''})
          Dialog.alert({
            title: '温馨提示',
            message: '不能举报已完成的信息',
          })
          return false;
        }
        let reg = /\*+/g;
        let params = {id:this.detail_info.uu,mode:this.mode,};
        if(reg.test(phone)){
          Dialog.confirm({
            title: '提示',
            message: '您还没查看电话号码，查看电话号码 之后才能投诉。',
            confirmButtonText:"查看电话",
            confirmButtonColor:"#EF9F38"

          }).then(()=>{
            showPhoneFn(this,Toast,params,(tel)=>{
              // this.$router.push({path:'/set/report',query:this.$route.query});
              this.show_complete_tel = false;
              this.call_phone = true;
              this.detail_info.phone = tel;
            })
          }).catch(()=>{})
        }else{
          //跳转到投诉页面
          this.$router.push({path:'/set/report', query:{mode:this.mode,info:this.info}})
        }
      },
      //查看全部
      watchAll(){
        this.show_wath_all = false;
      },
      showImage(index){//展示图片
        let that = this;
        ImagePreview({images:that.detail_info.images,startPosition:index,closeable:true})
      },
      shareFn(){//分享
        if(whetherLogin(this) == false) return;
        this.$router.push("/user/invitation")
      },
      cellectFn(id){ //收藏
        if(whetherLogin(this) == false) return;
        let that = this;
        let data = {id, mode:this.mode, type:(this.is_collection ? "2" : "1")}
         //发起ajax请求
         this.$axios.post('/index/collection',{data:JSON.stringify(data)}).then(res=>{
           if(res.code == 200){
            this.alert({title:"温馨提示",content:(data.type==2?"取消收藏":"收藏成功")})
              that.is_collection = !that.is_collection;
           }
         })
      },
      alert(data){ //alert弹窗封装
        Dialog.alert({ title:data.title, message: data.content
        }).then(()=>{
          typeof data.callback == 'function' && data.callback;
        })
      }
    }
  }
</script>

<style lang='scss' scoped="scoped">
@import "./index.scss"
</style>
