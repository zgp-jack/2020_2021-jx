<template>
  <div class="large-turntable">
    <div class="head"></div>
    <div class="turntable-container">
      <div class="turntable-box">
        <div class="turntable-box-out"></div>
        <div class="turntable-box-img"></div>
        <div class="turntable-btn">
          <div class="turntable-btn-click"></div>
        </div>

      </div>
      <div class="turntable-timesbox">我的抽奖次数：<span id="turntable-times">0</span>次
        <span onclick="userGetTimes()" class="turntable-span-img"></span>
      </div>

      <div class="turntable-tasks">
        <div class="turntable-task-item">
          <span>看视频(<span id="overvideo">0</span>/<span id="allvideo">0</span>)</span>
          <div class="turntable-task-video" data-end="0" >去观看</div>
        </div>
        <div class="turntable-task-item">
          <span>分享好友(<span id="overshare">0</span>/<span id="allshare">0</span>)</span>
          <div class="turntable-task-share" onclick="appShare()">去分享</div>
        </div>
      </div>

      <div class="turntable-tipsbox">
        <div class="turntable-tips-title">每天看视频或分享好友可获得抽奖次数</div>
        <div class="turntable-tips-body">[小妙招：连续观看3次视频后抽奖，中奖机率更高哦]</div>
      </div>
      <div class="turntable-orderbox">
        <div class="turntable-order" onclick="gailu">
          <ul class="turntable-order-lists" id="orderlsits">
             <li class="turntable-order-item">恭喜 "张先生" 中奖 ! 获得 300 鱼泡币</li>
             <li class="turntable-order-item">恭喜 "张先生" 中奖 ! 获得 300 鱼泡币</li>
             <li class="turntable-order-item">恭喜 "张先生" 中奖 ! 获得 300 鱼泡币</li>
          </ul>
        </div>
      </div>
      <div class="turntable-tips" >本活动兑换奖品由鱼泡网提供，奖品发放及后续服务均由产品赞助方鱼泡网提供，与Apple Inc.无关。</div>
    </div>
  </div>
</template>
<script>

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
  background: url('http://cdn.yupao.com/newyupao/images/m-turntable-in.png') no-repeat;
  background-size: 100% 100%;
  transform-origin: center;
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
