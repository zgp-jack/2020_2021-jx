<template>
  <div class="large-turntable">
    <div class="head"></div>
    <div class="turntable-container">
      <div class="turntable-box">
        <div class="turntable-box-out" :class='[is_rotate?"luck-rotate":""]' :style="{'transform':is_rotate?'rotate('+rotate+'deg)':''}"></div>
        <div class="turntable-box-img" :class='[is_rotate?"luck-rotate":""]' :style="{'transform':is_rotate?'rotate('+rotate+'deg)':''}"></div>
        <div class="turntable-btn">
          <div class="turntable-btn-click" @click="startTurnTbale"></div>
        </div>

      </div>
      <div class="turntable-timesbox">我的抽奖次数：<span id="turntable-times">{{content.lotteryNumber}}</span>次
        <span @click='userSeeVideo' class="turntable-span-img"></span>
      </div>

      <div class="turntable-tasks">
        <div class="turntable-task-item">
          <span>看视频(<span id="overvideo">{{content.viewVideoNumber}}</span>/<span id="allvideo">50</span>)</span>
          <div class="turntable-task-video" @click="watchVideo" data-end="0" >去观看</div>
        </div>
        <div class="turntable-task-item">
          <span>分享好友(<span id="overshare">{{content.shareNumber}}</span>/<span id="allshare">1</span>)</span>
          <div class="turntable-task-share" @click="shareGoodFirend">去分享</div>
        </div>
      </div>

      <div class="turntable-tipsbox">
        <div class="turntable-tips-title">每天看视频或分享好友可获得抽奖次数</div>
        <div class="turntable-tips-body">[小妙招：连续观看3次视频后抽奖，中奖机率更高哦]</div>
      </div>
      <div class="turntable-orderbox">
        <div class="turntable-order" onclick="gailu">
          <ul class="turntable-order-lists" id="orderlsits">
             <li class="turntable-order-item" v-for="(item,index) in nameArr">恭喜 "{{item.name}}" 中奖 ! 获得 {{item.integral}} 鱼泡币</li>
          </ul>
        </div>
      </div>
      <div class="turntable-tips" >本活动兑换奖品由鱼泡网提供，奖品发放及后续服务均由产品赞助方鱼泡网提供，与Apple Inc.无关。</div>
    </div>
  </div>
</template>
<script>
  import { NoticeBar,Dialog,Toast } from 'vant';
  export default{
    data(){
      return{
        firstName : "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴鬱胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易",
        lastName : ["先生", "先生", "先生", "先生", "先生", "先生", "先生", "女士", "女士", "女士"],
        integralArr : [1,3,10,100,300],
        firstNameArr:[],
        nameArr:[],
        content:{
          lotteryNumber:0,//该用户剩余抽奖次数
          viewVideoNumber:0,//该用户剩余看视频次数
          shareNumber:0, //该用户剩余分享次数
        },
        rotate:0,
        is_rotate:false,
      }
    },
    created() {
      this.firstNameArr = this.firstName.split("");
      this.getNameArr();
      this.initUserInfo();
    },
    methods:{
      //随机数
      getRand(start, end) {
        if (start == 0) return Math.floor((end + 1) * Math.random());
        return Math.floor(Math.random() * end + 1);
      },
      //获取用户信息
      initUserInfo(){
        this.$axios.post("/turn-table/get-user-lottery-info").then(res=>{
          if(res.code == 200){
            console.log(res)
            this.content = {...res.content};
          }
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
          this.nameArr.push({ name: nameStr, integral: integral })
        }
      },
      //点击抽奖
      startTurnTbale(){
        let {lotteryNumber} = this.content
        if(lotteryNumber){
           this.$axios.post('/turn-table/do-lottery').then(res=>{
           console.log(res)
           if(res.code == 500) {
               Dialog.alert({
                 title:"谢谢参与",
                 message:res.msg,
               })
           }else if(res.code == 200){
             this.is_rotate = true
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
             this.content.lotteryNumber -=1
           }
         })
         this.is_rotate = false
        }
      },
      //看视频
      watchVideo(){
        this.$axios.post('/turn-table/view-video',{hamapi:"1247427"}).then(res=>{
          if(res.code == 200){
            Dialog.confirm({
            title:"恭喜你，获得1次抽奖机会。继续观看视频，中奖几率更高哦。",
            message:res.msg,
          }).then(()=>{
             let {lotteryNumber,viewVideoNumber} = this.content
              lotteryNumber +=1
              viewVideoNumber -=1
          }).catch(()=>{
             console.log('取消')
          })
          }
           if(res.code == 500){
          Dialog.alert({
            title:"谢谢参与",
            message:res.msg,
          })
        }
        })
      },
      //分享好友
      shareGoodFirend(){
        console.log("点击了分享好友")
      },
      // 获取次数
      intercept(){
        const {lotteryNumber,viewVideoNumber} = this.content;
        if(!lotteryNumber && !viewVideoNumber){
          Dialog.alert({
            title:'谢谢参与',
            message:'今日获取抽奖次数已达上限，请明天再来'
          })
          this.userSeeVideo()
          return false
        }
        return true
      },
      // 看视频
      userSeeVideo(){
        if(!this.intercept()){
          return false
        }else{
          alert('观看视频中..')
          return true
        }
      }
    }
  }
</script>

<style>
  .head{
    height: 1.01rem;
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
  left: 50%;
  top: 50%;
  margin-left: -3rem;
  margin-top: -3rem;
  z-index: 5;
  background: url('http://cdn.yupao.com/newyupao/images/m-turntable-btn.png') no-repeat;
  background-size: 100% 100%;
  transform-origin: center;
}
.turntable-btn-click{
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
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
  margin-top: 0.5rem;
}
 .turntable-timesbox{
    position: relative;
    color: white;
    font-size: 0.3rem;
    margin-top: 0.3rem;
    text-align: center;
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
    width: 100%;
    height: 3rem;
    background: url('http://cdn.yupao.com/newyupao/images/turntable-day-task.png') no-repeat;
    background-size: 100% 100%;
    padding: 0.9rem 0.2rem 0.2rem;
  }
  .turntable-task-item{
    position: relative;
    width: 100%;
    font-size: 0.3rem;
    color: #635050;
    padding: 0 0.2rem;
  }
  .turntable-task-item span{
    display: inline-block;
    line-height: 0.8rem;
  }
  .turntable-task-item div{
    position: absolute;
    line-height: 0.6rem;
    padding: 0 0.2rem;
    color: white;
    top: 0.1rem;
    right: 0.2rem;
    background-color: #fc6441;
    border-radius: 3px;
    font-size: 0.3rem;
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
    display: none;
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
