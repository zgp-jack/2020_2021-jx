

<template>
  <div>
    <company />
  </div>
</template>
<script>
  import company from '../../components/company/company.vue'
  import {whetherLogin} from '../../static/utils/utils.js';
  export default{
    components:{
      company
    },
    beforeCreate() {
      whetherLogin(this,'',()=>{
        this.$router.replace('/login')
      })
    }
  }
</script>
