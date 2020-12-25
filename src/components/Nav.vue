<template lang="">
    <div class="nav">
        <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><router-link to="/">简历查看</router-link></el-menu-item>
  <el-submenu index="2">
    <template slot="title">样例</template>
    <el-menu-item index="2-1"  ><router-link to="/example/originjs">OriginJS</router-link></el-menu-item>
    <el-menu-item index="2-2"><router-link to="/example/li10000">Li 10000 many tags</router-link></el-menu-item>
  </el-submenu>
  <el-menu-item index="3" ><router-link to="/problemcollection">ProblemCollection</router-link></el-menu-item>
</el-menu>
    </div>
</template>
<script>
export default {
    name:'Nav',
    data(){
        return{
            activeIndex: '1',
            activeIndex2: '1'
        }
    },
    methods: {
        handleSelect(key, keyPath) {
        // console.log(key, keyPath);
         key, keyPath 
      }
    },
}
</script>
<style lang="scss">
    .el-menu-item{
        a{
            text-decoration:none;
            display:inline-block;
            height:100%;
        }
    }
</style>