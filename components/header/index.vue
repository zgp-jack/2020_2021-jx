<template>
    <header class="header" :style="{'background-color':color?color:'#FFAA26'}">
        <span class="header_lefticon"><van-icon name="arrow-left" @click='onback'/></span>
        <h1>{{title}}</h1>
        <p class="confirm" v-if="ensure_text" @click="onEnsure">{{ensure_text}}</p>
    </header>
</template>

<style lang='scss'>
    @import './style.scss';
</style>

<script>
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);
export default {
    props:['title','onskip','ensure_text','getParentFn','color',"go_home_page"],
    data(){
        return{

        }
    },
    methods:{
        onback(){
          if(this.onskip){
              this.onskip()
              return false;
          }
          if(this.$props.go_home_page) {
            this.$router.push("/list/1");
            return false;
          }
          if(history.length <= 1){
              this.$router.push("/home");
              return false;
          }
          this.$router.go(-1)
        },
		onEnsure(){
			this.$emit('getParentFn')
		}
  }
}
</script>
