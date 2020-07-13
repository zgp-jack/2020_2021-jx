
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
      if(res.content.sign){
        that.box_on = false
      }
  })
}
