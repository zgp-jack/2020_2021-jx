import Vue from 'vue'
import Vuex from 'vuex'
import area from '../static/exports/area_type';
const area_type = area.get_area()

Vue.use(Vuex);

const store =()=>new Vuex.Store({
    state:{
        city:area_type.city,
        area:area_type.area
    },
    mutations:{
        
    }
  })
  export default store