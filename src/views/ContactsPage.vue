<template>
    <div class="contacts">
      <header>
        <h1>Contact Information</h1>
      </header>
      <section class="contact-details">
        <div class="contact-item">
          <div class="name">
            <h2>Elisabet Hein</h2>
          </div>
          <div class="info">
            <p>Email: elisabet.hein@ut.ee</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactsPage",
  };
  </script>
  
  <style scoped>
  .contacts {
    max-width: 900px;
    margin: 0 auto;
    padding: 350px;
  }
  
  header {
    text-align: center;
    margin-bottom: 20px;
    margin-top: -130px;
    z-index: 1;
    position: relative;
  }
  
  .contact-details {
    display: flex;
    gap: 20px;
  }
  
  .contact-item {
    border: 2px solid #ddd;
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .name {
    margin-bottom: 10px;
  }
  
  .contact-item:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }
  
  </style>
  