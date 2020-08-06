<template>
  <div>
      <Header :title="title" @getParentFn="showRelease" ensure_text="发布"/>
      <div style="width: 7.5rem;">
        <collHead :arr = 'arr' @modeType = 'onServers' ref="collHead"/>
      </div>
       <!-- 遮罩 -->
       <div class="point-mask" v-if="(mode ==1 && mask_tencent) || (mode == 4 && mask_want)" :style="{'background-image':mode == 1?'url('+require('../../../assets/img/my-fabu/qiuzu_point.png'):'url('+require('../../../assets/img/my-fabu/qiugou_point.png')}">
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
        <div class="father">
          <van-pull-refresh v-model="loading" @refresh="onrefresh">
            <van-list
                v-model="loading"
                :finished="iscomplete"
                @load="listScroll">
                <div class="item" v-for="(item,index) in list" :key='index' @click.stop="onSkip('view',item)">
                    <div class="title-h3">{{item.title}}</div>
                    <div class="intruduce">{{item.desc}}</div>
                    <div class="opearting clearfix">
                        <span @click.stop="goModifyPage(item)" :class="[(item.check==1) ? 'modify':'list_item_editor']" >修改信息</span>
                        <span class="list_item_top" @click.stop="goSettingFn($event,item,index)" v-if="item.check!='0' && item.end!='2'">{{item.top?'取消置顶':!item.top_over_due?'继续置顶':'去置顶'}}</span>
                        <span @click.stop="refuse(item)" v-if="item.check == 0" class="list_item_reason fr"><img src="../../../assets/img/user_release/warning.png" alt=""> 查看被拒原因</span>
                        <span v-if="item.etime && item.check!=='0' && item.end !='2' && item.top" class="list_item_time fr">{{item.etime}} 到期</span>
                    </div>
                    <img @click.stop="changeSateFn(item,index)" class="status" :src="item.check!='2'?status[item.check].url:changeStatus[mode][item.end].url" alt="">
                </div>
            </van-list>
            <EmptyMsg :empty1="iscomplete && !isempty" :empty2="isempty"/>
          </van-pull-refresh>
        </div>
         <BottomTop  ref="child" :hiddenAll="true" />
  </div>
</template>

<script>
import collHead from '../../../components/collection-head';
import EmptyMsg from '../../../components/emptyMsg';
import {formatDate,setNovicePoint,getNovicePoint,whetherLogin} from '../../../static/utils/utils.js';
import { Toast,List,Dialog,PullRefresh } from 'vant';
import BottomTop from '../../../components/bottom-topbar/index.vue';


export default {
  watch: {
    $route (to, from) {
      if(to.fullPath.includes('/user/release')){
        if(to.query.show){
          this.Topmaskr = true
        }
        this.mode = to.query.mode;
        this.int()
        this.list = [];
        this.page = 1;
        this.iscomplete = false,
        this.isempty = false,//数据是否为空
        this.getData()
      }
    }
  },
  beforeMount(){
    if(this.$route.query.show){
      this.Topmaskr = true
    }
    this.mode = this.$route.query.mode;
    this.int()
    this.getData()
  },
    components:{
        collHead,
        'van-list':List,
        'van-pull-refresh':PullRefresh,
        EmptyMsg,
        [Dialog.Component.name]: Dialog.Component,
        BottomTop
    },
    mounted () {
        this.$refs.collHead.onchangeIndex(this.mode)
    },
    data(){
        return{
            title:'我的发布',
            arr:[{title:'我的求租',id:'1'},{title:'我的出租',id:'2'},{title:'我的出售',id:'3'},{title:'我的求购',id:'4'},],
            mask_want:false,
            mask_tencent:false,
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
      //新手指引弹窗
        mask_show(){
          let guide = getNovicePoint();
          if(this.mode == 1){
             guide.lease = false;
             this.mask_tencent = false;
          }else{
             guide.userBuy = false;
              this.mask_want = false;
          }
           setNovicePoint(guide)
        },
        Topmask(){
        this.Topmaskr =false
        },
        getData(){
            const that = this;
            const {mode,page,page_size} = that;
            const params = {mode,page,page_size,globalLoading:false};
            that.loading = true;
            if(mode==1 || mode ==2 || mode==3 || mode==4){
                that.$axios.get('/user/create-list',{params}).then(res=>{
                    that.loading && (that.loading = false);
                    if(res.code == 200){
                      if(that.page == 1){
                        if(res.content.length && res.content.length<that.page_size){
                          that.iscomplete = true;
                          that.isempty = false;
                        }else if(!res.content.length){
                          that.isempty = true;
                        }else{
                          that.iscomplete = false;
                          that.isempty = false;
                        }
                      }else{
                        if(res.content.length<that.page_size){
                          that.iscomplete = true;
                          that.isempty = false;
                        }else{
                          that.iscomplete = false;
                          that.isempty = false;
                        }
                      }
                      const list =  that.page == 1?[...res.content]:that.list.push(...res.content);
                      if(that.page == 1) that.list = [...list];
                      
                  }else{
                    that.isempty = true;
                  }
                })
            }
            else{
                that.$router.replace({path:'/user/release/1'});
            }
        },
        int(){
          if((this.mode == 1 || this.mode == 4)){
            let guide = getNovicePoint();
            this.mask_want = guide.userBuy;
            this.mask_tencent = guide.lease;
          }
        },
        onrefresh(){
          this.page = 1;
          this.getData()
        },
        onServers(mode){
            this.$router.replace({path:'/user/release/',query:{mode}});
        },
        listScroll(){
            this.page += 1;
            this.loading = true;
            this.getData()

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
        goSettingFn(e,item,index){
          let that = this;
          if(item.top){
            //取消置顶
            Dialog.confirm({
              title: '提示',
              message: '取消置顶，该消息将失去置顶效果，点击继续置顶可恢复置顶',
              confirmButtonColor:"#ffa926"
            }).then(() => {
                let params = {
                  info: item.uu_id,
                  type: that.mode
                }
                that.$axios.get('user/cancel-top',{params}).then(res=>{
                  that.findItem(res,"top",false,item,index)
                })
              })
          }else{
            //去置顶页面
            let params = {info: item.uu_id,mode: that.mode};
            that.$axios.get('/user/set-top',{params}).then(res=>{
                if(res.code == 8639){
                this.$router.push({
                  path:"/user/set_top_page/set_top",
                  query:{
                    id:item.uu_id,
                    mode:this.mode
                  }
                })
                return
              }
              let etime = res.top.etime*1000;
              let time = formatDate(etime,'yyyy-MM-dd h:m')
              that.findItem(res,"top",true,item,index);
              that.findItem(res,"etime",time,item,index);
            })

          }
        },
        //找到要改变状态的元素u
        findItem(res,attr,value,item,index){
          let list = [...this.list];
          if(res.code == 200){
            list[index][attr]=value;
            this.$set(this,'list',list)
          }
        },
        //改变状态
        changeSateFn(item,index){
          let str = "已租到";
          let that = this;
          if(item.check == 0 || item.check == 1){
            //审核中或审核失败的数据
            Toast("审核通过后才能修改");
            return false;
          }else if(item.check == 2 && item.end == 1){
            //等待完成的数据
            if(this.mode == 1) str = '已租到'
            else if(this.mode == 2) str = "已出租"
            else str = "已完成"
             Dialog.confirm({
               title: '提示',
               message: '你的信息状态将变更为'+str+'，列表不在展示你发布的信息',
               confirmButtonColor:"#ffa926"
             }).then(() => {
                //进行ajax请求，改变状态
                let params = {
                  mode: that.mode,
                  info: item.uu_id,
                  type: 0
                }
                that.$axios.get('/user/change-status',{params}).then(res=>{
                  that.findItem(res,"end",2,item,index)
                })
             }).catch(()=>{})
          }else if(item.check == 2 && item.end == 2){
            //该判断 已经完成的数据
            Dialog.alert({
              title: '提示',
              message: '已完成信息不支持切换状态，点击修改信息可重新提交发布',
              confirmButtonColor:"#ffa926"
            })
          }
        },
        //修改提示
        goModifyPage(item){
          if(item.check == 1) {
            if(item.check == 1 && item.end == 1){
              Dialog.alert({
                title: '温馨提示',
                message: "审核中的信息不能修改",
                confirmButtonColor:"#ffa926"
              })
            }
            else if(item.check == 2 && item.end == 2){
              Dialog.alert({
                title: '温馨提示',
                message: "已经完成的信息无法修改哦",
                confirmButtonColor:"#ffa926"
              })
            }
            return false
          };
          this.$router.push({
            path:'/common/update?mode='+this.mode,
            query:{
              id:item.uu_id,
              // type:this.mode
            }
          })

        },
        //拒绝原因
        refuse(item){
          console.log(item)
          Dialog.alert({
            title:"提示",
            message:item.fail_reason,
            confirmButtonColor:"#ffa926"
          })
        },
        showRelease(){
          this.$refs.child.list_show();
        }
    }
}
</script>
<style lang='scss' scoped>
 @import './style.scss'
</style>
