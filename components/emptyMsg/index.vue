<template>
    <div class="emptyMsg">
        <div v-if="empty1" class="empty1">
            <p>{{text || '没有更多数据了'}}</p>
        </div>
        <div v-else-if="empty2" class="empty2">
            <img src="http://statics.zhaogongdi.com/common/list_empty.png?v=10001" alt="">
            <p>{{text || '暂无此类数据'}}</p>
        </div>
    </div>

</template>

<style lang='scss' scoped>
    .emptyMsg{
        text-align: center;
        font-size: 0.33rem;
        color: #666;
        img{
            width: 4rem;
            height: auto;
        }
        p{
            line-height: 0.6rem;
            padding: 0.2rem 0;
        }
    }
</style>

<script>
import Vue from "vue";

export default {
  props: ["text", "empty1","empty2"],
  data() {
    return {};
  }
};
</script>
