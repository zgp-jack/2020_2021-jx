<!--个人设置-->
<template>
    <div>
        <Header :title='title'/>
        <div class="father">
            <div class="con">
                <div class="info-con">
                    <router-link to='./protocol' class="row">
                        <span>服务条款</span>
                        <i></i>
                    </router-link>
                    <router-link to='./contact' class="row">
                        <span>联系我们</span>
                        <i></i>
                    </router-link>
                </div>
                <div class="container" @click="signOut" v-if="iswx">
                    <router-link to='/login' class="con_btn" replace>
                        退出登录
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/header'
import {whetherLogin,isWeixin} from '../../static/utils/utils.js';
export default {
    components:{
        Header
    },
    mounted() {
        if(!isWeixin()) this.iswx = true;

    },
    data(){
        return{
            title:'个人设置',
            iswx:false,
        }
    },
    methods:{
      signOut(){
        //清除token
        document.cookie = "id"+'=v; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
        document.cookie = "token"+'=v; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/dist';
        document.cookie = "token"+'=v; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
        //清除七天不提示弹框
        document.cookie = "havaSeven"+'=v; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
        let {base} = this.$router.history;
        let url = base?window.location.origin + base +'/login':window.location.origin+'/login'
        window.location.href = url+"?signout=true"
      }
    }
}
</script>

<style lang='scss' scoped>
@import './personalSettings.scss';
</style>
