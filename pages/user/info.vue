<template>
    <div>
        <Headers :title="title"/>
        <div class="father">
            <div class="info">
                <div class="headers reset-psd">
                    <div class="header-img" :style="{backgroundImage:`url(${userinfo.header})`}">
                    </div>
                    <div>修改头像</div>
                </div>
                <div class="nickName reset-psd" style="margin-left:0.3rem;padding-left:0;">
                    <span style="letter-spacing:36px;">昵称</span>
                    <input type="text" :value='userinfo.name'/>
                </div>
                <div class="nickName reset-psd">
                    <span>手机号码</span>
                     <span>{{userinfo.tel}}<i class="icon"></i></span>
                </div>
            </div>
            <div class="nickName reset-psd nones">
                    <span>修改密码</span>
                     <i class="icon"></i>
                </div>
        </div>
    </div>
</template>

<script>
import Headers from '../../components/header'
export default {
    components:{
        Headers
    },
    data(){
        return{
            title:'鱼泡机械-个人资料',
        }
    },
    computed:{
        userinfo(){
          return window.$nuxt.$store.state.userinfo
        }
    }
}
</script>

<style lang='scss' scoped>
 @import './info.scss'
</style>
