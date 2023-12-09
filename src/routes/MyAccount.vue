<template>
    <v-main>
      <v-card>
        <p>Welcome, {{ usernm }}!</p>
        <p>User ID: {{ usereed }}</p>
      </v-card>
    </v-main>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        usernm: "",
        usereed: ""
      };
    },
  
    created() {
      // Fetch user information including userId
      this.usereed = localStorage.getItem('userId');
      this.usernm = localStorage.getItem('userName');
    },
  };
  </script>
  