<!-- ResetPassword.vue -->
<template>
    <div>
      <h1>Reset Password</h1>
      <form @submit.prevent="resetPassword">
        <label for="newPassword">New Password:</label>
        <input v-model="newPassword" type="password" id="newPassword" required />
        <button type="submit">Reset Password</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPassword: '',
        errorMessage: '',
      };
    },
    methods: {
      async resetPassword() {
        const token = this.$route.params.token;
  
        try {
          const response = await fetch(`http://localhost:3000/auth/reset-password/${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              newPassword: this.newPassword,
            }),
          });
  
          if (response.ok) {
            this.$router.push('/login');
          } else {
            const errorData = await response.json();
            console.error(errorData.error);
            this.errorMessage = errorData.error || 'Password reset failed.';
          }
        } catch (error) {
          console.error('Error resetting password:', error.message);
        }
      },
    },
  };
  </script>

<style scoped>
* {
    font-family: monaco, Consolas, Lucida Console, monospace;
    font-size: 16px;
    color: #7d3541;
  }
  
  p.single {
    line-height: 1.5;
    text-align: center;
    text-justify: inter-word;
  }
  
  .container {
    padding: 10px 10px 10px;
    max-width: 600px;
    margin: 40px auto 75px;
    background-color: #D1DEDE;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #FADDE1;
  }
  
  section {
    padding-top: 20px;
    text-align: center;
  }

  button {
    padding: 10px;
    background-color: #7d3541;
    color: #fff;
    border: none;
    cursor: pointer;
    box-sizing: border-box;
    margin-left: 10px;
  }
  
  button:hover {
    background-color: #ae5d6c;
  }
  </style>