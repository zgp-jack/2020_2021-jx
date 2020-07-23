<template>
  <div>
    <Header :title='title'/>
    <div class="father">
    <van-list
      v-model="listLoading"
      :finished="iscomplete"
      @load="getList">
      <div class="list-company" v-for="(item,i) in list" :key="i">
        <div class="company-info" @click="godetail(item.uu_id)">
            <div class="imgs">
              <img :src="[item.cover?item.cover:'http://statics.zhaogongdi.com/common/default_header.png']">
            </div>
            <div class="info">
                <div class="name">{{item.name}}</div>
                <div class="gong-img">
                  <span class="iconfont icon-gongying gongying"></span>
                  <span class="iconfont icon-VIP-tongguo vip" v-if="item.authenticate==2"></span>
                </div>
                <div class="area">{{item.area}}</div>
            </div>
        </div>
      </div>
    </van-list>
    <emptyMsg  :empty1='true' v-if='More'/>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header'
import emptyMsg from '../../components/emptyMsg/index'
import {List } from 'vant';
export default {
    created(){
      this.getList()
    },
    components:{
        Header,
        'van-list':List,
        emptyMsg
    },
    data(){
      return{
        title:'供应商-鱼泡机械',
        page:1,
        area:1,
        type:0,
        page_size:10,
        list:[],
        listLoading:false,
        iscomplete:false,
        More:false,
      }
    },
    methods:{
      getList(){
            this.listLoading = true
            let params = {page:this.page,area:this.area,type:this.type,page_size:this.page_size}
            this.$axios.get('/company',{params}).then(res=>{
            this.listLoading = false
            this.list = !this.list.length?[...res.content]:[...this.list,...res.content]
            res.content.length>=10?(this.iscomplete = false,this.page++):(this.iscomplete = true,this.More = true)
            })
        },
        godetail(id){
          this.$router.push({
            path:'/company/info',
            query:{id:id}
          })
        }
    }
}
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
