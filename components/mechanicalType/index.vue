<!-- 单页面机械类型选择 -->
<template>
    <div :class="['mechanics_select_box',isShow?'mechanics_show':'']">
        <Header title="机械类型选择" :onskip="onclose" ensure_text="确定" @getParentFn="selectd"/>
        <div class="mechanics-inner">
            <div class="top">
                <div class="title">
                    已选机械 <span class="msg">(最多可选3个类型）</span>
                </div>
                <div class="mechanics">
                    <div v-if="selectData.length">
                        <span v-for="(item,index) in selectData" :key="index" @click="colorSelect(item)">{{item.name}}<i class="iconfont icon-cuo"/></span>
                    </div>
                </div>
            </div>
            <div class="mechanics_select" ref="select_box">
                <div class="title">选择分类</div>
                <div class="list" v-for="(item,index) in clas" :key="index">
                    <div>
                        <p class="list_title clearfix"  :class="[index == clas.length - 1 && 'nonedet']" @click="(e)=>showSelect(index,e)">{{item[0].name}}<i :class="['icon-arrowBottom-fill','iconfont',!item[0].show?'rotate':'']"/><span v-if="item[0].number">{{item[0].number}}</span></p>
                        <div class="list_data" v-if="item[0].show">
                            <span :class="itemSon.color?'yellow':''" v-for="(itemSon,indexSon) in item" :key="indexSon" v-if="indexSon!==0" @click="colorSelect(itemSon)">{{itemSon.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
import {deepCopy} from '../../static/utils/utils.js'
export default {
  props:['onSelectd','default_Mechanical'],
  data() {
    return {
        clas:[],
        selectData:[],
        readOnlyClasData:[],
        oldSelectData:[],
        isShow:false,
    };
  },
  beforeMount(){
      let clas = deepCopy(this.$nuxt.$store.state.clas);
      clas.splice(0,1)
      this.$set(this,'clas',deepCopy(clas))
      this.readOnlyClasData = deepCopy(clas);
      if(this.default_Mechanical){
          this.default_Mechanical.forEach(item=>{
              this.colorSelect({...item})
          })
          this.oldSelectData = [...this.default_Mechanical];
          this.onSelectd([...this.default_Mechanical])
      }
  },
  methods:{

      onShow(flag){
          this.$set(this,'isShow',flag)
      },

      //展开
      showSelect(index,e){
          const {clas} = this;
          clas[index][0].show = clas[index][0].show?false:true;
          const that = this;
          setTimeout(()=>{
            clas[index][0].show && (that.$refs.select_box.scrollTop = e.target.offsetTop)
          },10)
          this.$set(this,'clas',[...clas])
      },
      //选择
      colorSelect(data){
          let indexFather;
          const {clas} = this;
          const that = this;
          clas.find((item,index)=>{
              if(item[0].pid === data.pid){
                  indexFather = index;
                  return [...item]
              }
          }).find((item,index)=>{
              if(item.id == data.id){
                  if(item.color){
                      item.color = false;
                      clas[indexFather][0].number-=1;
                      that.isAdd(data,false)
                  }else{
                      if(that.selectData.length==3){
                          Toast('最多可选3个类型')
                          return false
                      }
                      item.color = true;
                      clas[indexFather][0].number?clas[indexFather][0].number+=1:clas[indexFather][0].number=1;
                      that.isAdd(data,true)
                  }
                  return item
              }
          })
          that.$set(that,'clas',[...clas])
      },

      isAdd(data,add){          
          const selectData = deepCopy(this.selectData)
          if(add){
              selectData.push(data)
          }else{
              selectData.find((item,index)=>{
                  if(item.id==data.id){
                      return selectData.splice(index,1);
                  }
              })
          }
          this.$set(this,'selectData',[...selectData])
      },
      //确认后的回调
      selectd(){
          const {selectData} = this;
          this.oldSelectData = deepCopy(selectData)
          this.onSelectd([...selectData]);
          this.onShow(false)
      },
      //关闭后的回调
      onclose(){
          const {oldSelectData,onShow,selectData,colorSelect,readOnlyListData,readOnlyClasData,} = this;
          this.clas = deepCopy(readOnlyClasData);
          this.selectData = []
          oldSelectData && oldSelectData.forEach(item=>{
              colorSelect({...item,color:false})
          })
          onShow(false)
      }
  },
};
</script>


<style lang='scss' scoped>
    @import './style.scss'
</style>
