<!-- vant-picker地区选择 -->
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
 props:['onSelectd'],
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
  created(){
      let newData = [];
      let {city} = window.$nuxt.$store.state;
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
      this.$set(this,'columns',[{values:[...newCity]},{values:[...children[0]]}])

      this.columns = [{values:[...newCity]},{values:[...children[0]]}]
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
      }
  }
};
</script>


<style lang='scss' scoped>
</style>

