/*
    params.globalLoading === false//取消loading，默认不传展示
    params,data(参数)
*/

import {Toast} from 'vant';
import qs from 'qs';
import {getCookie,setCookie,isWeixin} from '../static/utils/utils';

export default function (aaaa) {
    let {$axios,redirect,store} = aaaa
    // request拦截器
    let globalLoading;
    $axios.onRequest(config => {
        globalLoading = true;
        const {params,data} = config;
        let source = isWeixin()?'wx':'M';

        if(!config.url.includes('source')){
            config.url.includes('?')?config.url += `&source=${source}` : config.url += `?source=${source}`;
        }

        if(params && params.globalLoading === false){
            globalLoading = false
            delete params.globalLoading
        }
        if(data && data.globalLoading === false){
            globalLoading = false
            delete data.globalLoading
        }
        if(data && config.url!=='/upload?source=M'){
            config.data = qs.stringify(config.data)
            config.headers.common['content-type'] = 'application/x-www-form-urlencoded';
        }
        globalLoading && Toast.loading({
            message: '加载中...',
            duration: 0,
            loadingType: 'spinner',
        });
        const ssoToken = getCookie('ssoToken');
        if(ssoToken){
            config.headers.common['x-token'] = ssoToken;
        }
    })
    $axios.onError(error => {
        Toast.clear()
        return error
    })
    // response拦截器
    $axios.interceptors.response.use(response => {
        Toast.clear()
        // Dialog.confirm({
        //     title:"提交成功",
        //     message:'response.status:'+response.status + 'response.statusText:'+response.statusText + 'response:'+JSON.stringify(response),
        // })
        if (response.status == 200) {
            if (response.data.code==300){
                Toast('账号异常')
                // let error_data = response.data
                // wx.showModal({
                //     title: "账号异常",
                //     content: error_data.msg,
                //     success(res) {
                //         if (res.confirm) {
                //             wx.makePhoneCall({
                //                 phoneNumber: error_data.content.contact
                //             })
                //         } else if (res.cancel) {
                //             if (params.cancel) params.Cancel()
                //         }
                //     }
                // })
            } else if (response.data.code == 0) {
                setCookie('ssoToken','',-1)
                redirect({
                    path: '/login',
                })
            }
        } else {
            // Toast('response.status:'+response.status + 'response.statusText:'+response.statusText)
            // Dialog.confirm({
            //     title:"提交成功",
            //     message:'您提交的申请，需要核实人员核实之后才能通过，工作人员将在一个工作日之内联系您，请保持电话畅通，客服电话：15608008605',
            //     cancelButtonText:"稍后再去",
            //     confirmButtonText:"联系客服"
            // })
            Toast('网络请求失败')
        }
        return response.data
    })
}
