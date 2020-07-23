/*
    params.globalLoading === false//取消loading，默认不传展示
    params,data(参数)
*/

import {Toast} from 'vant';
import qs from 'qs';
import {getCookie,setCookie} from '../static/utils/utils';

export default function ({$axios,redirect,store}) {
    // request拦截器
    let globalLoading = true;
    $axios.onRequest(config => {
        config.url.includes('?')?config.url +='&source=M' : config.url += `?source=M`;
        const {params,data} = config;
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
            mask: true,
            message: '加载中...',
            duration: 0,
        });
        const ssoToken = getCookie('ssoToken');
        if(ssoToken){
            config.headers.common['x-token'] = ssoToken;
        }

    })
    $axios.onError(error => {
        globalLoading && Toast.clear()
        return {data:{error:'error'}}
    })
    // response拦截器
    $axios.interceptors.response.use(response => {
        globalLoading && Toast.clear()
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
            Toast('网络请求失败')
        }
        return response.data
    })
}
