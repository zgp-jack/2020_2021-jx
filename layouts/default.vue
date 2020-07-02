<template>
  <div class='layout'>
    <nuxt v-if="isShow"/>
    <Loading v-else/>
  </div>
</template>

<script>
import Loading from "../components/loading";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    Loading
  },
  mounted() {
    setTimeout(() => {
      this.$set(this, "isShow", true);
    }, 10);
  },
};
</script>


<style scoped>
.model_mask {
  width: 100%;
  left: 0;
}
</style>
