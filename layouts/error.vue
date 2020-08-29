<template>
  <div>
      错误页面
  </div>
</template>

<script>
    export default{
        data() {
            return {

            };
        },
        created(){
            const {path} =  this.$route;
            let list_regexp = /^[\/qiuzu\/|\/qiuzu|\/chuzu\/|\/chuzu|\/ershou\/|\/ershou|\/qiugou\/|\/qiugou]+$/
            if(list_regexp.test(path)){
                
            }
        }
    }
</script>