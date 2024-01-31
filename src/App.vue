<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/AppHeader.vue';
import Footer from '@/components/AppFooter.vue';
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
#app {
  background-image: url('~@/assets/background.jpg');
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #8f98a1;
}
nav a.router-link-exact-active { 
  color: #8cd4b4;
}
button{
  border-radius: 36px;
  background: #FEE996;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  padding: 10px 16px;
  letter-spacing: 2px;
}
</style>
