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
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.1em;
    padding-bottom: 0.1em;
    background-color: #FADDE1;
    border: 1px #ae5d6c;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.75);
    position: relative;
    left: 0;
    bottom: 0;
    width: 80%;
    border-radius: 5px;
    margin: 0.5% 10%;
    opacity: 95%;
  }
  .footer-text {
    color: #ae5d6c;
  }
  </style>
  