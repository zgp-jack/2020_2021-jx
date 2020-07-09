<template>
   <div>
       <Headers :title="title"/>
       <collHead :arr = 'arr'/>
    <div class="father">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

           <!-- <div class="list_one">暂无此类信息</div> -->
        <div style="height:calc(100vh - 2rem);overflow-y:auto;">
           <div class="collection_item" v-for="(item,i) in list" :key='i'>
              <div class="top">
                <p>{{item.title}}</p>
                <span @click="isGo">查看 ></span>
              </div>
              <div class="bottom">
                <p>{{item.title}}</p>
                <span>{{item.time}}</span>
                <span @click="isGo">取消收藏</span>
              </div>
           </div>
           <emptyMsg  :empty1='true' v-if='More'/>
      </div>
    </van-pull-refresh>
   </div>
   </div>
</template>

<script>

import Headers from '../../components/header'
import collHead from '../../components/collection-head'
import emptyMsg from '../../components/emptyMsg/index'
import { PullRefresh,Toast } from 'vant';
export default {
    created(){
      this.getcollect()
    },
    components:{
        Headers,
        collHead,
        emptyMsg,
        'van-pull-refresh':PullRefresh
    },
    data(){
        return{
            title:'我的收藏',
            arr:[{title:'求租'},{title:'出租'},{title:'转让'},{title:'求购'},],
            count:0,
            isLoading: false,
            load:'下拉加载中',
            list:[],
            page:1,
            page_size:10,
            More:false
        }
    },
    methods:{
      isGo(){
        this.$router.push('/')
      },
      // 请求数据
      getcollect(){
        let {page,page_size}  = this
        this.$axios.get('/user/collect-list',{params:{mode:1,page,page_size}}).then(res=>{
          this.list = [...res.content.list]
          this.isLoading && (this.isLoading = false);
            if(!res.content.length || res.content.length<page_size){
                this.More = true
            }
        })
      },
      // 下拉刷新
       onRefresh() {
      this.getcollect()
    },
  }
}

</script>
<style lang='scss' scoped>
@import './collection.scss'
</style>
