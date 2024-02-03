<template>
    <div class="contacts" :class="{ 'dark-mode': isDarkMode }">
      <header>
        <h1>Contact Information</h1>
      </header>
      <section class="contact-details">
        <div class="contact-item">
          <div class="name">
            <h2>Elisabet Hein</h2>
          </div>
          <div class="info">
            <p>elisabet.hein@ut.ee</p>
            <p>Tartu, Estonia</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';

  export default {
    name: "ContactsPage",
    computed: {
    ...mapState(['isDarkMode']),
    },
  };
  </script>
  
  <style scoped>
  .contacts {
  max-width: 900px;
  margin: 0px auto 0px; /* Adjust the top and bottom margins to your preference */
  color: #ae5d6c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.contact-details {
  display: flex;
  gap: 20px;
}

.contact-item {
  border: 2px solid #FADDE1;
  padding: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px #ae5d6c;
}

.name {
  margin-bottom: 10px;
}

.contact-item:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}

.dark-mode *{
  color: #eee2f8;
}

.dark-mode .contact-item{
  background-color: #07010b;
}
  </style>
  