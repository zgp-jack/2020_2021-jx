/*
    params.globalLoading === false//取消loading，默认不传展示
    params,data(参数)
*/

import {Toast} from 'vant';
import qs from 'qs';
import {setCookie,isWeixin} from '../static/utils/utils';

export default function ({$axios,redirect,$cookies}) {
    // request拦截器
    let globalLoading;
    $axios.onRequest(config => {
        globalLoading = true;
        const {params,data} = config;
        let source;
        if (process.browser) {
            source = isWeixin()?'wx':'M';
        }
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
        let ssoToken = $cookies.get('ssoToken');
        if(ssoToken){
            config.headers.common['x-token'] = ssoToken;
        }
    })
    $axios.onError(error => {
        Toast.clear()
        console.log(error)
    })
    // response拦截器
    $axios.interceptors.response.use(response => {
        Toast.clear()
        if (response.status == 200) {
            if (response.data.code==300){
                Toast('账号异常')
            } else if (response.data.code == 0) {
                if (process.browser) {
                    setCookie('ssoToken','',-1)
                }
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
