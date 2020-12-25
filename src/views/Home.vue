<template lang="">
  <div class="home">
  
      <Content/>
  </div>
</template>
<script>
import Content from '@/components/Content.vue'

export default {
  components: {
    Content
  },
  mounted(){
        this.$message({
          message:'欢迎查看雷春华的个人简历',
          duration:10000
        });
  },
  methods:{
    
  }
}
</script>
<style lang="">
  
</style>