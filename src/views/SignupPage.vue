<template>
    <body>
    <section>
      <div class="container">
        <p class="single"><br>Create a new account</p>
        <form @submit.prevent="SignUp" class="login-form">
          <label :class="{ 'shake': shaking }">
            Email
            <input v-model="email" type="text" placeholder="Email" required/>
          </label>
          <label>
            Password
            <input v-model="password" type="password" placeholder="Password" required/>
          </label>
          <div v-if="!isPasswordValid" class="password-validation">
            <p class="paragraph">Password is not valid.<br> Please follow these conditions:</p>
            <ul>
              <li v-if="!passwordRequirements[0].isValid">At least 8 characters and less than 15 characters</li>
              <li v-if="!passwordRequirements[1].isValid">At least one uppercase letter</li>
              <li v-if="!passwordRequirements[2].isValid">At least two lowercase letters</li>
              <li v-if="!passwordRequirements[3].isValid">At least one number</li>
              <li v-if="!passwordRequirements[4].isValid">Start with an uppercase letter</li>
              <li v-if="!passwordRequirements[5].isValid">Include the character “_”</li>
            </ul>
          </div>
  
          <button type="submit" :disabled="!isPasswordValid">Signup</button>
        </form>
        <p>
          Already have an account?
          <router-link to="/login" class="links" active-class="links-hover">Login</router-link>
        </p>
      </div>
    </section>
    </body>
  </template>
  
  <script>
  export default {
    name: "SignUp",
    data() {
      return {
        email: '',
        password: '',
        isPasswordValid: true, // Initialize to true by default
        shaking: false,
        passwordRequirements: [
          {name: 'at least 8 characters', regex: /^.{8,14}$/},
          {name: 'at least one uppercase character', regex: /^(?=.*[A-Z])/},
          {name: 'at least two lowercase characters', regex: /^(?=.*[a-z].*[a-z])/},
          {name: 'at least one numeric value', regex: /^(?=.*\d)/},
          {name: 'start with an uppercase character', regex: /^[A-Z].*/},
          {name: 'include the character “_"', regex: /^(?=.*_)/},
        ],
      };
    },
    methods: {
      validatePassword() {
        for (const requirement of this.passwordRequirements) {
          requirement.isValid = requirement.regex.test(this.password);
        }
        this.isPasswordValid = this.passwordRequirements.every(requirement => requirement.isValid);
      }, async SignUp() {
        try {
          this.validatePassword();
          if (this.isPasswordValid) {
            var data = {
              email: this.email,
              password: this.password,
            };
            // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
            const response = await fetch("http://localhost:3000/auth/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Don't forget to specify this if you need cookies
              body: JSON.stringify(data),
            });
  
            const responseData = await response.json();
  
            console.log(responseData);
            this.$router.push("/");
          } else {
            console.log("Password is not valid. Please check the requirements and try again.");
          }
        } catch (e) {
          if (e.message === "The string did not match the expected pattern.") {
            this.shake();
            console.log("siin")
          }
          console.error(e.message);
          console.log("error");
        }
      },
      shake() {
        this.shaking = true;
        setTimeout(() => {
          this.shaking = false;
        }, 300);
      },
    },
    watch: {
      password: 'validatePassword',
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
  
  .password-validation p, .password-validation li {
    margin-top: 10px;
    color: rgb(227, 84, 84);
    font-size: 11px;
    text-align: justify;
  }
  
  .shake {
    animation: shake 0.3s;
  }
  
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
  
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
  
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
  
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
  
  </style>
  