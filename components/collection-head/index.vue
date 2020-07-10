<template>
  <div class="fathers">
      <div v-for="(item,i) in arr" :key="i" @click="active(i,item.id)" :class="{'active':ActiveIndex == i}">{{item.title}}</div>
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
        active(i,mode){
            this.ActiveIndex = i
            this.$emit('modeType',mode)
        }
    }
}
</script>

<style lang='scss' scoped>
 @import './index.scss'
</style>
