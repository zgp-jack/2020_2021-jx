<template>
  <div>
      <div class="father" @click="list_hide" :class="[(lists_show)?'Create':'']">
          <div class="create_content" :class="[(lists_show)?'Boxon':'']">
              <div class="create_item" v-for="(item,i) in list" :key="i">
                  <div class="create_list_left">
                      <div class="create_item_title">{{item.title}}</div>
                      <div class="create_item_msg">{{item.detail}}</div>
                  </div>
                  <div class="create_ite_right" @click="Isgo(item.src)">{{item.desc}}</div>
              </div>
          </div>
          <div class="iconfont icon-cuo closeCreate"></div>
      </div>
      <!-- 底部呼出 -->
      <div class="bottom-taber" :class="isshow==false?'top-hide':''" @click="list_show" v-if="hiddenAll==undefined"></div>
      <!-- 右侧呼出 -->
      <div class="flex_want_top" :class="isshow==false?'right-show':''" v-show="showWant" v-if="hiddenAll == undefined" @click="fabugo">
        <img src="http://statics.zhaogongdi.com/common/setTopButton.png">
      </div>
      <!-- 底部右侧呼出 -->
      <div class="flex_upload_bot" :class="isshow==false?'right-show':''" v-show="showWant" v-if="hiddenAll==undefined" @click="AppGo('https://a.app.qq.com/o/simple.jsp?pkgname=com.yupao.machine')" >
        <img src="http://statics.zhaogongdi.com/common/list_upload_app.png">
      </div>
      <!-- 签到 -->
    <div class="sign" @click="go_sign" :class="isshow==false?'right-show':''" v-show="qiandao" v-if="hiddenAll==undefined"></div>

    <div class="sign" @click="go_sign" :class="isshow==false?'right-show':''" v-show="qiandao">
    </div>

    <Sign :boxon = 'box_on' :boxshow = 'box_show' @handle = 'handle'/>
  </div>
</template>

<script>
import Sign from '../../components/Sign'
import {coinget} from '../../static/utils/utils'
export default {
    props:['showWant','qiandao','hiddenAll',"showAlert"],
    components:{
      Sign
    },
  data(){
    return{
        my_scroll:0,
        isshow:true,
        list:[
          {title:'发布求租机械信息',detail:'快速发布求租需求，1000万机械、机手任你选',desc:'我找机械',src:'../../common/create?mode=1'},
          {title:'发布出租机械信息',detail:'完整填写机械出租信息，无限好活接不完',desc:'机械找活',src:'../../common/create?mode=2'},
          {title:'发布转让机械信息',detail:'全网最大二手机械信息平台机械转手只需分分钟',desc:'我卖机械',src:'../../common/create?mode=3'},
          {title:'发布求购机械信息',detail:'50万条转让信息，总有一条适合你',desc:'我买机械',src:'../../common/create?mode=4'}
          ],
        lists_show:false,
        showButton:true,
        box_on:true,
        box_show:false
    }
  },
  methods:{
     handleScroll(scr){
            const scrollTop = scr;
            let {my_scroll,isshow} = this;
            // 页面滚动距顶部距离
            if(scrollTop>my_scroll && isshow){
                this.isshow = false;

            }else if(scrollTop<my_scroll && !isshow){
                this.isshow = true;
            }
            this.my_scroll=scrollTop
        },
        list_show(parmas=true){
          this.showButton = parmas;
          this.lists_show = true
        },
        list_hide(){
          this.lists_show = false
        },
        Isgo(link){
          this.$router.push(link)
        },
        //去签到
      go_sign(){
        const that = this
        this.box_show = true
          coinget(that)
      },
      // 去下载
      AppGo(url){
        window.location.href = url
      },
      // 跳转发布页
      fabugo(){
        this.$router.push({path:'/user/release',query:{show:true}})
      },
       handle(show){
          this.box_show = show
      }
  }
}
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
