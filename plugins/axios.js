/*
    params.globalLoading === false//取消loading，默认不传展示
    params,data(参数)
*/

import {Toast} from 'vant';
import qs from 'qs';
import {getCookie} from '../static/utils/utils';

export default function ({$axios,redirect,store}) {
    // request拦截器
    let globalLoading = true;
    $axios.onRequest(config => {
        if(config.url == '/user/app-login'){
            config.url += `?source=M`
        }else{
            config.url += `?source=XCX`
        }
        const {params,data} = config;
        if(params && params.globalLoading === false){
            globalLoading = false
            delete params.globalLoading
        }
        if(data && data.globalLoading === false){
            globalLoading = false
            delete data.globalLoading
        }
        if(data){
            config.data = qs.stringify(config.data)
        }
        globalLoading && Toast.loading({
            mask: true,
            message: '加载中...',
            duration: 0,
        });
        // const ssoToken = getCookie('ssoToken');
        const ssoToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuemhhb2dvbmdkaS5jb20iLCJhdWQiOiJodHRwOlwvXC9hcGkuemhhb2dvbmdkaS5jb20iLCJpYXQiOjE1OTQyNjY4OTUsIm5iZiI6MTU5NDI2Njg5NSwiZXhwIjo0NzA0NjY2ODk1LCJkYXRhIjp7InVzZXJpZCI6MTI0NzQyMSwidGltZSI6MTU5NDI2Njg5NX19.9tggJ823-zaf2xY7rhSye04hNSDhy2FLED126z7KYl0'
        config.headers.common['x-token'] = ssoToken;
        config.headers.common['content-type'] = 'application/x-www-form-urlencoded';

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
