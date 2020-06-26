<!-- 自定义地区选择 -->
<template>
    <div class="model_mask" >
        <div class="inner clearfix">
            <div class="city fl">
                <div @click="provinceChosed(0)" :class="{'item':provinceChosedIndex==0,'selectItem':provinceChosedIndex==0}">{{city[0].name}}</div>
                <div v-for="(item,index) in city" :key="index" v-if="index>0" @click="provinceChosed(index)" :class="{'item':provinceChosedIndex==index,'selectItem':provinceChosedIndex==index}">{{item[0].name}}</div>
            </div>
            <div class="area item fl">
                <div v-for="(item,index) in city" :key="index" v-if="index>0 && provinceChosedIndex===index" :class="{'selectItem':cityChosedIndex==index}">
                    <div v-for="(item,index) in item" :key="index" v-if="index>0">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    @import './style.scss';
</style>

<script>
import store from '../../store/area.js';
import { mapMutations,mapState } from 'vuex';
import Tarbar from '../../components/tarbar'
import { Search } from 'vant';
import { constants } from 'zlib';
export default {
    // props:['title','onskip'],
    data(){
        return{
            provinceChosedIndex:null,
            cityChosedIndex:null,
        }
    },
    store,
    methods:{
        provinceChosed(index){
            this.$set(this,"provinceChosedIndex", index)
        },
        cityChosed(index){

        }
    },
    computed:{
    ...mapState(['city'])
  }
}
</script>

