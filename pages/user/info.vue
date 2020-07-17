<template>
    <div>
        <Headers :title="title"/>
        <div class="father">
            <div class="info">
                <div class="headers reset-psd">
                    <div class="header-img" :style="{backgroundImage:`url(${userinfo.header})`}">
                    </div>
                    <van-uploader :after-read="ChangeHeader" :max-count="1">
                    <div @click="ChangeHeader">修改头像</div>
                    </van-uploader>
                </div>
                <div class="nickName reset-psd" style="padding-left:0.3rem;">
                    <span style="letter-spacing:36px;">昵称</span>
                    <input type="text" :value='userinfo.name' @keyup.enter = 'UpdateName(userinfo.name)' ref="getValue" />
                </div>
                <div class="nickName reset-psd">
                    <span>手机号码</span>
                    <span @click="phone">{{userinfo.tel}}<i class="icon"></i></span>
                </div>
            </div>
            <div class="nickName reset-psd nones" @click="modfiy">
                    <span>修改密码</span>
                     <i class="icon"></i>
                </div>
        </div>
    </div>
</template>

<script>
import Headers from '../../components/header'
import {Toast,Uploader} from 'vant';
import Vue from 'vue';
import {uploadPictures} from '../../static/utils/utils'
Vue.use(Uploader)
export default {
    components:{
        Headers
    },
    data(){
        return{
            title:'鱼泡机械-个人资料',
            username:'',
        }
    },
    computed:{
        userinfo(){
          return window.$nuxt.$store.state.userinfo
        }
    },
    methods:{
      modfiy(){
        this.$router.push('/user/modfiy_password/modfiy_password')
      },
      // 修改昵称
      UpdateName(info){
        let Newname = this.$refs.getValue.value
        if(!Newname || Newname.split(" ").join("").length == 0){
          Toast('请输入正确昵称')
          return false
        }
        if(Newname && info == Newname){
          Toast('昵称无改动')
          return false
        }
        this.$axios.post('/user/update-name',{name:Newname}).then( res => {
              if(res){
                Toast('修改成功')
                window.$nuxt.$store.state.userinfo.name = Newname
              }
        })
      },
      // 修改头像
      ChangeHeader(file){
        uploadPictures(this,file).then(res =>{
           if(res){
             const params = {header:res.content.value}
             this.$axios.get('/user/update-header',{params}).then( res => {
                 window.$nuxt.$store.state.userinfo.header = res.content
             })
           }else{
             Toast('头像修改失败,请稍后再试')
           }
        })
      },
      phone(){
        console.log(1)
      }
    }
}
</script>

<style lang='scss' scoped>
 @import './info.scss'
</style>
