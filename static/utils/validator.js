// 手机格式验证
export const CellphoneCheck = {
    message: '手机格式不正确',
    pattern: /^[1]\d{10}$/
};
// 验证码验证
export const Callcap = {
  message:'验证码格式不正确',
  pattern: /^\d{6}$/
}
// 手机格式验证
export const no_strict_phoneCheck = {
  message: '手机格式不正确',
  pattern: /^[1]\d{9,10}$/
};
// 密码格式验证
export const nopass = {
  message: '密码格式不正确',
  pattern: /^(\w){6,}$/
};

/* 包含中文 */
export const Chinese = /[\u4e00-\u9fa5]+/;

/* 只能输入中文 */
export const OnlyChinese = /^[\u4e00-\u9fa5]+$/;

/*回车验证 */
export const Carriage = /[\r\n]/;

/* 空格验证 */
export const SpaceCheck = /^\S+$/;

/* 数字字母中文 */
export const PublicText = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;

/* 只能输入数字 */
export const NumberCheck = /^[0-9]+$/;

/* 只能输入字母 */
export const OnlyLetter = /^[A-Za-z]+$/;

/* 全中文或者字母 */
export const Only_letter_number=(str)=>{
  if(numberCheck.test(str) || onlyLetter.test(str)){
    return true;
  }else{
    return false
  }
}

/* 不支持全数字、空格、特殊符号 */
export const PublicCheck=(str)=>{
  if(!numberCheck.test(str) && !onlyLetter.test(str) && publicText.test(str)){
      return true
  }else{
    return false
  }
}

/* 包含中文不支持空格/回车 */
export const IncludeChinese=(str)=>{
    if(Chinese.test(str) && !Carriage.test(str) && SpaceCheck.test(str)){
        return true
    }else{
        return false;
    }
}
