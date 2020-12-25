<template>
  <div id="app" class="container">
    <el-container>
      <el-header >
        <Nav></Nav>
      </el-header>
      <el-main v-bind:style="{height:contentHeight + 'px'}" >
        <router-view ></router-view>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue'
import ElementUI from 'element-ui';
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'


Vue.use(ElementUI,$);
export default {
  data(){
    return {
      contentHeight:400
    }
  },
  components: {
    Nav,Footer
  },
  mounted() {
    console.log('1')
    
    this.calcContentHeight()
  },
  methods: {
    calcContentHeight: function (){
      var wH = window.innerHeight
      this.contentHeight = wH - 61 - 70
      console.log(wH)
    }
  },
}

console.log($('body'))
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
