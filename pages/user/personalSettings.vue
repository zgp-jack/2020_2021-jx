<!--个人设置-->
<template>
    <div>
        <Header :title='title'/>
        <div class="father">
            <div class="con">
                
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
