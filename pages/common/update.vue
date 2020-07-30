<template>
    <Release :editorData="editorData" v-if="show && clas.length && userinfo!=='{}'"/>
</template>

<script>
import Release from '../../components/release'
export default {
  components:{
    Release
  },
    data(){
      return{
        mode:null,
        info:null,
        editorData:null,
        show:false
      }
    },
    beforeMount(){
        this.mode = this.$route.query.mode;
        this.info = this.$route.query.id;
        this.getData()
    },
    methods:{
        getData(){
            const {mode,info} = this;
            this.$axios.get('/user/new-update-get',{params:{mode,info}}).then(res=>{
                if(res.code==200){
                    this.editorData = {...res.content};
                    this.show = true;
                }
            })
        },
    },
    computed:{
        userinfo(){
            return JSON.stringify(this.$nuxt.$store.state.userinfo);
        },
        clas(){
            return this.$nuxt.$store.state.clas
        }
    }
}
</script>

<style lang='scss' scoped>
</style>
