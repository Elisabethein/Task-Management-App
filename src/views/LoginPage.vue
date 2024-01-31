<template>
    <body>
    <section>
      <div class="container">
        <p class="single"><br>Login</p>
        <form class="login-form">
          <label>
            Email
            <input v-model="email" type="text" placeholder="Email" required/>
          </label>
          <label>
            Password
            <input v-model="password" type="password" placeholder="Password" required/>
          </label>
          <div v-if="loginError" class="login-error">
            Wrong password/email
          </div>
          <button @click="LogIn">Login</button>
        </form>
        <p>
          Don't have an account?
          <router-link to="/signup" class="links" active-class="links-hover">Signup</router-link>
        </p>
      </div>
    </section>
  
    </body>
  </template>
  <script>
  
  export default {
    name: 'LoginPage',
    data: function () {
      return {
        email: "",
        password: "",
        loginError: false,
      };
    }, methods: {
      async LogIn() {
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
            console.log("Authentication successful");
            // const user_id = responseData.user_id;
            this.$router.push("/");
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
    background-color: #D1DEDE;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #FADDE1;
  }
  
  section {
    padding-top: 20px;
    text-align: center;
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
  
  </style>
  