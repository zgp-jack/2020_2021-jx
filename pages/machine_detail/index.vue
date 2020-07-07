<template>
  <div id="detail">
    <Header title="机械出租详情" />
    <div class="detail_main">
       <div class="notice">
         <verticalBanner type="1" />
       </div>
       <div class="content">
          <div class="title-time">
            <p class="title">西藏那个哈皮娃儿</p>
            <p class="time">发布时间：10121540</p>
          </div>
          <div class="user-info">
            <div class="left-img"></div>
            <div class="right-inner">
              <p class="name-pay">
                <span class="userName">张大炮</span>
                <span class="pay"><b></b>协商付款</span>
              </p>
              <div class="telphone">
                <p class="phone-num">17384374513</p>
                <div class="opeart">
                  <p class="report">投诉</p>
                  <p class="show-complete-tel">查看完整电话</p>
                  <p class="complete-state">已租到</p>
                </div>
              </div>
              <div class="tips">联系我时，请说明是在<b style="color:red">“鱼泡机械”</b>上看到的</div>
            </div>
          </div>
          <div class="machine-type">
            <p class="title">机械类型</p>
            <div class="type-list">
              <b>飞机</b>
              <b>大炮</b>
            </div>
          </div>
       </div>

    </div>

  </div>

</template>

<script>
  import head from "../../components/header/index.vue";
  import vertical_banner from "../../components/vertical_banner/vertical_banner.vue";
  export default{
    comments:{
      Header:head,
      verticalBanner:vertical_banner
    },
    created(){

      //参数不完整跳转首页
      if(!(this.$route.query.id && this.$route.query.type)){
        window.location.replace('/dist/home')
      }else{
       let obj = {...this.$route.query}
      }
    },
    mounted() {
       console.log(head,vertical_banner)
    }
  }
</script>

<style lang='scss' scoped="scoped">
@import "./index.scss"
</style>
