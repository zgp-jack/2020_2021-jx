import Vue from 'vue'
import Vuex from 'vuex'
import area from '../static/exports/area_type';
const area_type = area.get_area()

Vue.use(Vuex);

const store =()=>new Vuex.Store({
    state:{
        //地区
        city:area_type.city,
        area:area_type.area,
        //机械类型
        type:[],
        clas:[],
        num:0
    },
    mutations:{
        //设置机械类型
        setMechanics(state,obj){
            state.type = [...obj.type]
            state.clas = [...obj.clas]
        },
        test(state,num){
            state.num +=num
        }
    },
    getters:{
        //设置机械类型
        getMechanics(state){
            return {type:state.type,clas:state.clas}
        }
    }
  })
  export default store