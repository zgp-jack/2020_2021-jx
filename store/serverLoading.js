import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store =()=>new Vuex.Store({
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
export default store