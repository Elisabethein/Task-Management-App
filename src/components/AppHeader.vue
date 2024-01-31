<template>
    <header class="header">
      <div class="nav">
        <router-link to="/" @click="handleNavClick('/')"
                     :class="{ 'nav-button': true, 'pressed': isNavButtonPressed('/')}">Home
        </router-link>
        <router-link to="/contacts" @click="handleNavClick('/contacts')"
                     :class="{ 'nav-button': true, 'pressed': isNavButtonPressed('/contacts') }">Contacts
        </router-link>
        <router-link to="/login" @click="logout"
                     :class="{ 'nav-button': true, 'pressed': isNavButtonPressed('/login') }">Logout
        </router-link>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pressedNavButtons: [],
        isLogoutPressed: false,
      };
    },
    methods: {
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
  </style>
  