import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export const stores = ()=>({
    state:{
        counter:0
    },
  })
export const mutations ={
    increment(stores){
        stores.state.counter++
     },
     reduce(stores){
        stores.state.counter--
     }
 }