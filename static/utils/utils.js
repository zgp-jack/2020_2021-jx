import { Toast, Dialog } from 'vant';
import { serverUrl } from './url';
let app = '' //存储this
let mycallback = '' //存储回调

//读取cookies
export function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
}

//写cookies
export function setCookie(name, value, Days = 1) {
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
// 打电话
export function callPhoneFn(phone) {
    window.location.href = "tel:" + phone
}
//查看完整电话号码
export function showPhoneFn(that, Toast, data, bool = false) {
    /*
      that --> 调用函数调用的this
      Toast --> 弹框
      data -->请求的数据
      bool -->如果是查看完整传一个函数，点击图标打电话就不传，默认值为false
    */

    that.$axios.post('/index/get-contact', { data: JSON.stringify(data) }).then(res => {
        if (res.code == 200) {
            if (typeof bool == "function") {
                bool(res.content)
            } else {
                callPhoneFn(res.content)
                that.tel = res.content;
                that.giveParentPhone({ tel: res.content, id: data.id, index: that.$props.data.index, mode: data.mode })
            }
        } else if (res.code == 300) {
            Toast(res.msg);
        } else if (res.code == 303) {
            Dialog.confirm({
                    title: '提示',
                    message: '鱼泡币不足，是否前往获取？',
                    confirmButtonText: '是',
                    confirmButtonColor: '#FFA926',
                }).then(() => {
                    // const params = {welfareId:1}
                    // that.$axios.get('/user-welfare/get-welfare',{params}).then(res =>{
                    //   if(res.code == 200){
                    //     that.$router.push('/user/get')
                    //   }
                    //   if(res.code == 500){
                    //     Toast(res.msg)
                    //     return false
                    //   }
                    // })
                    that.$router.push('/user/get')
                })
                .catch(() => {

                })
        }
    })
}
// 签到
export function coinget(that) {
    if (!that.box_on) {
        return false
    };
    that.$axios.get('/user/sign').then(res => {
        if (res.code == 400) {
            that.box_on = false
        }
    })
}
// 复制粘贴
export function Copynum(that, number) {
    that.$copyText(number).then(e => {})
}
// 时间转换
export function formatDate(timestamp, format = 'yyyy-MM-dd') {
    if (!timestamp) {
        return;
    }
    var date = new Date(timestamp);
    var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return format;
}
//压缩图片
function compress(img, size) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let initSize = img.src.length
    let width = img.width
    let height = img.height
    canvas.width = width
    canvas.height = height
    // 铺底色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, width, height)
    //进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', size)
    console.log(ndata.length / 1024)
    return ndata
}
//浏览器上传图片
export function uploadPictures(page, file,callback) {
    const weixin = isWeixin()
    if(weixin){
        return __UPLOADIMAGE__(page, file)
    }

   return new Promise(function(resolve, reject){
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        let token = page.$cookies.get('token');
        let id = page.$cookies.get('id');
        compressImg(file,callback)
        function callback(file){
            let fd = new FormData();　
            fd.append('pic', file);
            fd.append('gourideToken', token);
            fd.append('hamapi', id);
            return page.$axios.post('/upload', fd, config).then(res => {
                resolve(res)
            })
        }
    })
}

//压缩图片
export function compressImg(file,callback){
    let size = file.size/1024/1024;
    if(size >= 5){
        let canvas = document.createElement('canvas') // 创建Canvas对象(画布)
        let context = canvas.getContext('2d')
        const reader = new FileReader()// 读取文件资源
        let img = new Image()
        reader.readAsDataURL(file)  
        reader.onload = function(e){ 
            img.src = e.target.result
        }
        img.onload = function() {
            let files = '';
            canvas.width = 300;
            canvas.height = 400;
            context.drawImage(img, 0, 0, 300, 400)
            file.content = canvas.toDataURL(file.type, 0.92) // 0.92为默认压缩质量
            files = dataURLtoFile(file.content, file.name)
            callback(files)
        }
    }else{
        callback(file)
    }
}

function dataURLtoFile (dataurl, filename) { // 将base64转换为file文件
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type: mime})
  }

export function getClass(o) { //判断数据类型
    return Object.prototype.toString.call(o).match(/^\[object\s(.*)\]$/)[1];
}

//微信浏览器上传图片
function uploadWxImage(){
   
}
//微信配置
function weixinConfig({appId,nonceStr,rawString,signature,timestamp}){
    if(process.client){
        let wx = require('weixin-js-sdk')
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            // rawString :rawString,
            timestamp:  timestamp, // 必填，生成签名的时间戳
            nonceStr:  nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: ['ready','chooseImage','uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            //jsApiList: ['updateTimelineShareData','updateAppMessageShareData']
        })
        // debugger
         wx.ready(function(){
            
            //  console.log(123);
        })
        wxChooseImage(wx)

        


      
    }
    
}
//微信上传图片
 function wxChooseImage(wx) {
     console.log(wx)
     return false;
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 指定是原图还是压缩图，默认都有
        sourceType: ['album', 'camera'], // 指定来源是相册还是相机，默认都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.uploadImage({
                localId: localIds.toString(), // 需要上传的图片的ID，由chooseImage接口获得
                isShowProgressTips: 0, // 进度提示
                success: function (res) {
                    requestImage(res.serverId)
                },
                fail: function (res) {
                    Toast('图片上传失败，请重试');
                }
            });
        },
        fail: function (err) {
            Toast('图片上传失败，请重试');
            console.log("图片上传失败，请重试");
        }
    });
}
//接口请求图片
function requestImage(id){
    if(!id) return false;
    let data = {mediaId:id,type:'Wx'}
    app.$axios.post("/upload/wx-upload",{data:JSON.stringify(data)}).then(res=>{
        if(res.code == 200){
            
            typeof mycallback =='function' && mycallback(res)
        }else {
            Toast(res.msg)
        }
    })

}
//微信请求
 export function weiXinConfigRequest(self,callback){
    app = self
    mycallback = callback;
    console.log(mycallback)
    return self.$axios.post('upload/get-wx-upload-params?url='+location.href.split('#')[0]).then(res=>{

       if(res.code == 200){
           weixinConfig(res.content)
           return res;
       }else{
           Toast("微信获取参数失败")
       }
    })
}

//拷贝对象
export function deepCopy(obj) {
    var result, oClass = getClass(obj);

    if (oClass.toLowerCase() == "object") result = {}; //判断传入的如果是对象，继续遍历
    else if (oClass.toLowerCase() == "array") result = []; //判断传入的如果是数组，继续遍历
    else return obj; //如果是基本数据类型就直接返回

    for (var i in obj) {
        var copy = obj[i];

        if (getClass(copy) == "Object") result[i] = deepCopy(copy); //递归方法 ，如果对象继续变量obj[i],下一级还是对象，就obj[i][i]
        else if (getClass(copy) == "Array") result[i] = deepCopy(copy); //递归方法 ，如果对象继续数组obj[i],下一级还是数组，就obj[i][i]
        else result[i] = copy; //基本数据类型则赋值给属性
    }

    return result;
}

//获取个人信息接口
export function GetUser(page, callback) {
    let token = page.$cookies.get('token');
    let id = page.$cookies.get('id');
    if (token && id) {
        page.$axios.post('/user/get-userinfo').then(res => {
            if (res.code == 200) {
                page.$nuxt.$store.commit('setUserinfo', res.content)
                callback && callback(res.content)
            }
        })
    } else {
        callback && callback()
    }
}

/*
  未登录跳转页面
  @parmes: that : this
           url : 需要跳转的路径，默认/login登录页
		   callback:自定义跳转的函数
*/
export function whetherLogin(that, url, callback) {
    if (!that) return;
    if (JSON.stringify(that.$nuxt.$store.state.userinfo) === '{}') {
        if (typeof callback == "function") {
            callback();
            return false;
        }
        that.$router.push("/login?noLogin=true");
        return false;
    } else if (url) {
        that.$router.push(url);
        return true;
    } else {
        return "logined"
    }
}

//新手弹窗指引/获取本地存储
export function getNovicePoint() {
    let guide = {
        detail: true,
        home: true,
        lease: true,
        userBuy: true,
        userRelease: true,
        welfare: true,
        zhuanrang: true,
    }
    let storageGuide = window.localStorage.getItem('guide');
    if (storageGuide) {
        guide = storageGuide
    } else {
        window.localStorage.setItem("guide", JSON.stringify(guide))
    }
    return typeof guide == "object" ? guide : JSON.parse(guide);
}

//新手弹窗指引/设置本地储存
// parmes : guideObject 要修改的json数据
export function setNovicePoint(guideObject) {
    if (!guideObject) return false;
    window.localStorage.setItem("guide", JSON.stringify(guideObject))
}

//解决浏览器缓存
export function timestamp(url) {   
    var getTimestamp = new Date().getTime();   
    if (url.indexOf("?") > -1) {     url = url + "&t=" + getTimestamp    } else {    url = url + "?t=" + getTimestamp   } 
    return url;
}

//判断是否是微信环境
export function isWeixin(callback) {
    const ua = navigator.userAgent.toLowerCase();
    const weixin = ua.includes('micromessenger');
    if (weixin) {
        callback && callback(true)
        return true
    } else {
        callback && callback(false)
        return false
    }
}

//判断当前是什么浏览器/返回['Android','IOS','XCX','M','wx']
export function browserEnvironment() {
    let environment = window.navigator.userAgent;
    let source;
    const isWeixin = environment.toLowerCase().includes('micromessenger');
    let isAndroid = environment.includes('Android') || environment.includes('Adr');
    let isiOS = !!environment.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
        source = 'IOS'
    } else if (isAndroid) {
        source = 'Android'
    } else if (isWeixin) {
        source = 'wx'
    } else {
        source = 'M'
    }
    return source;
}

//参数拼接
export function getRequestQuery(query) {
    const res = [];
    Object.entries(query).forEach(o =>
        // res.push(`${o[0]}=${window.encodeURIComponent(o[1])}`)
        res.push(`${o[0]}=${o[1]}`)
    );
    return res.join("&");
};


//微信浏览器上传图片
export function __UPLOADIMAGE__(page,files) {
    return new Promise(function(resolve, reject){
        Toast.loading({
            message: '上传中...',
            duration: 0,
            loadingType: 'spinner',
        });
        var uploadUrl = serverUrl+'/upload?source=wx'
        var xhr = new XMLHttpRequest();
    
        var form = new FormData();
        compressImg(files,callback)
        function callback(file){
            let token = page.$cookies.get('token');
            let id = page.$cookies.get('id');
        
            form.append('pic', file)
            form.append('gourideToken', token)
            form.append('hamapi', id)
            xhr.open("POST", uploadUrl, true);

            // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            //在readystatechange事件上绑定一个事件处理函数
            xhr.onreadystatechange = callback;
            xhr.send(form);
            function callback(){
                if (xhr.readyState == 4) {
                    Toast.clear()
                    if (xhr.status == 200) {
                        resolve({...JSON.parse(xhr.response)})
                        Toast('上传成功')
                    }else{
                        Toast('上传失败')
                    }
                }
            }
        }
    })
    .catch(res=>{
        Toast.clear()
        Toast('上传失败')
    })
}


export function Wx_Read() {
    wx.ready(function () {
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: window.shareObj.title, // 分享标题 此处$title可在控制器端传递也可在页面传递 页面传递讲解在下面哦
            desc: window.shareObj.desc, //分享描述
            link: window.shareObj.link, // 分享链接
            imgUrl: window.shareObj.imgUrl, // 分享图标
            success: function () {
                userShare(1);
            }
        });
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: window.shareObj.title, // 分享标题 此处$title可在控制器端传递也可在页面传递 页面传递讲解在下面哦
            desc: window.shareObj.desc, //分享描述
            link: window.shareObj.link, // 分享链接
            imgUrl: window.shareObj.imgUrl, // 分享图标
            success: function () {
                userShare(2);
            }
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title: window.shareObj.title, // 分享标题 此处$title可在控制器端传递也可在页面传递 页面传递讲解在下面哦
            desc: window.shareObj.desc, //分享描述
            link: window.shareObj.link, // 分享链接
            imgUrl: window.shareObj.imgUrl, // 分享图标
            success: function () {
                userShare(3);
            }
        });
        //分享到QQ空间
        wx.onMenuShareQZone({
            title: window.shareObj.title, // 分享标题 此处$title可在控制器端传递也可在页面传递 页面传递讲解在下面哦
            desc: window.shareObj.desc, //分享描述
            link: window.shareObj.link, // 分享链接
            imgUrl: window.shareObj.imgUrl, // 分享图标
            success: function () {
                userShare(4);
            }
        });

        //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        // wx.updateTimelineShareData({
        //     title: shareObj.title, // 分享标题 此处$title可在控制器端传递也可在页面传递 页面传递讲解在下面哦
        //     desc: shareObj.desc, //分享描述
        //     link: shareObj.link, // 分享链接
        //     imgUrl:shareObj.imgUrl, // 分享图标
        //     success:function () {
        //         userShare(3);
        //     }
        // });
        // //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        // wx.updateAppMessageShareData({ 
        //     title: shareObj.title, // 分享标题 此处$title可在控制器端传递也可在页面传递 页面传递讲解在下面哦
        //     desc: shareObj.desc, //分享描述
        //     link: shareObj.link, // 分享链接
        //     imgUrl:shareObj.imgUrl, // 分享图标
        //     success: function () {
        //         userShare(2);
        //     }
        // })
    });
}