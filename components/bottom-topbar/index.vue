<template>
  <div>
      <div class="father" :class="isshow==false?'top-hide':''">

      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        my_scroll:0,
        isshow:true,
    }
  },
  methods:{
     handleScroll(scr){
            const scrollTop = scr;
            let {my_scroll,isshow} = this;
            // 页面滚动距顶部距离
            if(scrollTop>my_scroll && isshow){
                this.isshow = false;
            }else if(scrollTop<my_scroll && !isshow){
                this.isshow = true;
            }
            this.my_scroll=scrollTop
        },
  }
}
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
