<template>
    <div :class="{ 'dark-mode': isDarkMode }">
        <h1>Reset Password</h1>
        <form @submit.prevent="resetPassword">
            <label for="newPassword">New Password:</label>
            <input v-model="newPassword" type="password" id="newPassword" required />
            <button type="submit">Reset Password</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        </form>
    </div>
</template>

  
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            newPassword: '',
            errorMessage: '',
            successMessage: '',
        };
    },
    computed: {
    ...mapState(['isDarkMode']),
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
                    this.successMessage = 'Password reset successful.';
                    this.$router.push('/login');
                } else {
                    const errorData = await response.json();
                    console.error(errorData.error);
                    this.errorMessage = errorData.error || 'Password reset failed.';
                    this.successMessage = ''; // Clear success message if an error occurs
                }
            } catch (error) {
                console.error('Error resetting password:', error.message);
                this.errorMessage = 'Internal Server Error';
                this.successMessage = ''; // Clear success message if an error occurs
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

  .success-message {
    font-weight: bold;
    margin-top: 10px;
}
.dark-mode .container{
    background-color: #07010b;
  }
  .dark-mode *{
    color: #eee2f8;
  }
  .dark-mode button{
    background-color: #1b042b;
  }

  .dark-mode button:hover{
    background-color: #2d0748;
  }
  </style>