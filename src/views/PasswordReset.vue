<template>
    <section :class="{ 'dark-mode': isDarkMode }">
        <div class="container">
            <h2>Password Reset</h2>
            <form @submit.prevent="requestPasswordReset">
                <label>Email:</label>
                <input v-model="email" type="email" required />
                <button type="submit">Submit</button>
            </form>
            <p v-if="message" class="success-message">{{ message }}</p>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'passwordReset',
    data() {
        return {
            email: '',
            message: '',
        };
    },
    computed: {
    ...mapState(['isDarkMode']),
    },
    methods: {
        async requestPasswordReset() {
            try {
                const response = await fetch('http://localhost:3000/auth/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: this.email }),
                });

                if (response.ok) {
                    // Handle success (e.g., show a message to the user)
                    this.message = 'Password reset email sent successfully.';
                } else {
                    // Handle error (e.g., show an error message)
                    console.error('Failed to send password reset email.');
                    this.message = ''; // Clear the message if an error occurs
                }
            } catch (error) {
                console.error('Error:', error.message);
                this.message = ''; // Clear the message if an error occurs
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