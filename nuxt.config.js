
const rem = `(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
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
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { "http-equiv":"X-UA-Compatible",content:"IE=edge"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
		  { innerHTML: rem, type: 'text/javascript', charset: 'utf-8'}
	  ],
	  __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Global CSS
  */
  css: [
    'vant/lib/index.css',
    '~assets/css/reset.css',
    '~assets/css/iconfont.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
   '~/plugins/main.js'
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
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  router: {
    base: '/dist'
  },

}
