<template>
    <body :class="{ 'dark-mode': isDarkMode }">
    <section>
      <div class="container">
        <p class="single"><br>Login</p>
        <form class="login-form" @submit.prevent="LogIn">
          <label>
            Email
            <input v-model="email" id="username" type="text" placeholder="Email" required/>
          </label>
          <label>
            Password
            <input v-model="password" id="password" type="password" placeholder="Password" required/>
          </label>
          <div v-if="loginError" class="login-error">
            Wrong password/email
          </div>
          <button id="login-button" @click="LogIn">Login</button>
        </form>
        <p>
          Don't have an account?
          <router-link to="/signup" class="links" active-class="links-hover">Signup</router-link>
        </p>
        <div class = "restore">
          <p>Forgot your password?
          <router-link to="/password" class="links" active-class="links-hover">Restore</router-link>
        </p>
        </div>
        
      </div>
    </section>
  
    </body>
  </template>

  <script>
  import { mapActions, mapState } from 'vuex';
  
  export default {
    name: 'LoginPage',
    data: function () {
      return {
        email: "",
        password: "",
        loginError: false,
      };
    },
    computed: {
    ...mapState(['isDarkMode']),
    },
    methods: {
      ...mapActions(['loginUser']),
      async LogIn() {
        console.log("LogIn method is called");
        if (!this.email || !this.password) {
          console.log("Please fill in all required fields.");
          return;
        }
  
        var data = {
          email: this.email,
          password: this.password,
        };
        
  
        try {
          const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          });
  
          if (response.ok) {
            const responseData = await response.json();
            console.log("Authentication successful");

            await this.loginUser(responseData.user_id);

            localStorage.setItem('userId', responseData.user_id);

            this.$router.push("/courses");
            console.log("Navigating to /courses");
          } else {
            console.log("Authentication failed");
            this.loginError = true;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          this.loginError = true;
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
    height: 100vh;
  }
  
  .links {
    color: #7d3541;
  }
  
  .links:hover {
    color: #ae5d6c;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
  }
  
  label {
    text-align: center;
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  input {
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px;
    background-color: #7d3541;
    color: #fff;
    border: none;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
  }
  
  button:hover {
    background-color: #ae5d6c;
  }
  
  .login-error {
    color: rgb(227, 84, 84);
    font-size: 12px;
    padding-bottom: 20px;
  }

  .restore {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .restore button {
    width: 20%;
    margin-left: 10px;
  }
  

  .dark-mode .container{
    background-color: #07010b;
  }

  .dark-mode * {
    color: #eee2f8;
  }

  .dark-mode button{
    background-color: #1b042b;
  }

  .dark-mode button:hover{
    background-color: #2d0748;
  }
  
  .dark-mode .links:hover {
    color: #9c8fa8;
  }
  </style>
  