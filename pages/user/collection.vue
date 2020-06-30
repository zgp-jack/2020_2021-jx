<template>
   <div>
       <Headers :title="title"/>
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
            title:'我的收藏'
        }
    }
}
</script>

<style lang='scss' scoped>
@import './collection.scss'
</style>