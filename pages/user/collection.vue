<template>
   <div>
       <Headers :title="title"/>
       <collHead :arr = 'arr' @modeType = 'getcoll'/>
    <div class="father">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

           <!-- <div class="list_one">暂无此类信息</div> -->
        <div style="height:calc(100vh - 2rem);overflow-y:auto;">
              <van-list
      v-model="listLoading"
      :finished="iscomplete"
      @load="getcollect"
      loading-text="加载中...">
           <div class="collection_item" v-for="(item,i) in list" :key='i'>
              <div class="top">
                <p>{{item.title}}</p>
                <span @click="isGo(item.uu)">查看 ></span>
              </div>
              <div class="bottom">
                <p>{{item.title}}</p>
                <span>{{item.time}}</span>
                <span @click="Cancel(i,item.uu)">取消收藏</span>
              </div>
           </div>
         </van-list>
           <emptyMsg  :empty1='true' v-if='More'/>
           <emptyMsg  :empty2='true' v-if='Moreimg'/>
      </div>
    </van-pull-refresh>
   </div>
   </div>
</template>

<script>

import Headers from '../../components/header'
import collHead from '../../components/collection-head'
import emptyMsg from '../../components/emptyMsg/index'
import { PullRefresh,Toast,List } from 'vant';
export default {
    beforeMount(){
      this.getcollect();
    },
    components:{
        Headers,
        collHead,
        emptyMsg,
        'van-pull-refresh':PullRefresh,
        'van-list':List
    },
    data(){
        return{
            title:'我的收藏',
            arr:[{title:'求租',id:'1'},{title:'出租',id:'2'},{title:'转让',id:'3'},{title:'求购',id:'4'},],
            count:0,
            isLoading: false,
            load:'下拉加载中',
            list:[],
            page:1,
            page_size:10,
            More:false,
            listLoading:false,
            iscomplete:false,
            Moreimg:false,
            modeler:1,
        }
    },
    methods:{
      isGo(id){
        this.$router.push({
            path:'/view',
            query:{
              info:id,
              mode:this.modeler
            }
        })
      },
      // 请求数据
      getcollect(mode){
        this.listLoading = true
        let modes = mode?mode:1
        let {list}  = this
        let page = this.page
        let page_size = this.page_size
        this.$axios.get('/user/collect-list',{params:{mode:modes,page,page_size}}).then(res=>{
        this.listLoading = false;
        !res.content.next?(this.iscomplete=true,res.content.list.length!=0 && !res.content.next ?this.More = true:this.More = false):(this.iscomplete=false)
        res.content.list.length<=0?(this.Moreimg=true,this.More=false):(this.Moreimg=false)
        list = this.page==1?[...res.content.list]:[...list,...res.content.list]
        this.isLoading && (this.isLoading = false);
        this.$set(this,'list',[...list])
        this.page++
        })
      },
      // 下拉刷新
       onRefresh() {
         this.page = 1
         this.More = false
         this.getcollect(this.modeler);
         this.isLoading= false;
    },
    // 点击请求
      getcoll(mode){
         if(this.modeler == mode) return false;
         this.page = 1;
         this.More = false
         this.getcollect(mode)
         this.modeler = mode
      },
      // 取消收藏
      Cancel(index,id){
          const mode = this.modeler
          let data = {id:id,type:2,mode:mode}
          this.$axios.post('/index/collection',{data:JSON.stringify(data)}).then(res=>{
                const {code} = res
                switch (code) {
                      case 200:
                      this.list.splice(index,1)
                      Toast(res.msg)
                      break;
                      case 500:
                      Toast(res.msg)
                      break;
                      case 0:
                      Toast(res.msg)
                      this.$router.push('/login')
                      break;
                      default:
                      break;
                }
          })
      }
  }
}

</script>
<style lang='scss' scoped>
@import './collection.scss'
</style>
