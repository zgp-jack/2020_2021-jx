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
        //默认头像
        default_portrait:{},
        //当前地址
        default_addr:{},
        show:false
    },
    mutations:{
        //设置机械类型
        setMechanics(state,obj){
            state.type = [...obj.type]
            state.clas = [...obj.clas]
        },
        //设置默认头像
        setPortrait(state,obj){
            state.default_portrait = {...obj}
        },
        //当前地址
        setDefaultAddr(state,obj){
            state.default_addr = {...obj}
        },
        //打电话弹窗
        setCallPhone(state,bool){
          state.show = bool
        }
    },
  })
  export default store
