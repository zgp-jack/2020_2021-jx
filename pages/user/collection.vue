<template>
   <div>
       <Headers :title="title"/>
       <collHead :arr = 'arr'/>
       <div class="father">
           <!-- <div class="list_one">暂无此类信息</div> -->
           <div class="collection_item">
              <div class="top">
                <p>出租挖机哈啊</p>
                <span @click="isGo">查看 ></span>
              </div>
              <div class="bottom">
                <p>出租挖机哈啊</p>
                <span>2020-05-30</span>
                <span @click="isGo">取消收藏</span>
              </div>
           </div>
           <div class="more_none">没有更多信息了</div>
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
    },
    methods:{
      isGo(){
        this.$router.push('/')
      }
    }
}
</script>
<style lang='scss' scoped>
@import './collection.scss'
</style>
