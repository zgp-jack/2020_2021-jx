<!-- vant-picker地区选择 -->
<template>
<div>
    <van-popup v-model="isShow" position="bottom">
        <van-picker show-toolbar title="选择地区信息" :columns="columns" value-key="name" @confirm="onConfirm" @cancel="onCancel" :values="defaultIndex" ref='picker'/>
    </van-popup>
</div>
    
</template>

<script>
import { Picker,Popup } from "vant";
export default {
  data() {
    return {
        isShow:false,
        columns:[],
        defaultIndex:['北京','西城区']
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
      city.forEach((element,index) => {
          let newCity = [];
          let children = []
          newCity = element[0]
          children = element.slice(1)
          let newItem = {...newCity,children:[...children]}
          newData.push({...newItem})
      });
      this.$set(this,'columns',[...newData])
  },
  methods:{
      onShow(flag){
          this.$set(this,'isShow',flag)
      },
      onCancel(){
          this.onShow(false)
      },
      onConfirm(e){
          let index = this.$refs.picker.getValues()
          //执行父组件方法
          
          this.onShow(false)
      }
  }
};
</script>


<style lang='scss' scoped>
</style>
