<template>
    <div class="footer">
      <p class="footer-text">&copy; {{ currentYear }} All rights reserved.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles for the footer */
  .footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 80%;
  padding: 0.5em;
  border: 1px solid #ae5d6c;
  background-color: #FADDE1;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  opacity: 0.95;
  display: flex;
  margin: 0.5% 10%;
  justify-content: center;
  align-items: center;
  min-height: 50px;
}
  .footer-text {
    color: #ae5d6c;
  }
  </style>
  