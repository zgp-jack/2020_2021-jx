<template>
    <div class="model_mask">
        <img src="../../assets/img/index_loading.gif" alt="加载中..." v-show="show">
    </div>
</template>

<script>
import { Loading } from "vant";
export default {
  data() {
    return {
        show:false,
    };
  },
  beforeMount(){
    this.show = true
  },
};
</script>


<style >
    .model_mask{
        display: flex;
        background-color: #fff;
        align-items: center;
        z-index: 1001 !important;
    }
    img{
        width: 7.5rem;
        height: 5.62rem;
    }
    .van-toast--loading{
        z-index: 1000 !important;
    }
</style>
