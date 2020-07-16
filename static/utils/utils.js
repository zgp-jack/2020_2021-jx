
//读取cookies
export function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
}

//写cookies
export function setCookie(name, value,Days=1) {
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// 打电话
export function callPhoneFn(phone){
  window.location.href = "tel:"+phone
}

//查看完整电话号码
export function showPhoneFn(that,Toast,data,bool=false){
  /*
    that --> 调用函数调用的this
    Toast --> 弹框
    data -->请求的数据
    bool -->如果是查看完整传一个函数，点击图标打电话就不传，默认值为false
  */

  that.$axios.post('/index/get-contact',{data:JSON.stringify(data)}).then(res=>{
    console.log(res)
    if(res.code == 200){
      if(typeof bool == "function"){
        bool(res.content)
      }else{
        callPhoneFn(res.content)
        that.tel = res.content;
        that.giveParentPhone({tel:res.content,id:data.id,index:that.$props.userInfo.index,mode:data.mode})
      }
    }else if(res.code == 300){
      Toast(res.msg);
    }else if(res.code == 303){
      Toast(res.msg);
    }
  })
}

// 签到
export function coinget(that){
  that.$axios.get('/coin/get').then(res=>{
      if(!res.content.sign){
        that.box_on = false
      }
  })
}
// 复制粘贴
export function Copynum(that,number){
  that.$copyText(number).then(e=>{})
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

//上传图片
export function uploadPictures (page,file){
  let fd = new FormData();
　fd.append('pic', file.file);
  let config = {
      headers:{'Content-Type':'multipart/form-data'},
  };
  return page.$axios.post('/upload',fd,config).then(res=>{
      return res
  })
}

