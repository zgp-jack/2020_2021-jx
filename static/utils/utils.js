
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
// 签到
export function coinget(that){
  that.$axios.get('/coin/get').then(res=>{
      if(res.content.sign){
        that.box_on = false
      }

  })
}
// 复制粘贴
export function Copynum(that,number){
  that.$copyText(number).then(e=>{})
}
