<!-- vant-picker地区选择(这里city和area写反了) -->
<!-- 默认地区格式{city:id,area:id} -->
<template>
<div>
    <van-popup v-model="isShow" position="bottom">
        <van-picker show-toolbar title="选择地区信息" :columns="columns" @confirm="onConfirm" @cancel="onCancel" @change='onChange' ref='picker'/>
    </van-popup>
</div>

</template>

<script>
import { Picker,Popup } from "vant";
export default {
 props:['onSelectd','default_areaData'],
  data() {
    return {
        isShow:false,
        columns:[],
        default_columns:{},
        default_data:{},
        selectData:{},
    };
  },
  components: {
    "van-picker": Picker,
    'van-popup':Popup
  },
  beforeMount(){

      let newData = [];
      let {city} = this.$nuxt.$store.state;
      city = city.slice(1);

      let newCity = [];
      let children = [];
      let newCity_data = [];
      let children_data = [];
      city.forEach((element,index) => {
          newCity_data.push({...element[0]})
          children_data.push({...element.slice(1)})
          newCity.push(element[0].name)
          let arr = element.slice(1).map((item,sonindex)=> item.name)
          children.push([...arr])
      });
      this.default_data = {newCity_data:[...newCity_data],children_data:[...children_data]};
      this.default_columns = {newCity:[...newCity],children:[...children]}
      //设置传入地区
      const {default_areaData} = this;
        if(default_areaData){

            let indexCity,indexArea;
            let default_city = newCity_data.find((item,index)=>{
                if(item.id==default_areaData.city){
                    indexCity = index;
                    return item
                }
            })
            let default_arae = city[indexCity].find((item,index)=>{
                if(item.id == default_areaData.area){
                    indexArea = index-1;
                    return item
                }
            })
            this.columns = [{values:[...newCity],defaultIndex:indexCity},{values:[...children[indexCity]],defaultIndex:indexArea}];

            this.selectData = {city:{...default_city},area:{...default_arae}};
            //数据传入父组件
            this.onSelectd(this.selectData)
      }else{
          //设置默认地区
          this.columns = [{values:[...newCity]},{values:[...children[0]]}]
      }
  },
  methods:{
      onChange(picker, values) {
          let index = this.$refs.picker.getIndexes()
          picker.setColumnValues(1, this.default_columns.children[index[0]]);
      },
      onShow(flag){
          this.$set(this,'isShow',flag)
      },
      onCancel(){
          this.onShow(false)
      },
      onConfirm(e){
          let index = this.$refs.picker.getIndexes()
          const {default_data} = this;
          this.selectData = {city:{...default_data.newCity_data[index[0]]},area:{...default_data.children_data[index[0]][index[1]]}};
          //数据传入父组件
          this.onSelectd(this.selectData)
          this.onShow(false)
      },
  }
};
</script>


<style lang='scss' scoped>
</style>
