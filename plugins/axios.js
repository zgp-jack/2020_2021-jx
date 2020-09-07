/*
    params.globalLoading === false//取消loading，默认不传展示
    params,data(参数)
*/

import { Toast, Dialog } from 'vant';
import qs from 'qs';
import { isWeixin, callPhoneFn } from '../static/utils/utils';

export default function({ $axios, redirect, app }) {
    // request拦截器
    let globalLoading;

    $axios.onRequest(config => {
        console.log()

        globalLoading = true;
        let { params, data = {}, method } = config;
        // debugger
        let source;
        if (process.browser) {
            source = isWeixin() ? 'wx' : 'M';
        }
        if (!config.url.includes('source')) {
            config.url.includes('?') ? config.url += `&source=${source}` : config.url += `?source=${source}`;
        }
        if (params && params.globalLoading === false) {
            globalLoading = false
            delete params.globalLoading
        }
        if (data.globalLoading === false) {
            globalLoading = false
            delete data.globalLoading
        }

        if (method && method == 'post') {
            let token = app.$cookies.get('token');
            let id = app.$cookies.get('id');
            if (token && id && config.url !== '/upload?source=M') {
                data.gourideToken = token;
                data.hamapi = id;
                config.data = {...data }
            }
        }
        if (config.url !== '/upload?source=M' && method && method == 'post') {
            config.data = qs.stringify(config.data)
            config.headers.common['content-type'] = 'application/x-www-form-urlencoded';
        }
        // config.headers.common['content-type'] = 'application/json;charset=utf-8';
        globalLoading && Toast.loading({
            message: '加载中...',
            duration: 0,
            forbidClick:true,
            loadingType: 'spinner',
        });
        // let ssoToken = app.$cookies.get('ssoToken');
        // if(ssoToken){
        //     config.headers.common['x-token'] = ssoToken;
        // }
    })
    $axios.onError(error => {
            Toast.clear()
            console.log(error)
        })
        // response拦截器
    $axios.interceptors.response.use(response => {
        Toast.clear()
        if (response.status == 200) {
            if (response.data.code == 300) {
                const { contact } = response.data.content
                Dialog.confirm({
                    title: '温馨提示',
                    message: response.data.msg,
                }).then(() => {
                    callPhoneFn(contact)
                })
            } else if (response.data.code == 0) {
                if (process.browser) {
                    app.$cookies.remove('token')
                    app.$cookies.remove('id')
                }
                if (process.browser) {
                    if(!isWeixin()){
                        redirect({
                            path: '/login',
                        })
                    }
                }
            }
        } else {
            Toast('网络请求失败')
        }
        return response.data
    })
}