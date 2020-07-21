var time = parseInt($(".time").val())
var ctime = parseInt(new Date().getTime() / 1000) - time
var lucking = false
var mytimes = 0; //当前抽奖次数
var totalTimes = 0; // 总数
var allVideoTimes = 0; // 视频总数
var overVideoTimes = 0; // 视频已观看
var allShareTimes = 0; // 分享总数
var overShareTimes = 0; // 已分享次数
var dayLuck = 0; // 今日是否中过奖
createHtmlItem()
initUserTimes()
initJsBridge()

function initJsBridge() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

  if (isiOS) {
    $(".turntable-tips").show()
  }

  // 注册jsbridge
  function connectWebViewJavascriptBridge(callback) {
    if (isAndroid) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady'
          , function () {
            callback(WebViewJavascriptBridge)
          },
          false
        );
      }
      return;
    }

    if (isiOS) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }
  }

  // 调用注册方法
  connectWebViewJavascriptBridge(function (bridge) {
    if (isAndroid) {
      bridge.init(function (message, responseCallback) {

      });
    }

    //初始化
    bridge.registerHandler("stopPlayVideo", function (ad, responseCallback) {
      stopPlayVideo(ad)
    })
    bridge.registerHandler("shareEndAction", function (responseCallback) {
      shareEndAction()
    })
    bridge.registerHandler("getUserTimes", function (responseCallback) {
      getUserTimes()
    })
    bridge.registerHandler("toast", function (msg, responseCallback) {
      toast(msg)
    })
    bridge.registerHandler("getUserReturnTimes", function (responseCallback) {
      getUserReturnTimes()
    })
    

  });
}

function getRand(start, end) {
  if (start == 0) return Math.floor((end + 1) * Math.random());
  return Math.floor(Math.random() * end + 1);
}
function createOrderList() {
  var maxnum = 200;
  var firstName = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴鬱胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易".split("");
  var lastName = ["先生", "先生", "先生", "先生", "先生", "先生", "先生", "女士", "女士", "女士"];
  var _integral = [5, 5, 5, 5, 5, 10, 10, 10, 100, 300];
  var firstLen = firstName.length - 1;
  var lastLen = lastName.length - 1;
  var nameArr = [];
  for (var i = 0; i < maxnum; i++) {
    var nameStr = firstName[getRand(0, firstLen)] + lastName[getRand(0, lastLen)];
    var integral = _integral[getRand(0, _integral.length - 1)];
    nameArr.push({ name: nameStr, integral: integral });
  }
  return nameArr
}
function createHtmlItem() {
  var orderList = createOrderList()
  var tplHtml = template('items', { data: orderList });
  $("#orderlsits").html(tplHtml)
  setTimeout(function(){ scrollNotice(".turntable-order-lists", "0.8") }, 0)
}
// 外层动画展示与重置
function turntableOutRotate(flag) {
  if (flag) {
    $(".turntable-box-out").css("transition", "ease-in-out 5s")
    setTimeout(function () {
      $(".turntable-box-out").css("transform", "rotate(-1000deg)")
    })
  } else {
    $(".turntable-box-out").css("transition", "ease-in-out 0s")
    setTimeout(function () {
      $(".turntable-box-out").css("transform", "rotate(0)")
    }, 0)
  }
}
// 内层动画展示与重置
function turntableInRotate(flag, deg) {
  var mydeg = deg + (360 * 10)
  if (flag) {
    $(".turntable-box-img").css("transition", "ease-in-out 5s")
    setTimeout(function () {
      $(".turntable-box-img").css("transform", "rotate(" + mydeg + "deg)")
    })
  } else {
    $(".turntable-box-img").css("transition", "ease-in-out 0s")
    setTimeout(function () {
      $(".turntable-box-img").css("transform", "rotate(0)")
    }, 0)
  }
}

// 获取app手机型号
function isAndroid() {
  var u = navigator.userAgent, app = navigator.appVersion;
  return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
}
// 获取用户信息
function getUserUid() {
  return $(".luck-uid").val()
}
// 初始化用户接口信息
function initUserTimes() {
  mypost('/turntable/index/', function (res) {
    if (res.errcode == "ok") {
      var times = res.data.times
      totalTimes = times + res.data.video_times
      overVideoTimes = res.data.over_video_times
      allVideoTimes = res.data.all_video_times
      overShareTimes = res.data.over_share_times
      allShareTimes = res.data.all_share_times
      dayLuck = res.data.win_integral
      mytimes = times
      if(overShareTimes == allShareTimes){
        $(".turntable-task-share").addClass("turntable-task-dis").html('已完成').attr("data-end",1)
      }
      if (overVideoTimes == allVideoTimes) {
        $(".turntable-task-video").addClass("turntable-task-dis").html('已完成').attr("data-end", 1)
      }
      $("#turntable-times").html(times)
      $("#overvideo").html(overVideoTimes)
      $("#allvideo").html(allVideoTimes)
      $("#overshare").html(overShareTimes)
      $("#allshare").html(allShareTimes)
    } else {
      myalert({
        msg: res.errmsg
      })
    }
  })
}

// 获取广告
function getAdVideo() {
  if(lucking) return false;
  lucking = true;
  mypost('/turntable/show-video/', function (res) {
    lucking = false
    if (res.code == 200) {
      var ad = res.data.video
      window.WebViewJavascriptBridge.callHandler(
        'playVideo'
        , { "type": ad }
      );
    } else if (res.code == 201) {
      myalert({
        title: '小妙招',
        msg: res.errmsg,
        confirmText: '去分享',
        cancelText: '取消',
        confirm: function(){
          window.WebViewJavascriptBridge.callHandler(
            'share'
          );
        },
        cancel: function(){
          window.WebViewJavascriptBridge.callHandler(
            'cancelShare'
          );
        }
      })
    } else {
      myalert({
        msg: res.errmsg
      })
    }
  })
}

// 获取次数方法
function userGetTimes() {
  if (lucking) return false;
  lucking = true;
  mypost('/turntable/get-times/', function (res) {
    lucking = false
    if (res.code == 200) {
      var ad = res.data.video
      window.WebViewJavascriptBridge.callHandler(
        'playVideo'
        , { "type": ad }
      );
    } else if (res.code == 201) {
      myalert({
        title: '小妙招',
        msg: res.errmsg,
        confirmText: '去分享',
        cancelText: '取消',
        confirm: function () {
          window.WebViewJavascriptBridge.callHandler(
            'share'
          );
        },
        cancel: function () {
          window.WebViewJavascriptBridge.callHandler(
            'cancelShare'
          );
        }
      })
    } else if (res.code == 506) {
      lucking = false
      myalert({
        msg: res.errmsg,
        cancelText: '取消',
        confirmText: '去分享',
        confirm: function () {
          window.WebViewJavascriptBridge.callHandler(
            'share'
          );
        }
      })
    } else {
      myalert({
        msg: res.errmsg
      })
    }
  })
}

// 用户开始抽奖
function startTurnTbale() {
  if (lucking) return false;
  lucking = true
  mypost('/turntable/draw/', function (res) {
    if (res.code == 200 || res.code == 206 || res.code == 207) {
      //var integral = res.data.integral
      var times = res.data.times
      mytimes = times
      totalTimes = times + res.data.video_times
      overVideoTimes = res.data.over_video_times
      allVideoTimes = res.data.all_video_times
      dayLuck = res.data.win_integral
      var rotate = res.data.rotate
      if (overVideoTimes == allVideoTimes) {
        $(".turntable-task-video").addClass("turntable-task-dis").html('已完成').attr("data-end", 1)
      }
      var times = parseInt($("#turntable-times").html()) - 1
      times = times < 0 ? 0 : times
      $("#turntable-times").html(times)
      $("#overvideo").html(overVideoTimes)
      turntableOutRotate(true)
      turntableInRotate(true, rotate)
      setTimeout(function () {
        if (res.code == 200) {
          myalert({
            msg: res.errmsg,
            confirm: function () {
              turntableOutRotate(false)
              turntableInRotate(false)
              lucking = false
            }
          })
        } else {
          myalert({
            title: '谢谢参与',
            msg: res.errmsg,
            showCancel: false,
            confirmText: res.code == 206 ? '再来一次' : '确定',
            confirm: function () {
              turntableOutRotate(false)
              turntableInRotate(false)
              lucking = false
            }
          })
        }

      }, 5100)
    } else if (res.code == 405) {
      lucking = false
      var ad = res.data.video
      myalert({
        msg: res.errmsg,
        cancelText: '取消',
        confirmText: '获取次数',
        confirm: function () {
          window.WebViewJavascriptBridge.callHandler(
            'playVideo'
            , { "type": ad }
          );
        }
      })
    } else if (res.code == 506){
      lucking = false
      myalert({
        msg: res.errmsg,
        cancelText: '取消',
        confirmText: '去分享',
        confirm: function () {
          window.WebViewJavascriptBridge.callHandler(
            'share'
          );
        }
      })
    } else {
      lucking = false
      myalert({ msg: res.errmsg})
    }
  })
}
// 看视频结束
function stopPlayVideo(ad) {
  mypost('/turntable/video-end/', function (res) {
    if (res.code == 200) {
      var times = res.data.times
      mytimes = times
      totalTimes = times + res.data.video_times
      overVideoTimes = res.data.over_video_times
      allVideoTimes = res.data.all_video_times
      if (overVideoTimes == allVideoTimes) {
        $(".turntable-task-video").addClass("turntable-task-dis").html('已完成').attr("data-end", 1)
      }
      $("#turntable-times").html(times)
      $("#overvideo").html(overVideoTimes)
      myalert({
        msg: res.errmsg,
        cancelText: '去抽奖',
        confirmText: '继续看视频',
        confirm: function () {
          userGetTimes()
        }
      })
    } else if (res.code == 205) { // 看视频次数已用完
      var times = res.data.times
      mytimes = times
      totalTimes = times + res.data.video_times
      overVideoTimes = res.data.over_video_times
      allVideoTimes = res.data.all_video_times
      if (overVideoTimes == allVideoTimes) {
        $(".turntable-task-video").addClass("turntable-task-dis").html('已完成').attr("data-end", 1)
      }
      $("#turntable-times").html(times)
      $("#overvideo").html(overVideoTimes)
      myalert({
        msg: res.errmsg,
        confirmText: '去抽奖'
      })
    } else if (res.code == 201) { // 看视频次数已用完
      var times = res.data.times
      mytimes = times
      totalTimes = times + res.data.video_times
      overVideoTimes = res.data.over_video_times
      allVideoTimes = res.data.all_video_times
      if (overVideoTimes == allVideoTimes) {
        $(".turntable-task-video").addClass("turntable-task-dis").html('已完成').attr("data-end", 1)
      }
      $("#turntable-times").html(times)
      $("#overvideo").html(overVideoTimes)
      myalert({
        title: '小妙招',
        msg: res.errmsg,
        confirmText: '去分享',
        cancelText: '取消',
        confirm: function () {
          window.WebViewJavascriptBridge.callHandler(
            'share'
          );
        },
        cancel: function () {
          window.WebViewJavascriptBridge.callHandler(
            'cancelShare'
          );
        }
      })
    } else {
      myalert({ msg: res.errmsg})
    }
  }, ad)
}
// 分享成功后回调
function shareEndAction() {
  mypost('/turntable/share-end/', function (res) {
    if (res.errcode == 'ok') {
      var shareTimes = res.data.over_share_times
      mytimes = res.data.times
      overShareTimes = shareTimes
      if (overShareTimes == allShareTimes) {
        $(".turntable-task-share").addClass("turntable-task-dis").html('已完成').attr("data-end", 1)
      }
      $("#overshare").html(shareTimes)
      $("#turntable-times").html(res.data.times)
      myalert({
        title: '分享成功',
        msg: res.errmsg,
        confirmText: '去抽奖'
      })
      window.WebViewJavascriptBridge.callHandler(
        'shareDo'
      );
      return
    }
    //myalert({ msg: res.errmsg})
  })
}

// 调用app分享
function appShare(){
  if(lucking) return false;
  window.WebViewJavascriptBridge.callHandler(
    'share'
  );
}

// 请求方法模板
function mypost(url, callback, ad) {
  var uid = getUserUid()
  var time = parseInt(new Date().getTime() / 1000) + ctime
  fullShadeTips()
  var data = {
    uid: uid,
    _csrf_m_decorate: csrf_token(),
    encrypt: md5(uid + time + 'zhuoge'),
    time: time
  }
  if (ad) {
    data.ad = ad
  }
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    timeout: 50000,
    data: data,
    success: function (res) {
      closeFullShade()
      callback(res)
    },
    error: function () {
      closeFullShade()
      lucking = false
      mui.toast("网络异常，请求失败")
    }
  })
}

// 判断用户抽奖次数是否使用完毕
function getUserTimes() {
  window.WebViewJavascriptBridge.callHandler(
    'finish'
    , {
      "times": totalTimes
    }
  );
}

function getUserReturnTimes(){
  var returnTimes = 0;
  var msg = '';
  var tt = allVideoTimes + allShareTimes
  var over = overVideoTimes + overShareTimes
  if ((over - 1 == mytimes) && !dayLuck) {
    // 只抽过一次但是未中奖
    returnTimes = 1;
    msg = '您还有抽奖机会没有用完，抽完必中一次，确定要放弃中奖机会吗？'
  } else if (!dayLuck && ((mytimes == 0 && (over == 2)) || (mytimes && (over - 2 == mytimes)))) {
    // 2次未中奖
    returnTimes = 1;
    msg = '您还有抽奖机会没有用完，抽完必中一次，确定要放弃中奖机会吗？'
  } else if ((over == mytimes) && !overVideoTimes) {
    // 1次都没抽过或看过视频
    returnTimes = 1;
    msg = '看视频抽免费积分，最高300临时积分！不试一下吗？'
  } else if ((tt - over == 1) && (mytimes == 0) && !dayLuck) {
    // 还剩一下抽奖机会 且 未中奖 机会未获取
    returnTimes = 1;
    msg = '下次抽奖必中！确定要放弃中奖机会吗？'
  } else if ((tt - over == 0) && (mytimes == 1) && !dayLuck){
    // 还剩一次抽奖机会 且 未中奖  次数未使用
    returnTimes = 1;
    msg = '下次抽奖必中！确定要放弃中奖机会吗？'
  }else if (dayLuck && ((allVideoTimes > overVideoTimes) || mytimes > 0)) {
    // 中过奖 但是 视频没看过 或者 次数没使用完
    returnTimes = 1;
    msg = '您还有抽奖机会没有用完，确定要放弃中奖机会吗？'
  }else if(mytimes || (allVideoTimes - overVideoTimes) || (allShareTimes - overShareTimes)){
    // 只要有剩余次数
    returnTimes = 1;
    msg = '您还有抽奖机会没有用完，确定要放弃中奖机会吗？'
  }
  var data = {
    "returnTimes": returnTimes,
    "msg": msg
  }
  window.WebViewJavascriptBridge.callHandler(
    'finish'
    , data
  );
}

function toast(msg) {
  myalert({ msg: msg})
}

$(".turntable-task-video").on("tap",function(){
  var end = $(this).attr("data-end")
  if(end == "1") return false;
  userGetTimes()
})
