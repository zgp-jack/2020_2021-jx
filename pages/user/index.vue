<!-- 个人中心 -->
<template>
  <div class="father">
    <!-- <Harbar :title="title"/> -->
    <div class="container">
        <div class="head">
            <h1 class="title">
              个人中心
            </h1>
            <div class="user">
                <div class="top">
                    <img :src="userinfo.header?userinfo.header:'http://statics.zhaogongdi.com/common/default_header.png'"/>
                    <div class="userinfo">
                      <h3>{{userinfo.name?userinfo.name:''}}</h3>
                      <h3 style="display:inline-block;">用户编号:</h3>
                      <p style="display:inline-block;">
                        <span class="main_textc">
                          {{userinfo.id?userinfo.id:''}}
                        </span>
                      </p>
                    </div>
                    <div class="update" @click="toInfo">修改资料</div>
                </div>
                <div class="bottom">
                    <div>
                      <p class="main_textc" @click="harvest(1)">{{userinfo.coin_balance?userinfo.coin_balance:'0'}}</p>
                      <p>可用鱼泡币</p>
                    </div>
                    <div>
                      <p class="main_textc" @click="harvest(0)">{{userinfo.coin_consume?userinfo.coin_consume:'0'}}</p>
                      <p>消耗鱼泡币</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 鱼泡币获取 -->
        <div class="menus">
            <div v-for="(item,i) in yupao_arr" :key='i' @click="menusGo(i)">
                <img :src="item.src"/>
                <p v-text="item.text"></p>
            </div>
        </div>
        <!-- 我的信息 -->
        <div class="list_menu">
            <div class="desc" v-for="(item,i) in my_list" :key="i">
                <img :src="item.src">
                <div class="desc_main">
                    <div>
                        <P v-text="item.title"></P>
                        <P v-text="item.detail"></P>
                    </div>
                    <div class="main_textc main_bordc" @click="isGo(i)">查看详情</div>
                </div>
            </div>
        </div>
        <!-- 客服电话 -->
        <div class="server_tel" @click="tel">
          客服电话:&nbsp;{{contacts.contact}}
        </div>
    </div>
    <Tarbar/>
 </div>
</template>

<script>
import Tarbar from '../../components/tarbar'
import {callPhoneFn,GetUser,whetherLogin} from '../../static/utils/utils'
export default {
  beforeMount(){
    GetUser(this,(res) => {
      this.userInfo = res
    })
    document.cookie.indexOf('token') == -1 && this.$router.replace("/login")
  },
  data(){
    return{
      title:'个人中心',
      yupao_arr:[
        {
          id:0,
          src:"http://statics.zhaogongdi.com/common/coin_get.png",
          text:'获取鱼泡币'
        },
        {
          id:1,
          src:"http://statics.zhaogongdi.com/common/coin_consume.png",
          text:'鱼泡币消耗'
        },
        {
          id:2,
          src:"http://statics.zhaogongdi.com/common/coin_source.png",
          text:'鱼泡币来源'
        },
      ],
      my_list:[
        {src:"http://statics.zhaogongdi.com/common/user_collect.png",title:'我的收藏',detail:'收藏的求租，出租、转让、求购信息'},
        {src:"http://statics.zhaogongdi.com/common/user_release.png",title:'我的发布',detail:'发布的求租，出租、转让、求购信息'},
        {src:"http://statics.zhaogongdi.com/common/user_company.png",title:'我的企业',detail:'诚邀各大机械租赁企业入驻'},
        {src:require('../../assets/img/opinion.png'),title:'意见反馈',detail:'提交您的问题与建议'},
        {src:"http://statics.zhaogongdi.com/common/user_set.png",title:'设置',detail:'意见建议、联系我们'}],
      list:{},
      userInfo:{},
      contact:{}
    }
  },
  components: {
    Tarbar,
  },
  methods:{
    toInfo(){
     this.$router.push('/user/info')
    },
    // 跳转
    isGo(i){
      switch (i) {
       case 0:
        this.$router.push('/user/collection')
        break;
       case 1:
        this.$router.push({path:'/user/release/',query:{mode:1}})
        break;
      // case 2:
      //   this.$router.push('/user/welfare')
      //   break;
      case 2:
        //ajax请求
        this.$axios.post('/company/mine').then(res=>{
          if(res.code == 200) this.$router.push({name:'company-user',params:{data:res.content}})
          else if(res.code == 505) this.$router.push('/user/company')
          else this.$router.push('/user/company')
        })
        return
        break;
      case 3:
        this.$router.push('/user/face-book')
        break;
       case 4:
        this.$router.push('/user/personalSettings')
        break;
      default:
      break;
      }
    },
    menusGo(i){
    switch (i) {
      case 0:
        this.$router.push('/user/get')
        break;
      case 1:
        this.$router.push({path:'/user/isget',query:{mode:0}})
        break;
      case 2:
        this.$router.push({path:'/user/isget',query:{mode:1}})
        break;
      default:
      break;
      }
    },
      // 打电话
    tel(){
      callPhoneFn(15608008605)
    },
    harvest(mode){
      if(mode == 0)this.$router.push({path:'/user/isget',query:{mode:mode}})
      if(mode == 1)this.$router.push({path:'/user/isget',query:{mode:mode}})
    }
  },
  computed:{
    userinfo(){
      let userInfo = {...this.userInfo}
      return userInfo
    },
    contacts(){
      return this.$nuxt.$store.state.contact
    }
  }

}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
