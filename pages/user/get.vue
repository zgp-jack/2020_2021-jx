<template>
  <div>
    <Sign :boxon = 'box_on' :boxshow = 'box_show' @handle = 'handle'/>
      <Headers :title="title"/>
      <div class="father">
          <div class="head">
              <img src="http://statics.zhaogongdi.com/xcx/get_coin_yupao.png">
          </div>
          <div class="rule_list">
              <div class="rule_one">
                  <div class="title">
                      鱼泡币获取规则
                  </div>
                  <div class="content">
                    <div class="item" v-for="(item,i) in list" :key='i'>
                        <div class="info">
                            <p v-text="item.title"></p>
                            <p>{{item.detail}}</p>
                        </div>
                        <div class="op" v-text="item.btn_text" @click="isGo(item.src,i)"></div>
                    </div>
                  </div>
              </div>
              <div class="rule_two">
                  <div class="title">
                      鱼泡币消耗规则
                  </div>
                  <div class="content">
                    <div class="item">
                        <div class="info">
                            <p>查看信息 -3 鱼泡币</p>
                            <p>(获取信息联系方式)</p>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Headers from '../../components/header'
import Sign from '../../components/Sign'
export default {
    beforeMount(){

    },
    components:{
        Headers,
        Sign
    },
    data(){
        return{
            list:[
                {title:'玩游戏，赚鱼泡币',detail:'每天玩15秒小游戏，可得3-300分',btn_text:'去看看',src:'/luck'},
                {title:'邀请好友成功 + 5 鱼泡币',detail:'好友注册送鱼泡币,  不限次数',btn_text:'去邀请',src:'/user/invitation'},
                 {title:'充值',detail:'充值付钱购买鱼泡币',btn_text:'去充值',src:'/coin/recharge',src:'/coin/recharge'},
                {title:'发布求租 + 1鱼泡币',detail:'通过审核后赠送, 5次/月',btn_text:'去发布',src:'/coin/recharge',src:"../../common/create?mode=1"},
                {title:'发布机械 + 1 鱼泡币',detail:'通过审核后赠送, 5次/月',btn_text:'去发布',src:'/coin/recharge',src:"../../common/create?mode=2"},
                {title:'发布出售 + 1 鱼泡币',detail:'通过审核后赠送, 5次/月',btn_text:'去发布',src:'/coin/recharge',src:"../../common/create?mode=3"},
                {title:'发布求购 + 1 鱼泡币',detail:'通过审核后赠送, 5次/月',btn_text:'去发布',src:'/coin/recharge',src:"../../common/create?mode=4"},
            ],
            title:'获取鱼泡币',
            box_on:true,
            box_show:false
        }
    },
    methods:{
        isGo(src,index){
          this.$router.push(src)

        },
        handle(show){
          this.box_show = show
        }
    }
}
</script>

<style lang='scss' scoped>
@import './get.scss';
</style>
