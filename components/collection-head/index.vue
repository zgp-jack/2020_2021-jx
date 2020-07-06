<template>
  <div class="fathers">
      <div v-for="(item,i) in arr" :key="i" @click="active(i)" :class="{'active':ActiveIndex == i}">{{item.title}}</div>
  </div>
</template>

<script>
export default {
    props:['arr'],
    data(){
        return{
            ActiveIndex:0
        }
    },
    methods:{
        active(i){
            this.ActiveIndex = i
        }
    }
}
</script>

<style lang='scss' scoped>
 @import './index.scss'
</style>