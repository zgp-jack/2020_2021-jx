<template>
    <Release v-if="clas.length && userinfo!=='{}'"/>
</template>

<script>
import Release from '../../components/release'
export default {
  components:{
    Release
  },
    data(){
      return{

      }
    },
    methods:{
    },
    computed:{
      userinfo(){
        return JSON.stringify(this.$nuxt.$store.state.userinfo);
      },
      clas(){
        return this.$nuxt.$store.state.clas
      }
    }
}
</script>

<style lang='scss' scoped>
</style>
