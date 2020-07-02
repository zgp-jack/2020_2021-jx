import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export const stores = ()=>({
    state:{
        counter:0
    },
    mutations:{
        onServers(state,data){
            state.counter++
            data.requestAxios().then(res=>{
                this.commit('reduce')
            })
        },
        reduce(state){
            state.counter--
        }
    }
  })
export const mutations ={
    increment(stores){
        stores.state.counter++
     },
     reduce(stores){
        stores.state.counter--
     }
 }