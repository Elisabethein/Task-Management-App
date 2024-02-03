<template>
  <header :class="{ 'header': true, 'dark-theme': isDarkMode }">
    <div class="nav">
      <router-link to="/" @click="handleNavClick('/')"
                    :class="{ 'nav-button': true, 'pressed': isNavButtonPressed('/') }">Home
      </router-link>
      <router-link to="/contacts" @click="handleNavClick('/contacts')"
                    :class="{ 'nav-button': true, 'pressed': isNavButtonPressed('/contacts') }">Contacts
      </router-link>
      <router-link to="/login" @click="logout"
                    :class="{ 'nav-button': true, 'pressed': isNavButtonPressed('/login') }">Logout
      </router-link>
      <input type="checkbox" id="darkmode-toggle" @change="toggleTheme"/>
      <label for="darkmode-toggle">
        <img v-if="!isDarkMode" src="@/assets/moon.png" alt="Dark Mode Toggle" class="moon-pic">
        <img v-else src="@/assets/sun.png" alt="Dark Mode Toggle" class="sun-pic">
      </label>
    </div>
  </header>
</template>
  
  <script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        pressedNavButtons: [],
        isLogoutPressed: false,
      };
    },
    computed: {
    ...mapState(['isDarkMode']),
    },
    methods: {
      ...mapActions(['toggleDarkMode']),
      handleNavClick(route) {
          // toggle the pressed state for the clicked route
          const index = this.pressedNavButtons.indexOf(route);
          if (index !== -1) {
            this.pressedNavButtons.splice(index, 1);
          } else {
            this.pressedNavButtons.push(route);
          }
          setTimeout(() => {
            // timeout to reset the pressed state after a short delay
            this.resetNavButtonState();
          }, 100);
      },
      isNavButtonPressed(route) {
        return this.pressedNavButtons.includes(route);
      },
      resetNavButtonState() {
        this.pressedNavButtons = [];
      },
      async logout() {
      this.isLogoutPressed = true;
      setTimeout(() => {
        this.isLogoutPressed = false;
      }, 100);
      try {
        const response = await fetch('http://localhost:3000/auth/logout', {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies) in the request
        });

        if (response.ok) {
          console.log('Logout successful');
          // Clear the JWT cookie on the client side
          document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';

          // Redirect the user to the login page or any other desired page
          this.$router.push('/login');
        } else {
          // Handle error if the server-side logout fails
          console.error('Failed to logout');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
    toggleTheme() {
      this.$store.dispatch('toggleDarkMode');
      localStorage.setItem('mode', this.$store.state.isDarkMode ? 'dark' : 'light');
    },
    },
  };
  </script>
  <style scoped>
  .header {
    position: relative;
    padding: 0.5em;
    border: 1px solid #ae5d6c;
    background-color: #FADDE1;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.75);
    width: 80%;
    border-radius: 5px;
    margin: 0.5% 10%;
    opacity: 0.95;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
  }
  
  .nav {
    display: flex;
  }
  
  .nav-button {
    padding: 10px 15px;
    text-align: center;
    display: block;
    color: #ae5d6c;
    font-size: 0.99em;
    text-decoration: none;
    border: none;
    background: none;
    cursor: pointer;
  }
  
  .nav-button:hover {
    background-color: #ae5d6c;
    color: white;
    border-radius: 25px;
  }
  
  .nav-button.pressed {
    transform: scale(0.9);
  }

  .dark-theme {
    border: 1px solid #07010b;
    background-color: #07010b;
  }
  
  .dark-theme .nav-button {
    color: #eee2f8;
  }
  
  .dark-theme .nav-button:hover {
    background-color: #eee2f8;
    color: #07010b;
  }

  label {
    margin-top: 4px;
    width:60px;
    height: 30px;
    display: block;
    background: #ebebeb;
    border-radius: 200px;
    box-shadow: inset 0px 5px 15px rgba(0,0,0,0.4), inset 0px -5px 15px #3e0748;
    cursor: pointer;
  }

  label:after { 
    content:"";
    top:10px;
    left:10px;
    border-radius: 180px;
    box-shadow: inset 0px 5px 15px #ae5d6c, inset 0px -5px 15px #ae5d6c;
}
    input {
    width: 0;
    height: 0;
    visibility: hidden;
}

input:checked + label {
  background: #f0d0d5;
}
input:checked label:after {
  transform: translateX(-100%);
  background: linear-gradient (180deg, #f5f0f0, #ece3e3);
}
label, label:after {
  transition: 0.3s;
}
label:active:after{
  width: 260px;
}

.moon-pic {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-left: 27px;
}
.sun-pic {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-right: 25px;
}
  </style>