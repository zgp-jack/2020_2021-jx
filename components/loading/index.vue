<template>
    <div class="model_mask" v-if="loading">
        <img src="../../assets/img/index_loading.gif" alt="加载中...">
    </div>
</template>

<script>
import { Loading } from "vant";
export default {
  data: () => ({
      loading: true
    }),
    mounted(){
      if(!this.$props || !this.$props.show){
          this.loading = false;
      }
    }
  }
</script>


<style scoped>
    .model_mask{
        display: flex;
        background-color: #fff;
        align-items: center;
        z-index: 1001 !important;
    }
    img{
        width: 100%;
        height: auto;
    }
    .van-toast--loading{
        z-index: 1000 !important;
    }
</style>
