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
                <div class="container">
                    <router-link to='' class="con_btn">
                        退出登录
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/header'
export default {
    components:{
        Header
    },
    data(){
        return{
            title:'个人设置'
        }
    },
}
</script>

<style lang='scss' scoped>
@import './personalSettings.scss';
</style>
