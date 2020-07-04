<template>
  <div>
      <Headers :title="title"/>
       <collHead :arr = 'arr'/>
       <!-- 遮罩 -->
       <div class="point-mask" v-if="mask">
           <div class="btn-img" @click="mask_show()"></div>
       </div>
       <div class="father" @scroll="handleScroll">
           <div class="item" v-for="(item,i) in detail" :key='i'>
               <div class="staus"></div>
               <div class="title-h3">{{item.title}}</div>
               <div class="intruduce">大家发倒霉可怜大家发打击对方农村考虑啊就看到啦大家发倒霉可怜大家发打击对方农村考虑啊就看到啦大家发倒霉可怜大家发打击对方农村考虑啊就看到啦大家发倒霉可怜大家发打击对方农村考虑啊就看到啦</div>
               <div class="opearting">
                   <span class="modify">修改信息</span>
               </div>
           </div>
       </div>
       <div  class="cart" v-show="isshow">1</div>
  </div>
</template>

<script>
import Headers from '../../components/header'
import collHead from '../../components/collection-head'
export default {
    components:{
        Headers,
        collHead
    },
   mounted () {

      },
    data(){
        return{
            title:'我的发布',
            arr:[{title:'我的求租'},{title:'我的出租'},{title:'我的出售'},{title:'我的求购'},],
            mask:false,
            detail:[{title:'购回'},{title:'购回'},{title:'购回'},{title:'购回'},{title:'购回'},{title:'购回'},],
            my_scroll:0,
            isshow:true,
        }
    },
    methods:{
        mask_show(){
            this.mask = false
        },
         handleScroll(e){
            const {scrollTop} = e.currentTarget;
            let {my_scroll,isshow} = this;
            // 页面滚动距顶部距离
            if(scrollTop>my_scroll && isshow){
                this.isshow = false;
            }else if(scrollTop<my_scroll && !isshow){
                this.isshow = true;
            }
            this.my_scroll=scrollTop
        },
    }
}
</script>
<style lang='scss' scoped>
 @import './release.scss'
</style>
