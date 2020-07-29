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
                <div class="nickName reset-psd" style="padding-left:0.3rem;" @click="userName">
                    <span style="letter-spacing:36px;">昵称</span>
                    <span>{{userinfo.name}}</span>
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
        <van-dialog v-model="show" title="修改姓名" show-cancel-button width="260px" @confirm="()=>onConfirm(userinfo.name)" confirmButtonColor='#FFA926'>
          <p class="namestype">请输入您的名字(2-5)个字</p>
          <input type="text" :placeholder="userinfo.name" class="typein" ref="getValue">
        </van-dialog>
    </div>
</template>

<script>
import Headers from '../../components/header'
import {Toast,Uploader,Dialog} from 'vant';
import Vue from 'vue';
import {uploadPictures} from '../../static/utils/utils'
Vue.use(Uploader)
export default {
    components:{
        Headers,
        [Dialog.Component.name]: Dialog.Component,
    },
    data(){
        return{
            title:'鱼泡机械-个人资料',
            username:'',
            show:false
        }
    },
    computed:{
        userinfo(){
          return this.$nuxt.$store.state.userinfo
        }
    },
    methods:{
      modfiy(){
        this.$router.push('/user/modfiy_password/modfiy_password')
      },
      // 修改头像
      ChangeHeader(file){
        uploadPictures(this,file.file).then(res =>{
           if(res){
             const params = {header:res.content.value}
             this.$axios.get('/user/update-header',{params}).then( res => {
                this.$nuxt.$store.state.userinfo.header = res.content
             })
           }else{
             Toast('头像修改失败,请稍后再试')
           }
        })
      },
      phone(){
       this.$router.push('/set/change-phone')
      },
      userName(){
        this.show = true
      },
      onConfirm(info){
        let Newname = this.$refs.getValue.value
        if((Newname.length<2 || Newname.length>5) || Newname.split(" ").join("").length == 0){
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
                this.$nuxt.$store.state.userinfo.name = Newname
              }
        })
      }
    }
}
</script>

<style lang='scss' scoped>
 @import './info.scss'
</style>
