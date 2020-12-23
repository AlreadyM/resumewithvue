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
    <el-menu-item index="2-1">占位1</el-menu-item>
    <el-menu-item index="2-2">占位2</el-menu-item>
  </el-submenu>
  <el-menu-item index="3" ><router-link to="/example">example</router-link></el-menu-item>
</el-menu>
      <router-view></router-view>
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
        console.log(key, keyPath);
      }
    },
}
</script>
<style lang="">
    
</style>