<template>
  <div class="set_top_page">
     <Header :title="title" ref="header"/>
     <div class="main" v-show="show_set_top">
        <span class="set_area">当前选择置顶范围：</span>
            <div class="choose_scope" >
                <div class="item" v-for="(item,index) in sure_data" @click="cancelArea(item,index)" :key="index">{{item.name}}<b class="iconfont icon-cuo"></b></div>

                <span v-if="(sure_data.length==0)" @click="chooseAreaFn">点击选择置顶范围 ></span>
                <span v-else style="width: 2rem;" @click="chooseAreaFn">添加更多</span>
            </div>
        <span class="set_data">请选择置顶天数：</span>
        <div class="date-content">
          <div class="date"  @click="chooseTime">
            <span>置顶天数：</span>
            <input type="text" disabled="disabled" :value="day" placeholder="点击选择置顶时间">
          </div>
          <div class="score">
            <span>消耗积分：</span>
            <div>{{integral}}分</div>
          </div>
        </div>
        <div class="set-btn" @click="sureSetTop">确定置顶</div>
        <div class="set_rule">
          <div></div>
          <span>置地规则</span>
          <div></div>
        </div>
        <div class="rule-detail">
          <ul class="rule-detail-public">
            <p class="province_setTop"></p>
              <li>
                <span>
                  <b></b>
                  1省份置顶1天，
                </span>
                <span>消耗20鱼泡币；</span>
              </li>
              <li>
                <span>
                  <b></b>
                  1省份置顶7天打9折，
                </span>
                <span>消耗126鱼泡币；</span>
              </li>
              <li>
                <span>
                  <b></b>
                  1省份置顶15天打8折，
                </span>
                <span>消耗240鱼泡币；</span>
              </li>
              <li>
                <span>
                  <b></b>
                  1省份置顶30天打7折，
                </span>
                <span>消耗420鱼泡币；</span>
              </li>
              <li>
                <span>
                  <b></b>
                  计算公式
                </span>
                <strong>20*省份数*天数*折扣=置顶消耗鱼泡币</strong>
              </li>
          </ul>
           <ul class="rule-detail-public">
             <p class="contry_setTop"></p>
              <li>
                <span>
                  <b></b>
                  全国置顶1天打9折，
                </span>
               <span>消耗540鱼泡币；</span>
              </li>
              <li>
                <span>
                  <b></b>
                  全国置顶7天打8折，
                </span>
               <span>消耗3360鱼泡币；</span>
              </li>
              <li>
                <span>
                  <b></b>
                  全国置顶15天打7折，
                </span>
               <span>消耗6300鱼泡币；</span>
              </li>
              <li>
                <span>
                  <b></b>
                  全国置顶30天打6折，
                </span>
               <span>消耗10800鱼泡币；</span>
              </li>
              <li>
                <span>
                  <b></b>
                  计算公式
                </span>
                <strong>600*天数*折扣=置顶消耗鱼泡币</strong>
              </li>
           </ul>
        </div>
     </div>
      <div class="back" v-show="show_back_btn" @click="backSetTop"></div>
     <div  class="chooseAreaPage" v-show="show_area_choose">
       <span class="title">置顶区域</span>
       <ul class="content">
          <li @click="selectedArea(item)" v-for="(item,index) in area" :key="index" :class="[item.addColor?'active':'']" :pid="item.pid" :data-id="item.id" >{{item.name}}</li>
       </ul>
       <div class="sure-btn">
         <p @click="sureChoose">确定</p>
       </div>
     </div>
     <div class="data_alert" v-show="show_data_alert">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
     </div>

  </div>
</template>

<script>
  import { Toast,DatetimePicker,Picker   } from 'vant';

  export default{
    data(){
      return{
        title:"机械置顶",
        area:[],
        selected_arr:[],
        show_area_choose:false,
        show_set_top:true,
        show_back_btn:false,
        sure_data:[],
        columns: [],
        show_data_alert:false,
        day:'',
        integral:0
      }
    },
    components:{
      "van-picker":Picker
    },
    created() {
      for(var i = 1; i <= 30;i++){
        this.columns.push(i+"天")
      }
       let arr = window.$nuxt.$store.state.area;
       let newArr = arr.map((item)=>{
        item.addColor=false;
         return item
      })
      this.$set(this,'area',newArr);
    },
    methods:{
       onConfirm(value, index) {
         this.day = parseInt(value);
          this.show_data_alert=false;
        },
        onCancel() {
           this.show_data_alert=false;
        },
      //选择城市
      chooseAreaFn(){
        this.show_set_top = false;
        this.show_area_choose = true;
        this.show_back_btn = true;
      },

      //选择时间
      chooseTime(){
        this.show_data_alert = true;
      },

      //点击选中城市
      selectedArea(item){
        let that = this;
        let arr = [...this.area];
        let selectedArr = [...this.selected_arr];
        //选中的对象
        let index = selectedArr.indexOf(item);
        if(index != -1){
          //数组里有相同的数据把它删除
          selectedArr.splice(index,1)
        }else{
            //全国的时候把数组清空，在把全国push到数组
            if(item.id == 1){
              selectedArr = [];
              selectedArr.push(item)
            }else{
              //不是全国的时候，看数组里面是否有全国，有全国就把全国删除，在添加数据
              for(var i = 0; i < selectedArr.length;i++){
                if(selectedArr[i].id == 1){
                  selectedArr.shift();
                  break;
                }
              }
              selectedArr.push(item)
              //数组里是否有五条数据
              if(selectedArr.length <= 5){
                // selectedArr.unshift();
              }else{
                Toast('最多可选择5个省份置顶');
                return false
              }
            }
        }
        this.selected_arr = [...selectedArr]
        //改变颜色
        arr.find((itemSon,index)=>{
           if(item.id == itemSon.id){
             if(item.id==1){
               // 如果点击了全国，那么其他的所有颜色都清除
                arr = arr.map((item)=>{
                  item.addColor = false;
                  return item
                })
                arr[index].addColor = !arr[index].addColor;
                that.$set(that,'area',arr);
             }else{
               // 没有点击全国，把全国的颜色给清除，
               arr[0].addColor = false;
               arr[index].addColor = !arr[index].addColor;
               that.$set(that,'area',arr);
             }
             return false
           }
         })
      },
      //确定选中的城市
      sureChoose(){
        this.show_set_top = true;
        this.show_area_choose = false;
        this.show_back_btn = false;
        //确定的数组数据
        this.sure_data = [...this.selected_arr];
      },
      //返回置顶页面
      backSetTop(){
        this.show_set_top = true;
        this.show_area_choose = false;
        this.show_back_btn = false;
      },
      //取消选择
      cancelArea(item,index){
        //
        let arr = [...this.sure_data];
        let area = [...this.area];
        arr.splice(index,1)
        this.sure_data = [...arr];
        this.selected_arr = [...arr];
        //删除置顶页面的数据
        for(var i = 0; i < area.length;i++){
          if(area[i].id == item.id){
            area[i].addColor = false;
            break
          }
        }
        this.area = [...area]
      },
      countIntegral(day){
        let arr = [...this.sure_data];
        let num = 0;
         if(arr.length != 0 && arr[0].id == 1){
            //全国置顶
            if(day < 7){
                num = 600*day*0.9
            }else if(day < 15){
                num = 600*day*0.8
            }else if(day < 30){
                num = 600*day*0.7
            }else if(day >= 30){
                num = 600*day*0.6
            }
         }else{
           //全省置顶
           let len = this.sure_data.length
           if(day < 7){
               num = 20*len*day;
           }else if(day < 15){
               num = 20*len*day*0.9;
           }else if(day < 30){
               num = 20*len*day*0.8;
           }else if(day >= 30){
               num = 20*len*day*0.7;
           }
         }
          this.integral = num
      },
      //确定置顶
      sureSetTop(){
        let that = this;
        if(this.sure_data.length == 0){
          Toast("请选择置顶区域");
          return false
        }else if(this.day == ''){
          Toast("请选择置顶时间");
          return false
        }
        let areaId = '';
        for(var i = 0; i<this.sure_data.length;i++){
          areaId += this.sure_data[i].id+",";
        }
        let data = {
          type:this.$route.query.mode,
          uu_id:this.$route.query.id,
          dayNum:this.day,
          area:areaId.slice(0,areaId.length-1)
        }
        console.log(data)
        this.$axios.post('/user/new-set-top-do',{...data}).then(res=>{
          if(res.code == 200){
           Toast.success('置顶成功');
           setTimeout(()=>{
             that.$router.go(-1);
           },2000)
          }else if(res.code == 303){
            Toast.fail(res.msg)
          }else{
            Toast(res.msg)
          }
        })
      }
    },
    watch:{
      // 监听天数发生变化
      day(day){
        //根据选择的天数和城市计算出需要的积分
        this.countIntegral(day);
      },
      sure_data(){
        this.countIntegral(this.day);
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
 .data_alert{
   position: fixed;
   width: 7.5rem;
   height: 100vh;
   background-color: rgba(0,0,0,.5);
    left: 0;
    top: 0;
    z-index: 50;
    .van-picker{
      position: absolute;
      width: 7.5rem;
      bottom: 0;
    }
 }

  .main{

    padding-left: 0.4rem;
    padding-top:1.31rem;
    .set_area{font-size: 0.3rem;display: block;margin-bottom: 0.5rem;}
    .choose_scope{
        font-size: 0.3rem;
        span{
          width: 3rem;
          height:0.8rem;
          background-color: #ffa926;
          border-radius: 3px;
          line-height:0.8rem;
          text-align: center;
          color: white;
          float: left;
          margin-left: 0;
        }
        .item{
           border-radius: 3px;
          margin-right: 0.3rem;
          float: left;
          width: 2rem;
          height: 0.8rem;
          color: #444;
          border: 1px solid #aaa;
          text-align: center;
          line-height: 0.8rem;
          margin-bottom: 0.2rem;
          position: relative;
          b{position: absolute;right: 0;top: -0.28rem;color: #aaa;}
         }
      }
      .set_data{font-size: 0.3rem;display: block;margin-top: 0.2rem;margin-bottom: 0.5rem;clear: both;padding-top: 0.5rem;}
     .date-content{
       margin-bottom: 0.5rem;
       height: 1.8rem;
       padding-left: 0.1rem;
       box-sizing: border-box;
       width: 6.7rem;
       background-color: #fff;
       .date,.score{
         height: 0.9rem;
         line-height: 0.9rem;
         border-bottom: 1px solid #ccc;
         box-sizing: border-box;
         font-size: 0.3rem;
       }
        .score{
          border: 0;
          div{display: inline-block;color: #ffa926;}
        }
     }
     .set-btn{
       height: 0.9rem;
       width: 5rem;
       margin: 0 auto;
       border-radius: 0.8rem;
       background-color: #ffa926;
       color: #fff;
       font-size: 0.4rem;
       line-height: 0.9rem;
       text-align: center;
     }
     .set_rule{
       width: 2.8rem;
       height: 0.4rem;
       margin: 0.4rem auto;
       color: #333;
       span{
         line-height: 0.25rem;
         float: left;
         font-size: 0.3rem;
       }
       div{
         margin: 0 0.3rem;
         float: left;
         width: 0.2rem;
         height: 0.25rem;
         background-image: url(../../../assets/img/other/modification.png);
         background-size: 100% 100%;
       }
     }
     .rule-detail{
        margin-bottom: 0.3rem;
       width: 6.6rem;
       height: 10rem;
       background-color: #fff;
       border-radius: 0.2rem;
       .rule-detail-public{
         position: relative;
         height: 4.8rem;
         padding-left: 0.2rem;
         padding-top: 1.2rem;
         li{
           height: 0.6rem;
           font-size: 0.25rem;
           line-height: 0.6rem;
           b{
             width: 0.15rem;
             height: 0.15rem;
             background-color: #ffa926;
             border-radius: 50%;
             margin-left: 0.05rem;
             display: inline-block;
           }
         }
         span{
           display: inline-block;
           &:nth-of-type(1){
             width: 57%;
           }
           &:nth-of-type(2){
             width: 40%;
           }
         }
         strong{
           display: block;
           color: #ffa926;
           padding-left: 0.25rem;
         }
         p{
           left: -0.15rem;
           top: 0.5rem;
           position: absolute;
           width: 2.18rem;
           height: 0.53rem;
           background-size: 100% 100%;
           background-image: url(../../../assets/img/other/province-setTop.png);
         }
         .contry_setTop{

           background-image: url(../../../assets/img/other/county-setTop.png);
         }
       }

     }
  }
  .back{width: 1.01rem;height: 1.01rem;background-color: red;position: fixed;z-index: 1000;top: 0;opacity: 0;}
  .chooseAreaPage{
    position: fixed;
    left: 50%;
    margin-left: -3.75rem;
    top: 0;
    height: 100vh;
    padding: 0rem 0.2rem;
    padding-top: 1.01rem;
    width: 7.5rem;
    .title{font-size: 0.45rem;display: block;margin: 0.4rem;margin-left: 0;}

    .content{
      width: 100%;
      overflow-y: auto;
      height: calc(100vh - 5rem);
      li{
        float: left;
        margin-right: 0.4rem;
        width: 2rem;
        height: 0.8rem;
        background-color: #fff;
        font-size: 0.4rem;
        color: #6F6F6F;
        line-height: 0.8rem;
        text-align: center;
        margin-bottom: 0.3rem;
        &:nth-of-type(3n){
          margin-right: 0;
        }
      }
      .active{background-color: #ffa926;color: #fff;}
    }
    .sure-btn{width: 7rem;height: 2rem;position: absolute;bottom: 0;box-sizing: border-box;}
    .sure-btn p{width: 5rem;height: 0.9rem;border-radius: 0.5rem;background-color: #ffa926;text-align: center;font-size: 0.4rem;line-height: 0.9rem;color: #fff;margin: 0 auto;}
   }
</style>
