
const rem = `(function (doc, win) {
  var docEl = doc.documentElement,
    // resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
    resizeEvt = 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 750) {
        docEl.style.fontSize = '100px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);`

import {serverUrl} from './static/utils/url';
const env = process.env.NODE_ENV;


export default {

  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: '机械租赁|机械库|机械出租|供应商|机械二手交易|机械设备转让|机械求购-鱼泡机械网',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' },
      { hid: 'description', name: 'description', content: '鱼泡机械网提供挖掘机、推土机、铣刨机、平地机等各种工程机械出租、机械租赁服务，方便建筑工人、施工队高效快捷地寻找靠谱的建筑工程机械。' },
      { name: "keywords", content: "鱼泡机械网，求租机械，求租信息，机械出租，机械供应商，二手机械交易，二手机械信息，机械设备转让，机械设备求购" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'http://statics.zhaogongdi.com/common/jixie_app_logo.png' },
      { rel: 'stylesheet', href:'https://cdn.jsdelivr.net/npm/vant@2.8/lib/index.css'}
    ],
    script: [
      { innerHTML: rem, type: 'text/javascript', charset: 'utf-8' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Global CSS
  */
  css: [
    // 'vant/lib/index.css',
    '~assets/css/reset.css',
    '~assets/css/iconfont.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/main.js',
    '~/plugins/axios.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    
    // Simple usage
    'cookie-universal-nuxt',
 
    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }],

  ],
  axios: {
    // credentials: true,
    proxy: env === "development" ? true : false,
    prefix: env === "development" ? '/api' : '',
    // baseURL: env === "development" || env === "staging" ? "http://jxapi.kkbbi.com/" : "https://api.zhaogongdi.com/"
    baseURL:serverUrl,
  },
  proxy: {
    '/api/': {
      target: serverUrl, // 目标服务器ip
      pathRewrite: {
        '^/api/': '/',
        changeOrigin: true
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  router: {
    base: env === "development" ?'/dist':'/',
  },

  loading: '~/components/loading/index.vue',

  //中间件
  middleware: ['userAgent']
}
