<template>
   <div>
       <Headers :title="title"/>
       <collHead :arr = 'arr'/>
       <div class="father">
           <div class="list_one">暂无此类信息</div>
       </div>
   </div>
</template>

<script>
import Headers from '../../components/header'
import collHead from '../../components/collection-head'
export default {
    components:{
        Headers,
        collHead
    },
    data(){
        return{
            title:'我的收藏',
            arr:[{title:'求租'},{title:'出租'},{title:'转让'},{title:'求购'},]
        }
    }
}
</script>
<style lang='scss' scoped>
@import './collection.scss'
</style>