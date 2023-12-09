<template>
    <v-main style="min-height: 1000px">
      <h2 class="text-h2 justify-center d-flex mb-6">Login to Your Account</h2>
  
      <p v-if="message">{{ message }}</p>
  
      <form>
        <v-text-field v-model="user.username" label="User Name" required></v-text-field>
        <v-text-field v-model="user.password" label="Password" required></v-text-field>
      </form>
  
      <v-btn @click="submitForm">
        Login
      </v-btn>
    </v-main>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data: () => ({
      user: {
        username: '',
        password: '',
      },
      message: null,
    }),
    methods: {
      async submitForm() {
        try {
          const response = await axios.post('http://localhost:3000/login', this.user, {withCredentials: true},);
  
          // Assuming your server returns the user ID upon successful login
          const userId = response.data.userId;
          console.log(userId);
          
          // Redirect to the account page or any other destination
        } catch (err) {
          this.message = 'Invalid username or password.';
          console.error(err);
        }
      },
    },
  };
  </script>
  