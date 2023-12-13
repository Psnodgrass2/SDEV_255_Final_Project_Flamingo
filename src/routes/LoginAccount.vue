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
      // Function to retrieve the user ID from the "userId" cookie
      async submitForm() {
          try {
              const response = await axios.post('https://m08finalprojectbackend.phillipsnodgras.repl.co/login',   this.user, {
                  withCredentials: true,
              });

              // Assuming your server returns the user ID upon successful login
              const userId = response.data.Id;
              const userName = response.data.username;
              const isTeacher = response.data.isTeacher;
              // Save user ID in a cookie
               // Adjust the expiration as needed
              localStorage.setItem('userId', userId);
              localStorage.setItem('userName', userName);
              localStorage.setItem('isTeacher', isTeacher);
              console.log(userId);
              this.$router.push('/account');
              // Redirect to the account page or any other destination
          } catch (err) {
              this.message = 'Invalid username or password.';
              console.error(err);
          }
      },
    },
  };
  </script>
  