<template>
    <div>
        <Headers :title="title"/>
        <div class="father">
            <div class="info">
                <div class="headers reset-psd">
                    <div class="header-img">
                        <img src="http://statics.zhaogongdi.com/images/wx-xcx/20200620/xY7U301592639800.jpeg">
                    </div>
                    <div>修改头像</div>
                </div>
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
            title:'鱼泡机械-个人资料'
        }
    }
}
</script>

<style lang='scss' scoped>
 @import './info.scss'
</style>