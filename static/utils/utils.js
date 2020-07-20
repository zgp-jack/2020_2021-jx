
import {Toast} from 'vant';
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
  if(!that.box_on){
    return false
  };
  that.$axios.get('/user/sign').then(res=>{
      if(res.code == 400){
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
　fd.append('pic', file);
  let config = {
      headers:{'Content-Type':'multipart/form-data'},
  };
  return page.$axios.post('/upload',fd,config).then(res=>{
    if(res && res.code==200){
      return res
    }else{
      Toast(res.msg)
    }
  })
}


export function getClass(o) { //判断数据类型
  return Object.prototype.toString.call(o).match(/^\[object\s(.*)\]$/)[1];
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
export function GetUser(page,callback){
  const ssoToken = getCookie('ssoToken');
  if(ssoToken){
    page.$axios.get('/user/get-userinfo').then(res=>{
      if(res.code==200){
        window.$nuxt.$store.commit('setUserinfo',res.content)
      }
      callback && callback()
    })
  }else{
    callback && callback()
  }
}
