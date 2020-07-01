import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store =()=>new Vuex.Store({
    state:{
        counter:10
    },
    mutations:{
        increment(state,value){
          console.log(state.counter=32);
            state.counter = 50
        },
        reduce(state){
            state.counter--
        }
    }
  })
export default store
