<template>
  <div>
      <Header :title="title"/>
       <collHead :arr = 'arr' @modeType = 'onServers' ref="collHead"/>
       <!-- 遮罩 -->
       <div class="point-mask" v-if="mask">
           <div class="btn-img" @click="mask_show()"></div>
       </div>
       <!-- 置顶遮罩 -->
        <div class="Topmask" @click="Topmask" :class="[Topmaskr?'':'Topide']">
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


        <div class="father" v-if="list.length">
            <van-list
                v-model="loading"
                :finished="iscomplete || isempty"
                @load="listScroll">
                <div class="item" v-for="(item,index) in list" :key='index' @click.stop="onSkip('view',item)">
                    <div class="title-h3">{{item.title}}</div>
                    <div class="intruduce">{{item.desc}}</div>
                    <div class="opearting clearfix">
                        <span :class="[(item.check==0) || !(item.end==2||item.check==1)?'list_item_editor':'modify']" >修改信息</span>
                        <span v-if="item.check!='0' && item.end!='2'"><span class="list_item_top" @click.stop="goSettingFn($event,item)">{{item.top?'取消置顶':'去置顶'}}</span></span>
                        <span v-if="item.check == 0" class="list_item_reason fr"><img src="../../../assets/img/user_release/warning.png" alt=""> 查看被拒原因</span>
                        <span v-if="item.etime && item.check!=='0' && item.end !='2'" class="list_item_time fr">{{item.etime}} 到期</span>
                    </div>
                    <img class="status" :src="item.check!='2'?status[item.check].url:changeStatus[mode][item.end].url" alt="">
                </div>
            </van-list>
            <EmptyMsg :empty1="iscomplete && !isempty" :empty2="isempty"/>
        </div>
  </div>
</template>

<script>
import collHead from '../../../components/collection-head';
import EmptyMsg from '../../../components/emptyMsg';
import { Toast,List } from 'vant';
export default {
  created(){
    if(this.$route.query.show){
      this.Topmaskr = true
    }
    this.mode = this.$route.params.id;
    let params = this.getParams({})
    this.getData(params)
  },
    components:{
        collHead,
        'van-list':List,
        EmptyMsg
    },
    mounted () {
        this.$refs.collHead.onchangeIndex(this.mode)
    },
    data(){
        return{
            title:'我的发布',
            arr:[{title:'我的求租',id:'1'},{title:'我的出租',id:'2'},{title:'我的出售',id:'3'},{title:'我的求购',id:'4'},],
            mask:false,
            my_scroll:0,
            isshow:true,
            Topmaskr:false,
            list:[],

            //参数
            mode:'',
            page:1,
            page_size:10,

            status:{
                '0':{ "name": "审核失败", "url": require("../../../assets/img/user_release/audit_failed.png") },
                '1':{ "name": "审核中", "url": require("../../../assets/img/user_release/under_review.png") },
                '2':{ "name": "审核通过"}
            },
            changeStatus:{
                '1':{
                    '1':{ "name": "求租中", "url": require('../../../assets/img/user_release/asking_for_rent.png') },
                    '2':{ "name": "已租到", "url": require('../../../assets/img/user_release/rented.png') },
                },
                '2':{
                    '1':{ "name": "出租中", "url": require('../../../assets/img/user_release/leasing.png') },
                    '2':{ "name": "已出租", "url": require('../../../assets/img/user_release/leased.png') },
                },
                '3':{
                    '1':{ "name": "待交易", "url": require('../../../assets/img/user_release/to_be_traded.png') },
                    '2':{ "name": "已完成", "url": require('../../../assets/img/user_release/completed.png') },
                },
                '4':{
                    '1':{ "name": "待交易", "url": require('../../../assets/img/user_release/to_be_traded.png') },
                    '2':{ "name": "已完成", "url": require('../../../assets/img/user_release/completed.png') },
                },
            },
            iscomplete:false,
            isempty:false,//数据是否为空
            loading:false,
        }
    },
    methods:{
        mask_show(){
            this.mask = false
        },
        Topmask(){
          this.Topmaskr =false
        },
        getData(params){
            const that = this;
            let {mode} = that
            if(mode==1 || mode ==2 || mode==3 || mode==4){
                that.$axios.get('/user/create-list',{params}).then(res=>{
                    !that.loading && (that.loading = false);
                    if(res.content){
                        const {page_size,page,list} = that;
                        if(res.content.length < page_size){
                            that.$set(that,'iscomplete',true)
                        }
                        if(!res.content.length && page==1){
                            that.$set(that,'isempty',true)
                        }
                        if(page==1){
                            that.$set(that,'list',res.content);
                        }else{
                            that.$set(that,'list',[...list,...res.content]);
                        }
                    }
                })
            }else{
                Toast({message:'您访问的页面不存在，将自动跳转',duration:500,onClose:()=>{
                    that.$router.replace({path:'/user/release/1'});
                }})
            }
        },
        getParams(updataParams={}){
            const {mode,page,page_size} = this;
            let newParams = {mode,page,page_size,...updataParams}
            return newParams
        },
        onServers(mode){
            this.$router.replace({path:'/user/release/'+mode});
        },
        listScroll(){
            this.page += 1;
            this.loading = true;
            const params = this.getParams({});
            this.getData(params)
        },
        onSkip(key,data){
            const that = this;
            switch(key){
                case 'view' :
                that.$router.push({path:'/view/',query:{info:data.uu_id,mode:that.mode}})
                break;
            }
        },
        //置顶
        goSettingFn(e,item){
          if(item.bool){

          }else{
            //去置顶页面
            this.$router.push({
              path:"/user/set_top_page/set_top",
              query:{
                id:item.uu_id,
                mode:this.mode
              }
            })
          }
        }
    }
}
</script>
<style lang='scss' scoped>
 @import './style.scss'
</style>
