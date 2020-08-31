<template>
  <div>
    <Headers :title="title" @getParentFn="goRelease" />
      <div class="father">
          <div class="yupao-user-share">
              <div class="user-share-item">
                  <div class="user-share-link">
                      复制下方（你的专享邀请链接，发到QQ群、论坛、贴吧，机友通过你的专享邀请链接来到鱼泡机械。
                  </div>
                  <div class="user-share-mine">
                      <input type="text" v-model="link">
                  </div>
              </div>
              <div class="user-copy" @click="copyLink">
                  点击复制
              </div>
          </div>
          <BottomTop  ref="child" :hiddenAll="true" />
      </div>
  </div>
</template>

<script>
import Headers from '../../components/header';
import {Copynum} from '../../static/utils/utils.js';
import {Dialog} from 'vant'
import BottomTop from '../../components/bottom-topbar/index.vue';
export default {
    components:{
        Headers,
        BottomTop
    },
    data(){
        return{
          title:'邀请好友_鱼泡机械',
          link:'http://m.zhaogongdi.com/qiuzu/?code=K1A5UmX2V15UWxA&source=M',
        }
    },
    methods:{
      copyLink(){
        //点击复制
        Copynum(this,this.link);
        Dialog.alert({
          title:'温馨提示',
          message:"您的邀请链接已复制到粘贴板,赶快去邀请好友吧！"
        })
      },
      goRelease(){
        this.$refs.child.list_show();
      }
    }
}
</script>

<style lang='scss' scoped>
    @import '../../assets/css/style.scss';
    .father{
        @include box_inner($bottom:0rem,$padding-bottom:1rem);
        color:$font-color;
        font-size: 0.35rem;
            .yupao-user-share{
                position: relative;
                margin-top:0.3rem;
                padding: 0 0.3rem;
                    .user-share-item{
                            position: relative;
                            margin-top: 0.1rem;
                            background: white;
                            padding:0.08rem;
                            border-radius:0.07rem;
                            box-shadow: #e7e6e5 0 0 0.1rem;
                                .user-share-link{
                                        font-size: 0.25rem;
                                        line-height: 0.35rem;
                                        color: #686767;
                                }
                                .user-share-mine{
                                        position: relative;
                                        padding: 0.08rem 0;
                                            input{
                                                width: 100%;
                                                line-height:0.5rem;
                                                height: 0.8rem;
                                                padding:0.1rem 0.3rem;
                                                border: 1px solid rgba(0,0,0,.2);
                                                border-radius: 0.03rem;
                                                background-color: #fff;
                                                font-size: 0.29rem;
                                            }
                                }
                    }
                    .user-copy{
                        position: relative;
                        background:$color;
                        width: 80%;
                        display: block;
                        color: #fff;
                        height:0.8rem;
                        line-height:0.8rem;
                        text-align: center;
                        border-radius:0.08rem;
                        margin: 0.2rem auto 0;
                        letter-spacing:0.02rem;
                        font-size:0.33rem;
                    }
            }
    }
</style>
