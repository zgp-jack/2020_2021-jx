<template>
  <div class="fathers">
      <div v-for="(item,i) in arr" :key="i" @click="active(i,item.id)" :class="{'active':ActiveIndex == item.id}">{{item.title}}</div>
  </div>
</template>

<script>
export default {
    props:['arr'],
    beforeMount(){
        this.$set(this,'ActiveIndex',this.arr[0].id)
    },
    data(){
        return{
            ActiveIndex:''
        }
    },
    methods:{
        active(i,mode){
            if(this.ActiveIndex == mode) return false
            this.ActiveIndex = mode
            this.$emit('modeType',mode)
        },
        onchangeIndex(id){
            this.$set(this,'ActiveIndex',id)
        }
    }
}
</script>

<style lang='scss' scoped>
 @import './index.scss'
</style>
