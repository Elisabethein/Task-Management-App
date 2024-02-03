<template>
  <div id="app" :style="{ backgroundImage: getBackgroundImage() }">
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
  methods: {
    getBackgroundImage() {
      return this.$store.state.isDarkMode ? `url(${require('@/assets/dark-background.jpg')})` : `url(${require('@/assets/background.jpg')})`;
    },
  },
};
</script>

<style>
#app {
  background-size: cover;  /* Ensures the background image covers the entire container */
  background-position: center;  /* Centers the background image */
  background-repeat: no-repeat;  /* Prevents the background image from repeating */
  font-family: didot, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

button{
  border-radius: 36px;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  padding: 10px 16px;
  letter-spacing: 2px;
}
</style>
