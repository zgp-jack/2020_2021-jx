<template>
  <div class="large-turntable">
    <!-- 遮罩 -->
    <van-overlay :show="show" z-index="60">
      <div class="van-inner">
        <div class="inner-block">
          <div class="titles">玩法说明</div>
          <div class="play">
            <!-- shareCount:0,//分享总数
          videoCount:0,//获取视频总数 -->
            <p> 1、每天每人有{{Number(content.shareCount) + Number(content.videoCount)}}次抽奖机会</p>
            <p> 2、每天0点刷新抽奖机会</p>
            <p> 3、本活动最终解释权归鱼泡机械 平台所有</p>
            <p> 4、若经发现用户存在恶意违规行为，本平台有权取消其抽奖资格并 收回其抽奖所得。</p>
          </div>
          <div class="btn" @click="Cloes">继续抽奖</div>
        </div>
      </div>
    </van-overlay>
    <div class="turntable-container">
      <div class="turtable-right">
        <div class="inner" @click="goshow">
          玩法说明
        </div>
      </div>
      <div class="turntable-box">
        <div class="turntable-box-out" :class='[is_rotate?"luck-rotate":""]' :style="{transform:'rotate('+rotate+'deg)'}"></div>
        <div class="turntable-box-img" :class='[is_rotate?"luck-rotate":""]' :style="{transform:'rotate('+rotate+'deg)'}"></div>
        <div class="turntable-btn">
          <div class="turntable-btn-click" @click="!isComplete?int():startTurnTbale($event)"></div>
        </div>

      </div>
      <!-- lotteryNumber:0,//该用户剩余抽奖次数
          viewVideoNumber:0,//该用户剩余看视频次数
          shareNumber:0, //该用户剩余分享次数
          shareCount:0,//分享总数
          videoCount:0,//获取视频总数 -->
      <div class="turntable-timesbox">今日可抽奖：<span id="turntable-times">{{Number(content.viewVideoNumber)+Number(content.shareNumber)+Number(content.lotteryNumber)}}</span>次
        <!-- <span @click="!isComplete?int():appWatchVideo()" class="turntable-span-img"></span> -->
      </div>

      <div class="turntable-tasks" v-if="content.viewVideoNumber!=0 || content.shareNumber!=0">
        <img src="../../assets/img/luck/task_top.png" alt="" class="task_top">
        <img src="../../assets/img/luck/task_center.png" alt="" class="task_center" :style="{'height':content.viewVideoNumber==0 || content.shareNumber==0? '0.6rem':'auto'}">
        <img src="../../assets/img/luck/task_bottom.png" alt="">
        <div class="task_inner">
            <div class="turntable-task-item clearfix" v-if="content.viewVideoNumber!=0">
              <span>看视频剩余次数(<span id="overvideo">{{content.videoCount - content.viewVideoNumber}}</span>/<span id="allvideo">{{content.videoCount}}</span>)</span>
              <div :class="content.viewVideoNumber==0?'turntable-task-hui fr':'fr'" @click="!isComplete?int():(content.viewVideoNumber==0?()=>{}:appWatchVideo())" data-end="0" >去抽奖</div>
            </div>
            <div class="turntable-task-item clearfix" v-if="content.shareNumber!=0">
              <span>分享好友剩余次数(<span id="overshare">{{content.shareCount - content.shareNumber}}</span>/<span id="allshare">{{content.shareCount}}</span>)</span>
              <div :class="content.shareNumber==0?'turntable-task-hui fr':'fr'"  @click="!isComplete?int():appShare()">去抽奖</div>
            </div>
        </div>
      </div>

      <!-- <div class="turntable-tipsbox">
        <div class="turntable-tips-title">每天看视频或分享好友可获得抽奖次数</div>
        <div class="turntable-tips-body">[小妙招：连续观看3次视频后抽奖，中奖机率更高哦]</div>
      </div> -->
      <div class="turntable-orderbox">
        <div class="turntable-order" onclick="gailu">
          <!-- @change='scrollFlish' -->
          <van-swipe class="my-swipe turntable-order-lists" :autoplay="3000" indicator-color="white" id="orderlsits" vertical style="height: 3.35rem;" :touchable="false" :duration="1000" ref="resize" >
            <!-- vertical -->
            <van-swipe-item v-for="(item,index) in renderNameArr" :key="index" class="turntable-order-item">
              <div class="turntable-order-item" v-for="(item,index) in item" :key="index">
                 {{timeArr[index]}} "{{item.name}}" 中奖 ! 获得 {{item.integral}} 鱼泡币
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="turntable-tips" v-if="isiOS">本活动兑换奖品由鱼泡网提供，奖品发放及后续服务均由产品赞助方鱼泡网提供，与Apple Inc.无关。</div>
    </div>
  </div>
</template> 
<script>
  import { NoticeBar,Dialog,Swipe,SwipeItem,Overlay } from 'vant';
  import jsBridge from '../../static/utils/JSbridge';
  import {formatDate} from '../../static/utils/utils';
  let bridge;
  export default{　
    components:{
      'van-swipe':Swipe,
      'van-swipe-item':SwipeItem,
      'van-overlay':Overlay
    },
    data(){
      return{
        firstName : "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴鬱胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易",
        lastName : ["先生", "先生", "先生", "先生", "先生", "先生", "先生", "女士", "女士", "女士"],
        integralArr : [1,3,10,100,300],
        firstNameArr:[],
        nameArr:[],
        renderNameArr:[],
        content:{
          lotteryNumber:0,//该用户剩余抽奖次数
          viewVideoNumber:0,//该用户剩余看视频次数
          shareNumber:0, //该用户剩余分享次数
          shareCount:0,//分享总数
          videoCount:0,//获取视频总数
          turn_table_video_scale:null,//看视频类型比列
        },
        rotate:30,
        is_rotate:false,//判断是否正在抽奖
        // userInfo:{},
        title:'鱼泡机械-幸运大转盘',
        isiOS:false,//判断用户机型
        source:'',//判断用户机型
        isComplete:false,//是否初始化完成
        time:new Date(),
        show:false,
        timeArr:[],
        allright:[], //关闭后不弹
        // success:false // 是否为4次后的分享成功,
        watched:true  //看完视频后
      }
    },
    // 过滤器
    filters:{
      currens(val){
        let add = formatDate(val,'h:mm:ss')
        return add
      }
    },
    created() {
     const {id,token} =  this.$route.query;
     if(id && token){
       this.$cookies.set('id',id)
       this.$cookies.set('token',token)
     }
    },
    beforeMount(){
      bridge = jsBridge();
      this.firstNameArr = this.firstName.split("");
      // this.$set(this,"userInfo",this.$nuxt.$store.state.userinfo);
    },
    mounted(){
      this.isiOS = bridge.isiOS;
      this.source = bridge.isiOS?'?source=IOS':'?source=Android'
      this.getNameArr();
      this.initUserInfo();
      this.getAPPDate()
      setTimeout(()=>{
        this.$refs.resize.resize()
      },0)
    },
    methods:{
      // 滚动时间
      scrollFlish(){
        let timeArr = [];
        let time = new Date().getTime() - 60*1000;
        for(let i = 4; i > 0; i--){
          let beforTime = time - i*3000/4;
          let beforHMS = formatDate(beforTime,"h:mm:ss");
          timeArr.push(beforHMS)
        }
        this.timeArr = [...timeArr]
      },
      Cloes(){
        this.show = false
      },
      // 弹窗
      goshow(){
        //转动的时候不允许操作
        if(this.is_rotate) return false;

        this.show = true
      },
      //随机数
      getRand(start, end) {
        if (start == 0) return Math.floor((end + 1) * Math.random());
        return Math.floor(Math.random() * end + 1);
      },
      //获取用户信息
      initUserInfo(){
        let  that = this
        this.isComplete = false;
        this.$axios.post("/turn-table/get-user-lottery-info" + this.source).then(res=>{
          if(res && res.code == 200){
            this.isComplete = true;
            console.log(res)
            this.content = {...res.content.info,...res.content.videoConf};
            let {videoCount} = this.content
            for(let i = 0;i<videoCount;i++){
              that.allright.push({ok:false})
            }
          }else{
            this.isComplete = 0;
          }
        }).catch(()=>{
            this.isComplete = 0;
          })
      },
      //得到姓名
      getNameArr(){
        let nameNum = 200;
        var firstLen = this.firstName.length - 1;
        var lastLen = this.lastName.length - 1;
        for(let i = 0; i < nameNum; i++){
          var nameStr = this.firstNameArr[this.getRand(0, firstLen)] + this.lastName[this.getRand(0, lastLen)];
          var integral = this.integralArr[this.getRand(0, this["integralArr"].length - 1)];
          let timer = new Date()
          this.nameArr.push({ name: nameStr, integral: integral,star:1});
        }
        let newarr =[]
        let arr = [];
        this.nameArr.forEach((element,index) => {
          arr.push(element)
          if((index+1) % 4 ==0 ){
            newarr.push([...arr])
            arr=[]
          }
        });
        this.renderNameArr = newarr;
        // this.scrollFlish()
      },
      //点击抽奖
      startTurnTbale(e=null){
           const that = this
           console.log(that.content.lotteryNumber)
          //  用户没有分享最后一次抽奖强制分享
          //  lotteryNumber:0,//该用户剩余抽奖次数
          // viewVideoNumber:0,//该用户剩余看视频次数
          // shareNumber:0, //该用户剩余分享次数
          // shareCount:0,//分享总数
          // videoCount:0,//获取视频总数
           const {viewVideoNumber,lotteryNumber,shareNumber,videoCount} = that.content;
           let contry = Number(viewVideoNumber) + Number(lotteryNumber)
           if(shareNumber !=0 && contry == 0) {
             that.appShare()
             return false;
            //  if(!that.success) return false
           }
           if(videoCount - viewVideoNumber >0 && shareNumber !=0 && e){
             let numbers =Math.floor(Math.random()*2+1);
             let num = videoCount - viewVideoNumber;
             if(numbers == 1 && !that.allright[num].ok){
               that.appShare()
               that.allright[num].ok = true
               return false
             }
           }

           if(that.is_rotate) return false;
           if(!that.intercept()){
             return false
           }
           let ad = that.videoType();

           if(that.content.lotteryNumber ==0){
              Dialog.confirm({
                title:"提示",
                message:"需要观看视频后，才能抽奖",
                confirmButtonColor:"#EF9F38",
                }).then(()=>{
                that.watched = true
                bridge.callHandler('playVideo',{type:ad})
              }).catch(()=>{
                 that.watched = false
              })
              return false;
           }
           that.$axios.post('/turn-table/do-lottery' + that.source).then(res=>{
           if(res && res.code == 200 || that.content.lotteryNumber>0){
             that.is_rotate = true
             const {prizeKey} = res.content
             let rotates = 0
             switch (prizeKey) {
                        case 0 : rotates = 60 //0
                        break;
                        case 1 : rotates= 120 //1
                        break;
                        case 2 : rotates = -120 //3
                        break;
                        case 3 : rotates = -60 //10
                        break;
                        case 4 : rotates = -180 //100
                        break;
                        case 5 : rotates = 0 //300
                        break;
                            }
             this.rotate = 9*360+rotates

             this.content.lotteryNumber -=1;

             //避免12点以后数据没变的问题
            //  this.initUserInfo()

             setTimeout(()=>{
              // Dialog.confirm({
              //   title:"提示",
              //   message:res.msg,
              // }).then(()=>{
              //   this.rotate = 30
              //   this.is_rotate = false
              // }).catch(()=>{
              //   this.rotate = 30
              //   this.is_rotate = false
              // })
              Dialog.alert({
                title:'提示',
                message: res.msg,
              }).then(res=>{
                this.rotate = 30
                this.is_rotate = false
              })
             },5200)
           }

         })
      },
      // 看视频
      appWatchVideo(){
        const that = this;
        //转动的时候不允许操作
        if(that.is_rotate) return false;

        if(!that.intercept()){
          return false
        }
        if(that.content.viewVideoNumber == 0  && that.content.shareNumber>0){
          // Dialog.confirm({
          //   title:"提示",
          //   message:"分享给微信好友，可再获得1次抽奖机会",
          //   cancelButtonText: '取消',
          //   confirmButtonText: '去分享',
          // }).then(function(){
          //   that.appShare()
          // })
          that.appShare()
          return false
          //分享和看视频的次数都已经用完了
        }else if(that.content.viewVideoNumber == 0 && that.content.shareNumber == 0 ){
            // Dialog.alert({
            //   title:"提示",
            //   message:"今日抽奖次数已达上限，请明天再来",
            //   confirmButtonColor:"#EF9F38",
            // })
            that.appShare()
          return false
        }
        let ad = that.videoType();
        bridge.callHandler('playVideo',{type:ad})
      },
      //看视频成功的回调
      watchVideo(){
          let that = this;
          let ad = that.videoType();
          that.$axios.post('/turn-table/view-video' + that.source).then(res=>{//{hamapi:that.userInfo.id}

          //避免12点以后数据没变的问题
          // that.initUserInfo()
          // lotteryNumber:0,//该用户剩余抽奖次数
          // viewVideoNumber:0,//该用户剩余看视频次数
          // shareNumber:0, //该用户剩余分享次数
          // shareCount:0,//分享总数
          // videoCount:0,//获取视频总数
          // turn_table_video_scale:null,//看视频类型比列

          if(res && res.code == 200){
            that.content.lotteryNumber +=1
            that.content.viewVideoNumber -=1
            // if(that.content.viewVideoNumber ==0 && that.content.shareNumber >0 ){
            //   if(shareNumber !=0 && contry == 1){
            //     Dialog.confirm({
            //       title:"小妙招",
            //       message:'恭喜你，获得1次抽奖机会。分享给好友可再获得1次抽奖机会。',
            //       confirmButtonText: '去分享',
            //       confirmButtonColor:"#EF9F38",
            //     }).then(()=>{
            //       that.appShare()
            //     })
            // }else{
            //   // Dialog.confirm({
            //   //   title:"提示",
            //   //   message:res.msg,
            //   //   cancelButtonText: '去抽奖',
            //   //   confirmButtonText: '继续观看',
            //   //   confirmButtonColor:"#EF9F38",
            //   // }).then(()=>{
            //   // bridge.callHandler('playVideo',{"type":ad})
            //   // }).catch(()=>{
            //   //   console.log('取消')
            //   // })
            //   //看完视频强制抽奖
            //   that.startTurnTbale()
            // }
            //看完视频强制抽奖
            that.startTurnTbale()
          }
          // if(res && res.code == 500){
          //   Dialog.alert({
          //     title:"谢谢参与",
          //     message:res.msg,
          //   })
          //   that.content.viewVideoNumber = 0
          // }
        })
      },
      //分享好友
      appShare(){
        //转动的时候不允许操作
        if(this.is_rotate) return false;
        const {shareNumber} = this.content;
        let data = {
          shareNumber:String(shareNumber)
        }
        bridge.callHandler('share',data);
      },
      // 分享成功后的回调
      shareEndAction(){
        let that = this
        that.$axios.post('/turn-table/turn-share' + that.source).then(function(res){//{hamapi:this.userInfo.id}
          if(res && res.code == 200){
            // that.success = true

            that.content.lotteryNumber +=1
            that.content.shareNumber-=1

            //避免12点以后数据没变的问题
            // that.initUserInfo()

            //关闭弹框直接去抽奖
            // Dialog.confirm({
            //   title:"分享成功",
            //   message:'获得1次抽奖机会。',
            //   confirmButtonText: '去抽奖',
            //   confirmButtonColor:"#EF9F38",
            // })
            that.startTurnTbale()

          }
          // else if(res && res.code == 500){
          //   Dialog.alert({
          //       title:'提示',
          //       message:res.msg,
          //       confirmButtonText:"确定",
          //   })
          //   that.content.shareNumber = 0
          // }
        })
      },
      // 获取次数
      intercept(){

        //转动的时候不允许操作
        if(this.is_rotate) return false;

        if(this.content.lotteryNumber ==0 &&  this.content.viewVideoNumber ==0){
          // Dialog.alert({
          //   title:'谢谢参与',
          //   message:'今日获取抽奖次数已达上限，请明天再来',
          // })
          //没有次数了调分享
          this.appShare()
          return false
        }
        return true
      },
      // 返回上级
      goBack(){
        let that = this;
        //转动的时候不允许操作
        if(that.is_rotate) return false;

        let data = {
            "returnTimes": 0,
            "msg": '',
        }
        that.$axios.post('/turn-table/quit' + that.source).then(function(res){
          if(res && res.code == 200){
            data.returnTimes = 0;
            bridge.callHandler(
            'finish'
            , data
          );
          }
          else if(res && res.code == 500){
            // Dialog.confirm({
            //   title:"提示",
            //   message:res.msg,
            //   confirmButtonText: '继续抽奖',
            //   cancelButtonText: '下次再来',
            // }).catch(function(){
            //   // that.$router.go(-1)
            // })
            data.returnTimes = 1;
            data.msg = res.msg;
            bridge.callHandler(
              'finish'
              , data
            );
          }
          else{
            bridge.callHandler(
              'finish'
              , data
            );
          }
        }).catch(()=>{
            //请求失败允许返回
            bridge.callHandler(
              'finish'
              , data
            );
        })
      },
      // APP 调js
      getAPPDate(){
        const that = this;
        bridge.registerHandler('stopPlayVideo',function(){
          // 视频观看完成
          that.watchVideo()
        })
        bridge.registerHandler('shareEndAction',function(){
          // 分享成功
          that.shareEndAction()
        })
        bridge.registerHandler('getUserReturnTimes',function(){
          that.goBack()
        })
      },

      videoType(){
        // content:{
        // lotteryNumber:0,//该用户剩余抽奖次数
        //   viewVideoNumber:0,//该用户剩余看视频次数
        //   shareNumber:0, //该用户剩余分享次数
        //   shareCount:0,//分享总数
        //   videoCount:0,//获取视频总数
        // },
        // let num=Math.floor(Math.random()*4+1);
        let {lotteryNumber,viewVideoNumber,shareNumber,videoCount,shareCount,turn_table_video_scale} = this.content;
        turn_table_video_scale = turn_table_video_scale.split(',');
        //播放视频比例
        let num = Number(videoCount)  + Number(shareCount) - lotteryNumber - viewVideoNumber - shareNumber;

        //避免剩余看视频次数大于获取视频总数
        num = Math.abs(num);

        let type;
        if(num!=0 && ((num+1) % turn_table_video_scale.length ==0)){
          type = turn_table_video_scale[turn_table_video_scale.length - 1]
        }else{
          type = turn_table_video_scale[num % turn_table_video_scale.length]
        }
        return type
      },
      int(){
        const that = this;
        Dialog.alert({
          title:'提示',
          message: that.isComplete===0?'网络请求失败':'数据初始化中',
        })
      }
    }
  }
</script>

<style scoped lang='scss'>
  .van-inner{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
      .inner-block{
          width:5.8rem;
          // height:6.5rem;
          background-color: #fff;
          border-radius:0.2rem;
          padding:0.43rem 0.42rem;
          text-align: center;
          font-size:0.28rem;
            .titles{
              font-size:0.35rem;
              font-weight:550;
            }
            .play{
              line-height:0.6rem;
              text-align: left;
              margin:0.3rem 0;
            }
            .btn{
              width:3.28rem;
              // height:0.62rem;
              background:#ffa926;
              border-radius:0.36rem;
              margin: 0 auto;
              line-height:0.72rem;
              color: #fff;
            }
      }
  }
  #{'/deep/'} .head{
    height: 1rem;
    overflow: hidden;
    width: 100%;
  }
  .large-turntable{
    width: 7.5rem;
    height: 100%;
  }
 .turntable-container{
     position: relative;
     width: 100%;
     padding: 0.5rem;
     height: 100%;
     background: url('http://cdn.yupao.com/newyupao/images/m-turntable-bg.png?t=1') no-repeat;
     background-size: 100% 100%;
     overflow: hidden;
 }
.turtable-right{
  position: absolute;
  right:-0.2rem;
    .inner{
      width:1.82rem;
      background:rgba(255,243,240,1);
      // box-shadow:0px 3px 0px 0px rgba(133,28,4,0.15), 0px 5px 6px 0px rgba(255,255,255,1);
      border-radius:0.29rem;
      font-size:0.3rem;
      text-align: center;
      line-height:0.57rem;
      color:#FF4B40;
    }
}
.turntable-box {
  position: relative;
  width: 6rem;
  height: 6rem;
  margin: 2.5rem auto 0;
}
.turntable-box-out{
  position: absolute;
  width: 6rem;
  height: 6rem;
  left: 0;
  top: 0;
  background: url('http://cdn.yupao.com/newyupao/images/m-turntable-out.png') no-repeat;
  background-size: 100% 100%;
  transform-origin: center;
  overflow: hidden;
}
.turntable-box-img{
  position: absolute;
  width: 6rem;
  height: 6rem;
  left: 0;
  top: 0;
  background: url('http://statics.zhaogongdi.com/common/lucky.png') no-repeat;
  background-size: 100% 100%;
  transform-origin: center;
}
.luck-rotate{
    transition: 5s;
  }
.turntable-btn {
  position: absolute;
  width: 6rem;
  height: 6rem;
  left: 85%;
  top: 75%;
  margin-left: -3rem;
  margin-top: -3rem;
  z-index: 5;
  background: url('../../assets/img/Lark.png') no-repeat;
  background-size: 30% 40%;
  transform-origin: center;
}
.turntable-btn-click{
  position: absolute;
  width: 100px;
  height: 100px;
  left: 16%;
  top: 20%;
  margin-left: -50px;
  margin-top: -50px;
  z-index: 15;
  border-radius: 50%;
  overflow: hidden;
}
 .turntable-timesbox{
    position: relative;
    color: white;
    font-size: 0.3rem;
    margin-top: 0.3rem;
    text-align: center;
    font-weight: 500;
  }
  .turntable-timesbox img{
    width: 2rem;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.2rem;
  }
  .turntable-tasks{
    position: relative;
    margin-top: 0.3rem;
    .task_inner{
      width: 100%;
      position: absolute;
      top:0.4rem;
    }
  }
  .turntable-task-item{
    position: relative;
    width: 100%;
    font-size: 0.3rem;
    color: #635050;
    padding: 0 0.4rem;
    //0.1839622641509434/12-13像素
  }
  img{
      display: block;
  }
  .turntable-task-item span{
    display: inline-block;
    line-height: 0.8rem;
  }
  .turntable-task-item div{
    margin-top: 0.1rem;
    line-height: 0.6rem;
    padding: 0 0.2rem;
    color: white;
    background-color: #fc6441;
    border-radius: 3px;
    font-size: 0.3rem;
  }
  .turntable-task-item .turntable-task-hui{
    background-color: #635050;
    color: #F0ECE9;
  }
  .turntable-task-item .turntable-task-dis{
    background-color: #ddd;
    color: #777;
  }
  .turntable-tipsbox{
    margin-top: 0.2rem;
    color: white;
    text-align: center;
    line-height: 0.5rem;
  }
  .turntable-tips-title{
    position: relative;
    font-weight: bold;
    font-size: 0.34rem;
  }
  .turntable-tips-body{
    font-size: 0.28rem;
  }
  .turntable-orderbox{
    position: relative;
    margin: 0.5rem auto 1rem;
    width: 100%;
    height: 4.2rem;
    background: url('http://cdn.yupao.com/newyupao/images/m-turntable-order.png') no-repeat;
    background-size: 100% 100%;
    padding: 0.65rem 0.2rem 0.2rem;
  }
  .turntable-order{
    position: relative;
    width: 100%;
    height: calc(100% - 0.1rem);
    overflow: hidden;
    margin-top: 0.1rem;
  }
  .turntable-order-lists{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
  .turntable-order-item{
    position: relative;
    line-height: 0.8rem;
    color: #635050;
    text-align: center;
    font-size: 0.28rem;
  }
  .turntable-tips{
    position: relative;
    margin:0 0 0.8rem;
    color: white;
    text-align: center;
    font-size: 0.26rem;
  }
  .turntable-span-img{
    display: inline-block;
    background: url("http://cdn.yupao.com/newyupao/images/m-turntable-gettimes.png") no-repeat;
    width:2rem;
    height:0.63rem;
    background-size: 100% 100%;
    vertical-align: middle;
    margin-left: 0.2rem;
  }

</style>
