/* 
    params.globalLoading === false//取消loading，默认不传展示
    params必传  可以传params:{}
*/

import {Toast} from 'vant';

export default function ({$axios,redirect,store}) {
    // request拦截器
    let globalLoading = true;
    $axios.onRequest(config => {
        config.url += `?source=XCX`
        const {params} = config;
        if(params && params.globalLoading === false){
            globalLoading = false
            delete params.globalLoading
        }
        globalLoading && Toast.loading({
            mask: true,
            message: '加载中...',
            duration: 0,
        });
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
            if (response.code==300){
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
            } else if (response.code == 0) {
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
