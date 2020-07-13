<template>
  <div class="set_top_page">
     <Header :title="title"/>
     <div class="main">
        <span class="set_area">当前选择置顶范围：</span>
            <div class="choose_scope">
                <span>点击选择置顶范围 ></span>
            </div>
        <span class="set_data">请输入置顶天数：</span>
        <div class="date-content">
          <div class="date">
            <span>置顶天数：</span>
            <input type="text" placeholder="点击选择置顶时间">
          </div>
          <div class="score">
            <span>消耗积分：</span>
            <div>0分</div>
          </div>
        </div>
        <div class="set-btn">确定置顶</div>
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
  </div>
</template>

<script>
  export default{
    data(){
      return{
        title:"机械置顶"
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .main{
    padding-left: 0.4rem;
    padding-top:1.31rem;
    .set_area{font-size: 0.3rem;display: block;}
    .choose_scope{
      width: 3rem;
      height:0.8rem;
      background-color: #ffa926;
      margin: 0.5rem;
      border-radius: 3px;
      line-height:0.8rem;
      text-align: center;
      color: white;
      font-size: 0.3rem;
      margin-left: 0;
      }
      .set_data{font-size: 0.3rem;display: block;margin-top: 0.2rem;margin-bottom: 0.5rem;}
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
</style>
