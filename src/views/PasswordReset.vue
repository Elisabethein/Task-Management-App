<template>
    <section>
        <div class="container">
            <h2>Password Reset</h2>
            <form @submit.prevent="requestPasswordReset">
                <label>Email:</label>
                <input v-model="email" type="email" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    </section>
</template>
  
  <script>
  export default {
    name: 'passwordReset',
    data() {
      return {
        email: '',
      };
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
                console.log('Password reset email sent successfully.');
            } else {
                // Handle error (e.g., show an error message)
                console.error('Failed to send password reset email.');
            }
            } catch (error) {
            console.error('Error:', error.message);
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