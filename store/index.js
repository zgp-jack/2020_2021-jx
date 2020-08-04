import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store =()=>new Vuex.Store({
    state:{
        //地区
        city:[],
        area:[],
        //机械类型
        type:[],
        clas:[],
        //默认头像
        default_portrait:{},
        //当前地址
        default_addr:{},
        
        //用户信息
        userinfo:{},

        //图片地址服务/file_domain
        img_server:'',

        //联系方式
        contact:'',

    },
    mutations:{
        //获取机械类型
        setMechanics(state,obj){
            state.type = [...obj.type]
            state.clas = [...obj.clas]
        },
        //获取默认头像
        setPortrait(state,obj){
            state.default_portrait = {...obj}
        },
        //获取当前地址
        setDefaultAddr(state,obj){
            state.default_addr = {...obj}
        },
        //设置用户信息
        setUserinfo(state,obj){
            state.userinfo = {...obj}
        },
        //设置图片服务地址
        setImgServer(state,str){
            state.img_server = str
        },
        //设置联系方式
        setContact(state,obj){
            state.contact = {...obj}
        },

        //设置地区选择
        setArea(state,obj){
            state.city = [...obj.city];
            state.area = [...obj.area];
        }
    },
  })
  export default store
