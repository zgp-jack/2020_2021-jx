import Vue from 'vue';
import Header from '../components/header';
Vue.component('Header',Header);
// 转换时间格式
import moment from 'moment/moment';
Vue.filter('moment', function (value, formatString) {
        formatString = formatString || "YYYY年M月";
    return moment(value).format(formatString);
    });
export default new Vue({})
