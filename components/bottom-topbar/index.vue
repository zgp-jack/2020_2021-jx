<template>
  <div>
      <div class="father" @click="list_hide" :class="[lists_show?'Create':'']">
          <div class="create_content" :class="[lists_show?'Boxon':'']">
              <div class="create_item" v-for="(item,i) in list" :key="i">
                  <div class="create_list_left">
                      <div class="create_item_title">{{item.title}}</div>
                      <div class="create_item_msg">{{item.detail}}</div>
                  </div>
                  <div class="create_ite_right">我找机械</div>
              </div>
          </div>
          <div class="iconfont icon-gou closeCreate"></div>
      </div>
      <!-- 底部呼出 -->
      <div class="bottom-taber" :class="isshow==false?'top-hide':''" @click="list_show"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        my_scroll:0,
        isshow:true,
        list:[{title:'发布求租机械信息',detail:'快速发布求租需求，1000万机械、机手任你选'},{title:'发布出租机械信息',detail:'完整填写机械出租信息，无限好活接不完'},{title:'发布转让机械信息',detail:'全网最大二手机械信息平台机械转手只需分分钟'},{title:'发布求购机械信息',detail:'50万条转让信息，总有一条适合你'},],
        lists_show:false
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
        list_show(){
          this.lists_show = true
        },
        list_hide(){
          this.lists_show = false
        }
  }
}
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
