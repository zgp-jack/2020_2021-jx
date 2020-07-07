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
            <div class="left-img">
              <img src="" alt="">
            </div>
            <div class="info-inner">

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
       console.log(obj)
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
