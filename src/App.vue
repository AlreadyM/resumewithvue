<template>
  <div id="app" class="container">
      <Nav></Nav>
      <Footer/>
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
  components: {
    Nav,Footer
  }
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
