<template>
  <div class='layout'>
    <nuxt v-if="isShow"/>
    <Loading v-else-if="!isShow || counter!==0"/>
  </div>
</template>

<script>
import Loading from "../components/loading";
import storeLoading from "../store/serverLoading.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isShow: false
    };
  },
  storeLoading,
  components: {
    Loading
  },
  mounted() {
    setTimeout(() => {
      this.$set(this, "isShow", true);
    }, 10);
  },
  computed: {
    ...mapState(["counter"])
  },
  methods: {
    increment() {
      state.counter++;
    },
    reduce() {
      state.counter--;
    }
  }
};
</script>


<style scoped>
.model_mask {
  width: 100%;
  left: 0;
}
</style>
