<template>
  <div>
      <Headers :title="title"/>
       <collHead :arr = 'arr'/>
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
            title:'我的发布',
            arr:[{title:'我的求租'},{title:'我的出租'},{title:'我的出售'},{title:'我的求购'},]
        }
    }
}
</script>

<style lang='scss' scoped>
 @import './release.scss'
</style>