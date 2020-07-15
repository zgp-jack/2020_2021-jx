<!-- 图片上传 -->
<template>
    <van-uploader :after-read="beforeRead"/>
</template>

<script>
import { Uploader,Toast  } from "vant";
export default {
  data() {
    return {
        fileList:[]
    };
  },
  components: {
    "van-uploader": Uploader
  },
  methods:{
      beforeRead(file) {
        let fd = new FormData();
　　     fd.append('pic', file.file);
        let config = {
            headers:{'Content-Type':'multipart/form-data'},
        };
        this.$axios.post('/upload',fd,config).then(res=>{
            
        })
      },
  }
};
</script>


<style lang='scss' scoped>
</style>
