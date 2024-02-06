import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const storedUserId = localStorage.getItem('userId');
const storedMode = localStorage.getItem('mode');

// Set user ID in Vuex store
if (storedUserId) {
  store.dispatch('loginUser', storedUserId);
}

if (storedMode) {
  store.commit('setIsDarkMode', storedMode === 'dark'); // Commit directly to mutation
}

createApp(App).use(store).use(router).mount('#app')
