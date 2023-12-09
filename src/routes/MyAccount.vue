<template>
    <v-main>
      <v-card v-if="user">
        <p>Welcome, {{ user.username }}!</p>
        <p>User ID: {{ user.userId }}</p>
      </v-card>
      <v-card v-else>
        <p>Loading...</p>
      </v-card>
    </v-main>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null,
      };
    },
  
    async created() {
      // Fetch user information including userId
      try {
        const response = await axios.get('http://localhost:3000/userinfo');
        this.user = response.data;
      } catch (err) {
        console.error(err);
      }
    },
  };
  </script>
  