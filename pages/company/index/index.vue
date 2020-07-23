<template>
  <div>
    <Header :title='title'/>
    <div class="select_head">
        <div class="select_inner clearfix" @click="onisclose('isSelect_area')"><i class="iconfont icon-down fr" :class="{'rotate':isSelect_area}"/><p class="fr">{{selectAreaData.name || '所在地区'}}</p></div>
        <div class="select_inner clearfix" @click="onisclose('isSelect_jixie')"><i class="iconfont icon-down fr" :class="{'rotate':isSelect_jixie}"/><p class="fr">{{selectJixieData.name || '所有机械'}}</p></div>
    </div>
    <div class="father">
      <van-pull-refresh v-model="listLoading" @refresh="onRefresh">
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
                    <div class="gong-img">11</div>
                    <div class="area">{{item.area}}</div>
                </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
      <emptyMsg  :empty1='iscomplete && !More' :empty2='More'/>
    </div>

    <!-- 地区选择 -->
    <CustomArea :onSelect="onSelect" :isSelect_area="isSelect_area" onlyFather = 'true' :default_data="CustomArea_default_data"/>

    <!-- 机械类型选择 -->
    <CustomMechanicalType :onSelect="onSelect" :isSelect_jixie="isSelect_jixie" onlyFather = 'true'/>

  </div>
</template>

<script>
import Header from '../../../components/header';
import emptyMsg from '../../../components/emptyMsg/index';
import {List,PullRefresh } from 'vant';
import CustomArea from '../../../components/customArea';
import CustomMechanicalType from '../../../components/customMechanicalType';
export default {
    components:{
        Header,
        'van-list':List,
        'van-pull-refresh':PullRefresh,
        emptyMsg,
        CustomArea,
        CustomMechanicalType
    },
    data(){
      return{
        title:'鱼泡机械-供应商',
        page:1,
        area:1,
        type:0,
        page_size:10,
        list:[],
        listLoading:false,
        iscomplete:false,
        More:false,

        selectAreaData: {}, //选择的数据
        selectJixieData: {},
        isSelect_area: false,
        isSelect_jixie: false,

        CustomArea_default_data:{province:{id: 1,name: '全国',pid: '0'}}
      }
    },
    methods:{
 
      getList(){
        this.listLoading = true
        let params = {page:this.page,area:this.area,type:this.type,page_size:this.page_size};
        const that = this;
        this.$axios.get('/company',{params}).then(res=>{
          if(res.code == 200 ){
            if(that.page == 1){
              if(res.content.length && res.content.length<that.page_size){
                that.iscomplete = true;
                that.More = false;
              }else if(!res.content.length){
                that.More = true;
              }else{
                that.iscomplete = false;
                that.More = false;
              }
            }else{
              if(res.content.length<that.page_size){
                that.iscomplete = true;
                that.More = false;
              }else{
                that.iscomplete = false;
                that.More = false;
              }
            }
            const list =  that.page == 1?[...res.content]:that.list.push(...res.content);
            this.page +=1 ;
            that.listLoading = false;
            that.list = [...list];
          }
        })
      },
      godetail(id){
        this.$router.push({
          path:'/company/info',
          query:{id:id}
        })
      },
      onisclose(type) {
        let flag = this[type] ? false : true;
        this.onSelect(type, flag);
      },
      //控制赛选框显示隐藏
      onSelect(type, flag, Data) {
        if(flag){
          this.closeAll(type)
        }
        this.$set(this, type, flag);
        // 关闭弹框请求接口
        if(Data){
          this.page = 1;
          switch(type){
            case 'isSelect_area' :
              this.selectAreaData = { ...Data };
              //接口请求
              this.area = Data.id;
              this.getList()
            break;
            //机械
            case 'isSelect_jixie' :
              this.selectJixieData = { ...Data };
              //接口请求
              this.type = Data.id;
              this.getList()
            break;
          }
        }
      },
      closeAll(type){
        type !=='isSelect_area' && this.isSelect_area && this.$set(this, 'isSelect_area', false);
        type !=='isSelect_jixie' && this.isSelect_jixie && this.$set(this, 'isSelect_jixie', false);
      },
      //下拉刷新
      onRefresh(){
        this.page = 1;
        this.getList()
      }
    }
}
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
