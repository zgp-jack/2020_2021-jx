<template>
  <div>
      <Headers :title="title"/>
       <collHead :arr = 'arr'/>
       <!-- 遮罩 -->
       <div class="point-mask" v-if="mask">
           <div class="btn-img" @click="mask_show()"></div>
       </div>
       <!-- 置顶遮罩 -->
        <div class="Topmask" @click="Topmask" :class="[Topmaskr?'':'Topide']" v-show="Topmaskr">
            <div class="top_notice_content">
              <div class="base">
                  <p>鱼泡提示</p>
                  <p>点击信息右上角 "置顶" 功能，即可将信息状态升级为置顶信息，让您的信息被更多的机友浏览。</p>
              </div>
              <div class="info">
                  <img src="http://statics.zhaogongdi.com/common/set_top_dialog.png">
              </div>
            </div>
        </div>
       <div class="father">
           <div class="item" v-for="(item,i) in detail" :key='i'>
               <div class="staus"></div>
               <div class="title-h3">{{item.title}}</div>
               <div class="intruduce">大家发倒霉可怜大家发打击对方农村考虑啊就看到啦大家发倒霉可怜大家发打击对方农村考虑啊就看到啦大家发倒霉可怜大家发打击对方农村考虑啊就看到啦大家发倒霉可怜大家发打击对方农村考虑啊就看到啦</div>
               <div class="opearting">
                   <span class="modify">修改信息</span>
               </div>
           </div>
       </div>
  </div>
</template>

<script>
import Headers from '../../components/header'
import collHead from '../../components/collection-head'
export default {
  created(){
    if(this.$route.query.show){
      this.Topmaskr = true
    }
  },
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
            Topmaskr:true
        }
    },
    methods:{
        mask_show(){
            this.mask = false
        },
        Topmask(){
          this.Topmaskr =false
        }
    }
}
</script>
<style lang='scss' scoped>
 @import './release.scss'
</style>
