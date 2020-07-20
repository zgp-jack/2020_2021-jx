<template>
    <header class="header" >
        <span class="header_lefticon"><van-icon name="arrow-left" @click='onback'/></span>
        <p>{{title}}</p>
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
    props:['title','onskip','ensure_text','getParentFn'],
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
            this.$router.go(-1)
        },
		onEnsure(){
			this.$emit('getParentFn')
		}
  }
}
</script>
