export const MechanicalType_link = {
    '1':'/qiuzu',
    '2':'/chuzu',
    '3':'/ershou',
    '4':'/qiugou',
}

export const MechanicalNum_link = {
    '/qiuzu':'1',
    '/qiuzu/':'1',
    '/chuzu':'2',
    '/chuzu/':'2',
    '/ershou':'3',
    '/ershou/':'3',
    '/qiugou':'4',
    '/qiugou/':'4',
}

export const SEO_VIEW_KEYWORDS = {
    '1':'工程机械求租，工程设备租赁,',
    '2':'工程机械出租，工程设备租赁,',
    '3':'工程机械转让，工程设备二手交易,',
    '4':'工程机械求购，工程设备二手交易,',
}

export const SEO_LIST_KEYWORDS=(isArea,model)=>{
    let data = '';
    if(isArea!=='全国'){
        switch(model){
            case 1:data = `${isArea}机械租赁,${isArea}求租机械,${isArea}招聘机械,${isArea}求租工程机械,鱼泡机械网`
            break;
            case 2:data = `${isArea}机械租赁,${isArea}机械出租,${isArea}机械找活,${isArea}工程机械出租,鱼泡机械网`
            break;
            case 3:data = `${isArea}机械二手交易,${isArea}机械转让,${isArea}机械出售,${isArea}工程机械转让,鱼泡机械网`
            break;
            case 3:data = `${isArea}机械二手交易,${isArea}机械转让,${isArea}机械出售,${isArea}工程机械转让,鱼泡机械网`
            case 4:data = `${isArea}机械二手交易,${isArea}机械求购,${isArea}机械购买,${isArea}工程机械求购,鱼泡机械网`
            break;
        }
    }else{
        data = '机械机械租赁,机械机械出租,机械机械找活,工程机械出租,鱼泡机械网'
    }
    return data;
}

export const SEO_LIST_DESCRIPTION = {
    '1':'鱼泡机械租赁网,为您提供工程机械求租信息,工程机械求租信息,工程机械租赁企业信息,找工程车队,求租机械信息,工程机械设备求租,建筑机械设备求租,特种装备求租。',
    '2':'鱼泡机械租赁网,为您提供工程机械出租信息,工程机械出租,工程机械设备出租,机械找活,机械库,设备租赁公司,建筑机械设备出租,设备租借,特种装备出租。',
    '3':'鱼泡机械转让板块为您提供大量二手工程机械设备详细信息,工程机械设备买卖信息,工程机械设备转让信息,机械设备出售信息等,鱼泡机械打造专业的二手机械交易平台。',
    '4':'鱼泡机械求购信息,二手机械求购,求购信息,二手工程机械,工程机械买家,工程找机械,鱼泡机械打造专业的二手机械交易平台。',
}

export const SEO_LIST_TITLE = {
    '1':'机械求租平台|机械租赁信息|机械施工机械|机械工程机械租赁-鱼泡机械网',
    '2':'机械出租平台|机械机械租赁|机械机械信息库|机械机械找活-鱼泡机械网',
    '3':'机械出售平台|机械机械转让|机械机械设备转让|机械工程机械出售-鱼泡机械网',
    '4':'机械求购平台|机械机械求购|机械机械设备求购|机械工程机械求购-鱼泡机械网',
}