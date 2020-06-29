<template>
    <div class="model_mask">
        <van-loading type="spinner" color="#FFAA26" size="32px"/>
    </div>
</template>

<script>
import { Loading } from "vant";
export default {
  data() {
    return {};
  },
  components: {
    "van-loading": Loading
  }
};
</script>


<style lang='scss' scoped>
    .model_mask{
        background-color: rgba(0, 0, 0,0.01);
        .van-loading{
            position: absolute;
            z-index: 1000;
            top: calc(50% - 15px);
            left: calc(50% - 15px);
            line-height: 30px;
            text-align: center;
        }
    }
</style>
